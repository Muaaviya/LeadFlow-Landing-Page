import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-foreground">LeadFlow</span>
                </div>

                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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

                <div className="flex items-center gap-2 sm:gap-3">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm px-2 sm:px-3">
                        Sign in
                    </Button>
                    <Button variant="primary" size="sm" className="text-xs sm:text-sm px-3 sm:px-4">
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
