"use client";

import { BsAmazon, BsGoogle, BsSpotify, BsYoutube } from "react-icons/bs";

export const BrandScroller = () => {
    return (
        <>
            <div className="flex overflow-hidden">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 animate-[scroll_20s_linear_infinite] items-center gap-20"
                        >
                            <div className="flex items-center gap-4 pl-20">
                                <BsSpotify className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    Spotify
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <BsYoutube className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    YouTube
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <BsAmazon className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    Amazon
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <BsGoogle className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    Google
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export const BrandScrollerReverse = () => {
    return (
        <>
            <div className="flex overflow-hidden">
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 animate-[scroll_20s_linear_infinite_reverse] items-center gap-20"
                        >
                            <div className="flex items-center gap-4 pl-20">
                                <BsSpotify className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    Spotify
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <BsYoutube className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    YouTube
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <BsAmazon className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    Amazon
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <BsGoogle className="h-20 w-12 text-muted-foreground" />
                                <span className="text-6xl font-semibold text-muted-foreground">
                                    Google
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};