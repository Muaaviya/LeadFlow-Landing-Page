import { HoverButton } from "@/components/ui/hover-button";
import { ArrowRight } from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";

const CTASection = () => {
    return (
        <section className="py-16 sm:py-20 md:py-24 relative">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden p-8 sm:p-10 md:p-12 lg:p-16 text-center">
                    <ShaderBackground />

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                            Ready to find your next client?
                        </h2>
                        <p className="text-sm sm:text-base text-white/70 max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                            Join thousands of freelancers and agencies who trust LeadFlow to grow their business.
                        </p>
                        <HoverButton className="group text-sm sm:text-base">
                            Get started for free
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                        </HoverButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
