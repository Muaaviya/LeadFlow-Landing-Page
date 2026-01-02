"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
    ({ className, children, ...props }, ref) => {
        const buttonRef = React.useRef<HTMLButtonElement>(null)
        const [isListening, setIsListening] = React.useState(false)
        const [circles, setCircles] = React.useState<
            Array<{ id: number; x: number; y: number; color: string; fadeState: string | null }>
        >([])
        const lastAddedRef = React.useRef(0)

        const createCircle = React.useCallback((x: number, y: number) => {
            const buttonWidth = buttonRef.current?.offsetWidth || 0
            const xPos = x / buttonWidth
            const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${xPos * 100
                }%)`

            setCircles((prev) => [
                ...prev,
                { id: Date.now(), x, y, color, fadeState: null },
            ])
        }, [])

        const handlePointerMove = React.useCallback(
            (event: React.PointerEvent<HTMLButtonElement>) => {
                if (!isListening) return

                const currentTime = Date.now()
                if (currentTime - lastAddedRef.current > 100) {
                    lastAddedRef.current = currentTime
                    const rect = event.currentTarget.getBoundingClientRect()
                    const x = event.clientX - rect.left
                    const y = event.clientY - rect.top
                    createCircle(x, y)
                }
            },
            [isListening, createCircle]
        )

        const handlePointerEnter = React.useCallback(() => {
            setIsListening(true)
        }, [])

        const handlePointerLeave = React.useCallback(() => {
            setIsListening(false)
        }, [])

        React.useEffect(() => {
            circles.forEach((circle) => {
                if (!circle.fadeState) {
                    setTimeout(() => {
                        setCircles((prev) =>
                            prev.map((c) =>
                                c.id === circle.id ? { ...c, fadeState: "in" } : c
                            )
                        )
                    }, 0)

                    setTimeout(() => {
                        setCircles((prev) =>
                            prev.map((c) =>
                                c.id === circle.id ? { ...c, fadeState: "out" } : c
                            )
                        )
                    }, 1000)

                    setTimeout(() => {
                        setCircles((prev) => prev.filter((c) => c.id !== circle.id))
                    }, 2200)
                }
            })
        }, [circles])

        return (
            <button
                ref={buttonRef}
                className={cn(
                    "relative px-6 py-3 text-sm font-medium overflow-hidden",
                    "bg-primary text-primary-foreground rounded-full",
                    "transition-colors duration-300",
                    "hover:bg-primary/90",
                    "[--circle-start:hsl(var(--primary)/0.8)] [--circle-end:hsl(var(--primary)/0.6)]",
                    className
                )}
                onPointerMove={handlePointerMove}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                {...props}
            >
                {circles.map(({ id, x, y, color, fadeState }) => (
                    <span
                        key={id}
                        className={cn(
                            "pointer-events-none absolute rounded-full",
                            "w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2",
                            "transition-opacity duration-1000",
                            fadeState === "in" && "opacity-100",
                            fadeState === "out" && "opacity-0",
                            !fadeState && "opacity-0"
                        )}
                        style={{
                            left: x,
                            top: y,
                            background: color,
                        }}
                    />
                ))}
                <span className="relative z-10">{children}</span>
            </button>
        )
    }
)

HoverButton.displayName = "HoverButton"

export { HoverButton }
