"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
    TrendingUp,
    Globe,
    Trophy,
    Bitcoin,
    X,
    House,
    LineChart,
    Activity,
    Briefcase,
    Star,
} from "lucide-react";

const filters = [
    { label: "Home", icon: House, href: "/home" },
    { label: "Markets", icon: LineChart, href: "/markets" },
    { label: "Activity", icon: Activity, href: "/activity" },
    { label: "Portfolio", icon: Briefcase, href: "/portfolio" },
    { label: "Favourites", icon: Star, href: "/favourites" },
];

const categories = [
    { label: "Trending", icon: TrendingUp },
    { label: "Crypto", icon: Bitcoin },
    { label: "Politics", icon: Globe },
    { label: "Sports", icon: Trophy },
];

export default function Sidebar({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const router = useRouter();
    const path = usePathname();

    const onNavigate = (href: string) => {
        router.push(href);
        onClose();
    };

    return (
        <>
            {/* 🖥 DESKTOP SIDEBAR */}
            <div
                className="
                hidden md:flex fixed top-[112px] left-0
                w-[220px] h-[calc(100vh-112px)]
                bg-white dark:bg-[#0B0F19]
                border-r border-black/5 dark:border-white/10
                flex-col p-5 transition-colors duration-300
            "
            >
                {/* MAIN MENU */}
                <div>
                    <h2 className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold text-[#9CA3AF] dark:text-[#64748B]">
                        Menu
                    </h2>

                    <div className="space-y-2">
                        {filters.map((item) => {
                            const isActive = path === item.href;

                            return (
                                <div
                                    key={item.label}
                                    onClick={() => onNavigate(item.href)}
                                    className={`
                                        group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                                        transition-all duration-200

                                        ${isActive
                                            ? "bg-blue-500/10 text-[#18181B] dark:text-white border border-blue-500/20"
                                            : "text-[#6B7280] hover:text-[#18181B] hover:bg-black/5 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/5"
                                        }
                                    `}
                                >
                                    {/* ICON */}
                                    <div className="p-1.5 rounded-lg">
                                        <item.icon
                                            className={`
                                                w-4 h-4 transition-colors duration-200
                                                ${isActive
                                                    ? "text-blue-500 dark:text-blue-400"
                                                    : "text-[#6B7280] group-hover:text-[#18181B] dark:text-[#94A3B8] dark:group-hover:text-white"
                                                }
                                            `}
                                        />
                                    </div>

                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CATEGORIES */}
                <div className="mt-8">
                    <h2 className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold text-[#9CA3AF] dark:text-[#64748B]">
                        Categories
                    </h2>

                    <div className="space-y-2">
                        {categories.map((item) => (
                            <div
                                key={item.label}
                                className="
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                                    text-[#6B7280] hover:text-[#18181B] hover:bg-black/5
                                    dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/5
                                    transition-all duration-200
                                "
                            >
                                <item.icon className="w-4 h-4" />

                                <span className="text-sm font-medium">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 📱 MOBILE DRAWER */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            className="md:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* DRAWER */}
                        <motion.div
                            className="
                                md:hidden fixed top-0 left-0
                                w-[240px] h-full
                                bg-white dark:bg-[#0B0F19]
                                border-r border-black/5 dark:border-white/10
                                z-50 p-6 flex flex-col shadow-2xl
                            "
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-bold text-xl tracking-tight text-[#18181B] dark:text-white">
                                    PredictX
                                </span>

                                <button
                                    onClick={onClose}
                                    className="
                                        p-2 rounded-lg
                                        text-[#6B7280] hover:text-[#18181B]
                                        dark:text-[#94A3B8] dark:hover:text-white
                                        hover:bg-black/5 dark:hover:bg-white/5
                                        transition
                                    "
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <div className="flex flex-col flex-1 overflow-y-auto gap-8">
                                {/* MOBILE MENU */}
                                <div>
                                    <h2 className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold text-[#9CA3AF] dark:text-[#64748B]">
                                        Menu
                                    </h2>

                                    <div className="space-y-2">
                                        {filters.map((item) => {
                                            const isActive =
                                                path === item.href;

                                            return (
                                                <div
                                                    key={item.label}
                                                    onClick={() =>
                                                        onNavigate(item.href)
                                                    }
                                                    className={`
                                                        group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                                                        transition-all duration-200

                                                        ${isActive
                                                            ? "bg-blue-500/10 text-[#18181B] dark:text-white border border-blue-500/20"
                                                            : "text-[#6B7280] hover:text-[#18181B] hover:bg-black/5 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/5"
                                                        }
                                                    `}
                                                >
                                                    <item.icon
                                                        className={`
                                                            w-5 h-5
                                                            ${isActive
                                                                ? "text-blue-500 dark:text-blue-400"
                                                                : "text-[#6B7280] dark:text-[#94A3B8]"
                                                            }
                                                        `}
                                                    />

                                                    <span className="text-sm font-medium">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* MOBILE CATEGORIES */}
                                <div>
                                    <h2 className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold text-[#9CA3AF] dark:text-[#64748B]">
                                        Categories
                                    </h2>

                                    <div className="space-y-2">
                                        {categories.map((item) => (
                                            <div
                                                key={item.label}
                                                className="
                                                    flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                                                    text-[#6B7280] hover:text-[#18181B] hover:bg-black/5
                                                    dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/5
                                                    transition-all duration-200
                                                "
                                            >
                                                <item.icon className="w-5 h-5" />

                                                <span className="text-sm font-medium">
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}