import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
    children: ReactNode;
    animationNum: number;
    timelineRef: React.RefObject<HTMLElement | null>;
    className?: string;
}

export function TimelineContent({
    children,
    animationNum,
    timelineRef,
    className,
}: TimelineContentProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px",
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 20, filter: "blur(10px)" }
            }
            transition={{
                duration: 0.5,
                delay: animationNum * 0.1,
                ease: "easeOut",
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
