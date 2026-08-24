import { HoverButton } from "@/components/ui/hover-button";
import { ArrowRight } from "lucide-react";
import ShaderBackground from "@/components/ui/shader-background";

const CTASection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative py-16 xs:py-20 sm:py-28 md:py-36 lg:py-44 text-center">
        <ShaderBackground />

        <div className="relative z-10 container mx-auto px-3 xs:px-4 sm:px-6">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4">
            Ready to find your next client?
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-white/70 max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-4 xs:mb-6 sm:mb-8 px-1 xs:px-2 sm:px-0">
            Join thousands of freelancers and agencies who trust LeadFlow to
            grow their business.
          </p>
          <HoverButton className="group text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6">
            <a
              href="https://app-leadflow.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Get started for free
            </a>
            <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 ml-1.5 xs:ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </HoverButton>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
