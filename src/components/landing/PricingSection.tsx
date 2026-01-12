import { Card, CardContent, CardHeader } from "@/components/ui/Card";
// import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        description:
            "Great for small businesses and startups looking to get started with AI",
        price: 12,
        yearlyPrice: 99,
        buttonText: "Get started",
        buttonVariant: "outline" as const,
        includes: [
            "Free includes:",
            "Unlimited Leads",
            "Custom branding",
            "2-factor authentication",
            "Basic analytics",
            "Email support",
            "API access",
            "Data export",
        ],
    },
    {
        name: "Business",
        description:
            "Best value for growing businesses that need more advanced features",
        price: 48,
        yearlyPrice: 399,
        buttonText: "Get started",
        buttonVariant: "default" as const,
        popular: true,
        includes: [
            "Everything in Starter, plus:",
            "Advanced analytics",
            "Custom integrations",
            "Priority support",
            "Team collaboration",
            "Automation workflows",
            "CRM sync",
            "Advanced reporting",
        ],
    },
    {
        name: "Enterprise",
        description:
            "Advanced plan with enhanced security and unlimited access for large teams",
        price: 96,
        yearlyPrice: 899,
        buttonText: "Get started",
        buttonVariant: "outline" as const,
        includes: [
            "Everything in Business, plus:",
            "Dedicated account manager",
            "Custom SLA",
            "SSO authentication",
            "Unlimited team members",
            "White-label solution",
            "On-premise deployment",
            "24/7 phone support",
        ],
    },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
    const [selected, setSelected] = useState("0");

    const handleSwitch = (value: string) => {
        setSelected(value);
        onSwitch(value);
    };

    return (
        <section id="pricing">
            <div className="flex justify-center items-center gap-3">
                <div className="border border-primary/30 rounded-full flex items-center py-1 px-1 bg-background/50 backdrop-blur-sm">
                    <button
                        onClick={() => handleSwitch("0")}
                        className={cn(
                            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
                            selected === "0" ? "text-white" : "text-muted-foreground"
                        )}
                    >
                        {selected === "0" && (
                            <motion.div
                                layoutId="pricing-switch"
                                className="absolute inset-0 rounded-full bg-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">Monthly</span>
                    </button>

                    <button
                        onClick={() => handleSwitch("1")}
                        className={cn(
                            "relative z-10 w-fit h-10 shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
                            selected === "1" ? "text-white" : "text-muted-foreground"
                        )}
                    >
                        {selected === "1" && (
                            <motion.div
                                layoutId="pricing-switch"
                                className="absolute inset-0 rounded-full bg-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">Yearly</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);
    const pricingRef = useRef<HTMLDivElement>(null);

    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.4,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -20,
            opacity: 0,
        },
    };

    const togglePricingPeriod = (value: string) =>
        setIsYearly(Number.parseInt(value) === 1);

    return (
        <section
            className="w-full relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
            ref={pricingRef}
        >
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute w-full h-full">
                    {/* <Sparkles
                        density={200}
                        speed={1}
                        size={1.2}
                        color="#EC4899"
                        className="w-full h-full"
                    /> */}
                </div>
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 aspect-[1/0.5] opacity-30">
                    <div className="w-full h-full bg-linear-to-b from-primary/50 to-transparent rounded-full blur-3xl" />
                </div>
            </div>

            <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
                <TimelineContent animationNum={0} timelineRef={pricingRef}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-foreground">
                        <VerticalCutReveal
                            splitBy="characters"
                            staggerDuration={0.025}
                            staggerFrom="center"
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 21,
                            }}
                        >
                            Plans that work best for you
                        </VerticalCutReveal>
                    </h2>
                </TimelineContent>

                <TimelineContent animationNum={1} timelineRef={pricingRef}>
                    <p className="text-sm sm:text-base text-muted-foreground text-center max-w-md sm:max-w-xl mx-auto">
                        Trusted by thousands of businesses worldwide. Explore which option
                        is right for you.
                    </p>

                    <div className="flex justify-center mt-4 sm:mt-6">
                        <PricingSwitch onSwitch={togglePricingPeriod} />
                    </div>
                </TimelineContent>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mt-8 sm:mt-12">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={index}
                        className="w-full"
                    >
                        <Card
                            className={cn(
                                "relative h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50",
                                plan.popular && "border-primary/50 shadow-lg shadow-primary/10"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                                        {plan.name}
                                    </h3>
                                </div>

                                <div className="flex items-baseline gap-1 mt-3">
                                    <span className="text-3xl sm:text-4xl font-bold text-foreground">
                                        $
                                        <NumberFlow
                                            value={isYearly ? plan.yearlyPrice : plan.price}
                                        />
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        /{isYearly ? "year" : "month"}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground mt-2">
                                    {plan.description}
                                </p>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col">
                                <button
                                    className={cn(
                                        "w-full py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200",
                                        plan.buttonVariant === "default"
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "border border-primary/50 text-primary hover:bg-primary/10"
                                    )}
                                >
                                    {plan.buttonText}
                                </button>

                                <div className="mt-6 space-y-3">
                                    <p className="text-sm font-medium text-foreground">
                                        {plan.includes[0]}
                                    </p>

                                    <ul className="space-y-2">
                                        {plan.includes.slice(1).map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-center gap-2 text-sm text-muted-foreground"
                                            >
                                                <Check className="h-4 w-4 text-primary shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
