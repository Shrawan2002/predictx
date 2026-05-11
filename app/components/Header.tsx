"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
    Search,
    Menu,
    TrendingUp,
    Trophy,
    Globe,
    Bitcoin,
    Moon,
    ChevronRight,
    Award,
    Coins,
    Rocket,
    FileText,
    HelpCircle,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import useTheme from "@/context/themeContext";

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

function MenuItem({
    icon: Icon,
    label,
}: {
    icon: any;
    label: string;
}) {
    return (
        <button
            className="w-full flex items-center gap-3 px-4 py-3
            rounded-2xl hover:bg-white/5 transition"
        >
            <Icon className="w-5 h-5 text-yellow-400" />

            <span className="text-[15px] font-medium text-[#0E0F11] dark:text-[#DEE3E7]">
                {label}
            </span>
        </button>
    );
}

function MenuLink({ label }: { label: string }) {
    return (
        <button
            className="w-full text-left px-3 py-2 rounded-2xl
            text-[#77808D] hover:text-[#77808D]/70 dark:text-[#7B8996] dark:hover:text-[#7B8996]/70 dark:hover:bg-white/5 transition"
        >
            {label}
        </button>
    );
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const path = usePathname();
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { themeMode, lightTheme, darkTheme } = useTheme();
    // 🔥 Scroll effect
    useEffect(() => {
        // 🔥 Click outside to close menu
        // function handleClickOutSide(event: MouseEvent) {
        //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        //         setOpenMenu(false);
        //     }
        // }
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        // window.addEventListener("click", handleClickOutSide);
        return () => {
            window.removeEventListener("scroll", handleScroll)
            // window.removeEventListener("click", handleClickOutSide);

        }
    }, []);

    return (
        <header
            className={`sticky top-0 left-0 w-full z-1000 transition-all border-b border-border bg-white/80 backdrop-blur-xl dark:bg-[#15191d]
      ${scrolled
                    ? "bg-background/95 backdrop-blur-xl shadow-lg"
                    : "bg-background/80 backdrop-blur-xl"
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
                    <div className="relative w-full max-w-[760px]">

                        {/* Search Icon */}
                        <Search
                            className="absolute left-5 top-1/2 -translate-y-1/2 
                              text-[#8B93A7] h-5 w-5"
                            strokeWidth={2.2}
                        />

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Search polymarkets..."
                            className="
                                w-full  
                                h-[40px]
                                pl-14
                                pr-5
                                rounded-xl
                                bg-[#F3F4F6]
                                dark:bg-[#1E2428]
                                text-[#77809B]
                                dark:text-[#77809B]
                                placeholder:text-[#8B93A7]
                                text-[17px]
                                font-medium
                                border border-transparent
                                outline-none
                                transition-all
                                focus:border-white
                                focus:bg-white
                                focus:ring-4
                                focus:ring-[#E5E7EB]
                                dark:focus:ring-[#1E2428]
                                dark:focus:bg-[#1E2428]
                                dark:focus:border-[#1E2428]
                             "
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                    <button className="hidden  rounded-md md:block text-sm hover:bg-[#77809B]/8 text-blue-700 font-bold py-2 px-4">
                        Log In
                    </button>

                    <button className="text-sm text-[#FFFFFF] px-4 h-[36px] rounded-md bg-[#1452F0] hover:bg-[#1452F0]/90 transition">
                        Sign Up
                    </button>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gray-500/10 transition">
                                <Menu className="w-5 h-5 text-gray-900 dark:text-white/90" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="absolute top-[30px] w-[290px] right-0  rounded-3xl border
                               border-border bg-card/95 backdrop-blur-2xl 
                                shadow-2x shadow-black/40 p-0
                                overflow-hidden z-1000 "
                        >
                            {/* TOP */}
                            <div className="p-3 space-y-0.5">
                                <MenuItem icon={Award} label="Leaderboard" />
                                <MenuItem icon={Coins} label="Rewards" />
                                <MenuItem icon={Rocket} label="APIs" />
                                {/* DARK MODE */}
                                {/* DARK MODE */}
                                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Moon className={`w-5 h-5 ${themeMode === "dark" ? "text-indigo-500" : "text-slate-400"}`} />
                                        <span className="text-[15px] font-medium text-[#18181B] dark:text-[#E5E5E5]">
                                            Dark mode
                                        </span>
                                    </div>

                                    {/* Custom Switch */}
                                    <button
                                        role="switch"
                                        aria-checked={themeMode === "dark"}
                                        onClick={() => themeMode === "dark" ? lightTheme() : darkTheme()}
                                        className={`
                                            relative inline-flex items-center
                                            w-[52px] h-[26px] rounded-full
                                            transition-colors duration-300 ease-in-out
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                                            ${themeMode === "dark"
                                                ? "bg-blue-500"
                                                : "bg-[#d1d1d6]"
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                            inline-b lock w-[22px] h-[22px] rounded-full bg-white
                                            shadow-md transform transition-transform duration-300 ease-in-out
                                            ${themeMode === "dark" ? "translate-x-[28px]" : "translate-x-[2px]"}
                                        `}
                                        />
                                    </button>
                                </div>
                            </div>

                            <Separator className="dark:bg-white/10 bg-gray-300" />

                            {/* BOTTOM */}
                            <div className="p-2 space-y-0.2">
                                <MenuLink label="Accuracy" />
                                <MenuLink label="Documentation" />
                                <MenuLink label="Help Center" />
                                <MenuLink label="Terms of Use" />


                                <button
                                    className="
                                        w-full mt-2 flex items-center justify-between
                                        px-3 py-3 rounded-2xl hover:bg-white/5 transition
                                    "
                                >
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <span className="text-lg">🇮🇳</span>
                                        <span>भाषा</span>
                                    </div>

                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                </button>

                            </div>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* 🟣 TABS */}
            <div className="flex justify-center items-center gap-3 px-4 py-1 relative md:gap-6 md:px-6 border-b border-white/10 dark:border-black/20  ">

                {tabs.map((tab) => {
                    const isActive = path === tab.href;

                    return (
                        <button
                            key={tab.label}
                            onClick={() => router.push(tab.href)}
                            className={`
                                relative flex items-center gap-2 h-full px-2 text-sm font-semibold transition-colors duration-200

                                ${isActive
                                    ? "text-[#18181B] dark:text-white"
                                    : "text-[#6B7280] hover:text-[#18181B] dark:text-[#94A3B8] dark:hover:text-white"
                                }
  `}
                        >
                            <tab.icon className="w-4 h-4" />

                            <span>{tab.label}</span>

                            {/* ACTIVE UNDERLINE */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-blue-500"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 35,
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </header >
    );
}

