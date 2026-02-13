import Title from './Title';
import { PricingTable } from '@clerk/clerk-react';

export default function Pricing() {    
    return (
        <section id="pricing" className="py-20 bg-white/3 border-t border-white/6">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Pricing"
                    heading="Pricing Plans"
                    description="Our pricing is designed to be simple and transparent, with no hidden fees. Choose the plan that best fits your needs and start creating stunning visuals today."
                />

                <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto">
                    <PricingTable 
                        appearance={{
                            variables: {
                                colorBackground: "none"
                            },
                            elements: {
                                pricingTableCardBody: 'bg-white/6',
                                pricingTableCardHeader: 'bg-white/10',
                                switchThumb: 'bg-white'
                            }

                        }} 
                    />
                </div>
            </div>
        </section>
    );
};