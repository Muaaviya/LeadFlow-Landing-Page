import { useRef, useState, useEffect } from "react";
import LaserFlow from "@/components/LaserFlow";
import { useSpring, useMotionValue } from "framer-motion";
import dashboardPreview from "@/assets/dashboard-preview.png";
import { Button } from "../ui/button";
import { BorderBeam } from "../ui/border-beam";

const HeroSection = () => {
  const revealImgRef = useRef<HTMLImageElement>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [animatedOffset, setAnimatedOffset] = useState(1.5);

  const [animatedHorizontalSizing, setAnimatedHorizontalSizing] =
    useState(0.05);
  const [hasLanded, setHasLanded] = useState(false);

  // Vertical drop animation
  const targetOffset = isMobile ? -0.5 : isTablet ? -0.5 : 0.04;
  const beamOffset = useMotionValue(1.5);
  const springOffset = useSpring(beamOffset, {
    stiffness: 50,
    damping: 12,
  });

  // Horizontal spread animation (starts narrow, spreads on impact)
  const horizontalSizing = useMotionValue(0.05);
  const springHorizontal = useSpring(horizontalSizing, {
    stiffness: 80,
    damping: 15,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 640 && width < 1024);
      setIsMobile(width < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Trigger beam drop animation on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      beamOffset.set(targetOffset);
    }, 300);
    return () => clearTimeout(timeout);
  }, [targetOffset, beamOffset]);

  // Subscribe to spring value changes and detect landing
  useEffect(() => {
    const unsubscribe = springOffset.on("change", (v) => {
      setAnimatedOffset(v);
      // Detect when beam is close to target (landed)
      if (!hasLanded && Math.abs(v - targetOffset) < 0.15) {
        setHasLanded(true);
        // Trigger horizontal spread
        horizontalSizing.set(0.5);
      }
    });
    return () => unsubscribe();
  }, [springOffset, targetOffset, hasLanded, horizontalSizing]);

  // Subscribe to horizontal sizing changes
  useEffect(() => {
    const unsubscribe = springHorizontal.on("change", (v) =>
      setAnimatedHorizontalSizing(v),
    );
    return () => unsubscribe();
  }, [springHorizontal]);

  return (
    <section
      className="relative min-h-screen overflow-hidden animate-fade-in"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty("--mx", "-9999px");
          el.style.setProperty("--my", "-9999px");
        }
      }}
    >
      {/* verticalBeamOffset={isMobile ? -0.50 : isTablet ? -0.50 : 0.04} */}
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={animatedOffset}
        horizontalSizing={animatedHorizontalSizing}
        color="#c61951"
      />
      {/* Hero Content */}

      <div className="absolute bottom-25 xs:top-24 sm:top-32 md:top-40 left-4 xs:left-6 sm:left-8 md:left-16 lg:left-70 z-10 max-w-70 xs:max-w-xs sm:max-w-sm md:max-w-md px-1 xs:px-2 sm:px-0">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-3 sm:mb-4 transition-all duration-500 ${hasLanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          style={{ transitionDelay: hasLanded ? "0.6s" : "0s" }}
        >
          LeadFlow
        </h1>
        <p
          className={`text-base sm:text-lg md:text-xl text-foreground/90 mb-4 sm:mb-6 transition-all duration-500 ${hasLanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: hasLanded ? "0.7s" : "0s" }}
        >
          Generating leads has never been easier!
        </p>
        <Button
          variant="primary"
          size="default"
          className={`text-sm sm:text-base transition-all duration-500 ${hasLanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: hasLanded ? "0.8s" : "0s" }}
        >
          Get Started
        </Button>
      </div>

      {/* Dashboard box */}
      <div
        className="absolute bottom-75 sm:bottom-2.5 lg:bottom-0 xs:bottom-3 left-1/2 -translate-x-1/2 w-[98%] xs:w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-[38%] xs:h-[42%] sm:h-[50%] md:h-[55%] rounded-t-lg xs:rounded-t-xl border border-primary/30 xs:border-2 xs:border-primary/40 border-b-0 overflow-hidden glow-sm"
        style={{ backgroundColor: "hsl(240, 10%, 4%)" }}
      >
        <img
          src={dashboardPreview}
          alt="LeadFlow Dashboard"
          className="w-full h-full object-cover object-top opacity-90"
        />
        <BorderBeam
          size={300}
          duration={12}
          colorFrom="var(--primary)"
          colorTo="var(--primary)"
          borderWidth={2}
        />
      </div>

      {/* Reveal effect image */}
      <img
        ref={revealImgRef}
        src={dashboardPreview}
        alt="Reveal effect"
        className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-30 object-cover object-top"
        style={
          {
            zIndex: 5,
            mixBlendMode: "lighten",
            // @ts-ignore
            "--mx": "-9999px",
            "--my": "-9999px",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          } as React.CSSProperties
        }
      />

      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-20 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent backdrop-blur-[4px] pointer-events-none z-35" />
    </section>
  );
};

export default HeroSection;
