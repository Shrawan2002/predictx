"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Menu, TrendingUp, Trophy, Globe, Bitcoin } from "lucide-react";

const tabs = [
    { label: "Trending", icon: TrendingUp, href: "/home" },
    { label: "Crypto", icon: Bitcoin, href: "/crypto" },
    { label: "Sports", icon: Trophy, href: "/sports" },
    { label: "Politics", icon: Globe, href: "/politics" },
];

export function Logo() {
    return (
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
            <svg viewBox="0 0 48 48" className="w-5 h-5">
                <path
                    d="M14 10H26C32 10 36 14 36 20C36 26 32 30 26 30H14V10Z"
                    fill="white"
                />
                <path d="M14 30L24 38H14V30Z" fill="white" />
            </svg>
        </div>
    );
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const path = usePathname();
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false);

    // 🔥 Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 left-0 w-full z-1000 transition-all
      ${scrolled
                    ? "bg-[#15191d]/95 backdrop-blur-xl shadow-lg"
                    : "bg-[#15191d]/80 backdrop-blur-xl"
                }`}
        >
            {/* 🔵 TOP NAV */}
            <div className="h-[64px] flex items-center justify-between px-4 md:px-6">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <button onClick={onMenuClick} className="md:hidden text-gray-300">
                        <Menu />
                    </button>

                    <Logo />

                    <span className="font-semibold text-lg tracking-tight">
                        PredictX
                    </span>
                </div>

                {/* 🔍 SEARCH */}
                <div className="hidden md:flex flex-1 justify-center px-6">
                    <div className="relative w-full max-w-[520px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            placeholder="Search markets..."
                            className="w-full h-[40px] pl-10 pr-4 rounded-full bg-gray-900 border border-gray-800 outline-none 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    <button className="hidden md:block text-sm text-gray-300 hover:text-white">
                        Log In
                    </button>

                    <button className="text-sm px-4 h-[36px] rounded-full bg-blue-600 hover:bg-blue-500 transition">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* 🟣 TABS */}
            <div className="flex justify-center items-center gap-3 px-4 mt-4 relative md:gap-6 md:px-6 border-b border-gray-800 ">

                {tabs.map((tab) => {
                    const isActive = path === tab.href;

                    return (
                        <button
                            key={tab.label}
                            onClick={() => router.push(tab.href)}
                            className={`relative flex items-center gap-2 h-full px-2 text-sm transition
              ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>

                            {/* 🔥 SLIDING UNDERLINE */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </header>
    );
}