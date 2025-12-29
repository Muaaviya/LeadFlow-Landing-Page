import { useRef } from "react";
import LaserFlow from "@/components/LaserFlow";
import dashboardPreview from "@/assets/dashboard-preview.png";
import { Button } from "../ui/button";
const HeroSection = () => {
    const revealImgRef = useRef<HTMLImageElement>(null);

    return (
        <section
            className="relative min-h-screen overflow-hidden animate-fade-in"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', `${x}px`);
                    el.style.setProperty('--my', `${y}px`);
                }
            }}
            onMouseLeave={() => {
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', '-9999px');
                    el.style.setProperty('--my', '-9999px');
                }
            }}
        >
            <LaserFlow
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.04}
                color="#EC4899"
            />
            {/* Hero Content */}
            <div className="absolute top-40 left-8 md:left-16 lg:left-70 z-10 max-w-md">
                <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    LeadFlow
                </h1>
                <p className="text-lg md:text-xl text-foreground/90 mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    Generating leads has never been easier!
                </p>
                <Button variant="primary" size="lg" className="animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    Get Started
                </Button>
            </div>

            {/* Dashboard box */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[70%] h-[55%] rounded-t-xl border-2 border-b-0 border-primary/40 overflow-hidden glow-sm"
                style={{ backgroundColor: 'hsl(240, 10%, 4%)' }}
            >
                <img
                    src={dashboardPreview}
                    alt="LeadFlow Dashboard"
                    className="w-full h-full object-cover object-top opacity-90"
                />
            </div>

            {/* Reveal effect image */}
            <img
                ref={revealImgRef}
                src={dashboardPreview}
                alt="Reveal effect"
                className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-30 object-cover object-top"
                style={{
                    zIndex: 5,
                    mixBlendMode: 'lighten',
                    // @ts-ignore
                    '--mx': '-9999px',
                    '--my': '-9999px',
                    WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                } as React.CSSProperties}
            />
        </section>
    );
};

export default HeroSection;
