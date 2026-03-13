// seed.ts
import { prisma } from './configs/prisma';

async function main() {
    await prisma.user.create({
        data: {
            id: "user_3A4Ek68T4hZC97nQzskAEJHpqo9",
            email: "youremail@example.com",
            name: "Your Name",
            image: "",
            credits: 100,
        }
    });
    console.log("User created!");
}

main();