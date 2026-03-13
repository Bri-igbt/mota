import { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "../configs/prisma";
import * as Sentry from "@sentry/node"


const ClerkWebhooks = async (req: Request, res: Response) => {
    try {
        const evt: any = await verifyWebhook(req);

        // get data from request body
        const { data, type } = evt;

        // Switch case for different event types
        switch (type) {
            case "user.created": {
                await prisma.user.create({
                    data: {
                        id: data.id,
                        email: data?.email_addresses[0]?.email_address,
                        name: data.first_name + " " + data.last_name,
                        image: data?.image_url,
                    }
                })
                break;
            }

            case "user.updated": {
                await prisma.user.update({
                    where: {
                        id: data.id,
                    },
                    data: {
                        email: data?.email_addresses[0]?.email_address,
                        name: data.first_name + " " + data.last_name,
                        image: data?.image_url,
                    }
                })
                break;
            }

            case "user.deleted": {
                await prisma.user.delete({
                    where: {
                        id: data.id,
                    }
                })
                break;
            }

            case "paymentAttempt.updated": {
                if ((data.charge_type === "recurring" || data.charge_type === "checkout") && data.status === 'paid') {
                    const credits = {pro: 80, premium: 240}
                    const clerkUserId = data?.payer?.user_id;
                    const planId: keyof typeof credits = data?.subscription_items?.[0]?.plan?.slug;

                    if(planId !== "pro" && planId !== "premium") {
                        return res.status(400).json({ message: "Invalid plan" });
                    }

                    console.log(planId);
                    
                    await prisma.user.update({
                        where: {
                            id: clerkUserId,
                        }, 
                        data: {
                            credits: {
                                increment: credits[planId],
                            }
                        }
                    })

                }

                break;
            }

            case "subscription.updated": {  // ✅ handles pro plan changes
                const clerkUserId = data?.payer?.user_id;
                const activeItem = data?.items?.find((item: any) => item.status === "active");
                const planId = activeItem?.plan?.slug;

                console.log("📦 subscription.updated - clerkUserId:", clerkUserId, "planId:", planId);

                const credits: Record<string, number> = { pro: 80, premium: 240 };

                if (!planId || planId === "free_user" || !credits[planId]) {
                    console.log("⏭️ Skipping free/unknown plan:", planId);
                    break;
                }

                await prisma.user.upsert({
                    where: { id: clerkUserId },
                    update: { credits: { increment: credits[planId] } },
                    create: {
                        id: clerkUserId,
                        email: data?.payer?.email,
                        name: `${data?.payer?.first_name} ${data?.payer?.last_name}`,
                        image: data?.payer?.image_url ?? "",
                        credits: credits[planId]
                    }
                })

                console.log(`✅ Credits incremented via subscription for ${clerkUserId} — plan: ${planId}`);
                break;
            }
                
        
            default:
                break;
        }

        res.json({ message: "Webhook received : " + type });
    } catch (error: any) {
        Sentry.captureException(error);
        res.status(500).json({ message: error.code || error.message });
        
    }
}

export default ClerkWebhooks;