import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";

export default function LogoCloudSection() {
    return (
        <section className="overflow-hidden py-16">
            <div className="my-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            <BrandScroller />
            <br />
            <BrandScrollerReverse />
            <div className="my-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        </section>
    );
}