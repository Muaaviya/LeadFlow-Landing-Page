import { Target, Zap, Users, BarChart3 } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const features = [
    {
        icon: Target,
        title: "Precision Targeting",
        description: "Define your ideal client profile and get leads that match your specific criteria."
    },
    {
        icon: Zap,
        title: "AI-Powered Discovery",
        description: "Our algorithms scan thousands of sources to find businesses that need your services."
    },
    {
        icon: Users,
        title: "Qualified Contacts",
        description: "Get verified contact information including emails and decision-maker details."
    },
    {
        icon: BarChart3,
        title: "Lead Scoring",
        description: "Prioritize your outreach with intelligent lead scoring based on conversion potential."
    }
];

const FeaturesSection = () => {
    return (
        <section id="features" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Everything you need to grow
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        LeadFlow combines intelligent prospecting with actionable data to accelerate your client acquisition.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <CardSpotlight
                            key={feature.title}
                            className="p-6 rounded-xl bg-card border-border hover:border-primary/30 transition-all duration-300 animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative z-20">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover/spotlight:bg-primary/20 group-hover/spotlight:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-primary group-hover/spotlight:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] transition-all duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </CardSpotlight>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
