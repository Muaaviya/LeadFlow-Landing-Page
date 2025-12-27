import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">LeadFlow</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        How it works
                    </a>
                    <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Pricing
                    </a>
                </nav>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        Sign in
                    </Button>
                    <Button variant="primary" size="sm">
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
