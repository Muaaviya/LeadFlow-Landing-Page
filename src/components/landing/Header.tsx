import { Button } from "@/components/ui/button";
import { Zap, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <span className="text-base sm:text-lg font-semibold text-foreground">
            LeadFlow
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground text-xs sm:text-sm px-2 sm:px-3"
          >
            Sign in
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="text-xs sm:text-sm px-3 sm:px-4 transition-all delay-200"
          >
            <a
              href="https://app-leadflow.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </Button>

          {/* Mobile burger menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden p-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-70 bg-background/95 backdrop-blur-lg"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span>LeadFlow</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-border my-2" />
                <a
                  href="#"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Sign in
                </a>
                <Button
                  variant="primary"
                  className="mt-2 w-full transition-all delay-200"
                >
                  <a
                    href="https://app-leadflow.vercel.app/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
