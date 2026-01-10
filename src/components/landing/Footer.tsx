import { Zap } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-8 sm:py-10 md:py-12 border-t border-border">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <span className="text-base sm:text-lg font-semibold text-foreground">LeadFlow</span>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground">
                        © 2025 LeadFlow. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
