import { cn } from "@/lib/utils";
import { LogoCloud } from "./logo-cloud";

const logos = [
    {
        src: "https://svgl.app/library/nvidia-wordmark-light.svg",
        alt: "Nvidia Logo",
    },
    {
        src: "https://svgl.app/library/supabase_wordmark_light.svg",
        alt: "Supabase Logo",
    },
    {
        src: "https://svgl.app/library/openai_wordmark_light.svg",
        alt: "OpenAI Logo",
    },
    {
        src: "https://svgl.app/library/turso-wordmark-light.svg",
        alt: "Turso Logo",
    },
    {
        src: "https://svgl.app/library/vercel_wordmark.svg",
        alt: "Vercel Logo",
    },
    {
        src: "https://svgl.app/library/github_wordmark_light.svg",
        alt: "GitHub Logo",
    },
    {
        src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
        alt: "Claude AI Logo",
    },
    {
        src: "https://svgl.app/library/clerk-wordmark-light.svg",
        alt: "Clerk Logo",
    },
];

export default function LogoCloudSection() {
    return (
        <section className="overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:border-border md:pr-6">
                        <p className="text-end text-sm text-muted-foreground">
                            Trusted by experts.
                            <br className="hidden md:block" />
                            Used by the leaders.
                        </p>
                    </div>

                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <div className="my-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
                        <LogoCloud logos={logos} />
                        <div className="my-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
