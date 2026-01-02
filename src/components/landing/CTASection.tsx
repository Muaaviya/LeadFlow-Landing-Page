import { HoverButton } from "@/components/ui/hover-button";
import { ArrowRight } from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";

const CTASection = () => {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="relative rounded-2xl overflow-hidden p-12 md:p-16 text-center">
                    <ShaderBackground />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to find your next client?
                        </h2>
                        <p className="text-white/70 max-w-md mx-auto mb-8">
                            Join thousands of freelancers and agencies who trust LeadFlow to grow their business.
                        </p>
                        <HoverButton className="group">
                            Get started for free
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                        </HoverButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
