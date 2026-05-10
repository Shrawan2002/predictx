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

            <span className="text-[15px] font-medium text-white">
                {label}
            </span>
        </button>
    );
}

function MenuLink({ label }: { label: string }) {
    return (
        <button
            className="w-full text-left px-3 py-3 rounded-2xl
            text-gray-400 hover:text-white hover:bg-white/5 transition"
        >
            {label}
        </button>
    );
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const path = usePathname();
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
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
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                                <Menu className="w-5 h-5 text-white" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="absolute top-[30px] w-[290px] right-0  rounded-3xl border
                               border-white/10 bg-[#11161d]/95 backdrop-blur-2xl 
                                shadow-2x shadow-black/40 p-0
                                overflow-hidden z-1000 "
                        >
                            {/* TOP */}
                            <div className="p-3 space-y-0.5">
                                <MenuItem icon={Award} label="Leaderboard" />
                                <MenuItem icon={Coins} label="Rewards" />
                                <MenuItem icon={Rocket} label="APIs" />
                                {/* DARK MODE */}
                                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Moon className="w-5 h-5 text-blue-400" />
                                        <span className="text-[15px] font-medium text-white">
                                            Dark mode
                                        </span>
                                    </div>

                                    <Switch
                                        checked={themeMode === "dark"}
                                        onCheckedChange={(checked) => {
                                            checked ? darkTheme() : lightTheme();
                                        }}
                                    />
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            {/* BOTTOM */}
                            <div className="p-3 space-y-0.3">
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
        </header >
    );
}

