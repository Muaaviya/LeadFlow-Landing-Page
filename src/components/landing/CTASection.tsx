import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="relative rounded-2xl overflow-hidden glass p-12 md:p-16 text-center">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Ready to find your next client?
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            Join thousands of freelancers and agencies who trust LeadFlow to grow their business.
                        </p>
                        <Button variant="primary" size="lg" className="group">
                            Get started for free
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
