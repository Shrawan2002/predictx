"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderTabs from "./HeaderTabs";
import HeaderRight from "./HeaderRight";

export default function Header({
    onMenuClick,
}: {
    onMenuClick: () => void;
}) {

    const [scrolled, setScrolled] =
        useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

    return (
        <header
            className={`
                sticky top-0 left-0 w-full
                z-50
                border-b border-border
                transition-all duration-300

                ${scrolled
                    ? "bg-background/95 backdrop-blur-xl shadow-lg"
                    : "bg-background/80 backdrop-blur-xl"
                }
            `}
        >

            {/* TOP NAV */}
            <div className="
                h-[64px]
                flex items-center justify-between
                px-4 md:px-6
            ">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={onMenuClick}
                        className="
                            md:hidden
                            text-foreground
                        "
                    >
                        <Menu />
                    </button>

                    <HeaderLogo />
                </div>

                {/* SEARCH */}
                <HeaderSearch />

                {/* RIGHT */}
                <HeaderRight />
            </div>

            {/* TABS */}
            <HeaderTabs />
        </header>
    );
}