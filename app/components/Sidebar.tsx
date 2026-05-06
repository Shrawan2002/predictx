"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
    Clock,
    TrendingUp,
    Globe,
    Trophy,
    Bitcoin,
    X,
    House,
    LineChart,
    Activity,
    Briefcase,
    Star
} from "lucide-react";

const filters = [
    { label: "Home", icon: House, href: "/home" },
    { label: "Markets", icon: LineChart, href: "/markets" },
    { label: "Activity", icon: Activity, href: "/activity" },
    { label: "Portfolio", icon: Briefcase, href: "/portfolio" },
    { label: "Favourites", icon: Star, href: "/favourites" },
]

const categories = [
    { label: "Trending", icon: TrendingUp },
    { label: "Crypto", icon: Bitcoin },
    { label: "Politics", icon: Globe },
    { label: "Sports", icon: Trophy },
];


// const timeFilters = ["5 Min", "15 Min", "1 Hour", "4 Hours", "Daily"];

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
    }

    return (
        <>
            {/* 🟢 DESKTOP SIDEBAR */}
            <div className="hidden md:flex fixed  top-[112px] left-0 w-[200px] h-[calc(100vh-112px)] bg-[#15191d] border-r border-white/10 flex-col p-5">
                {/* CATEGORY */}
                <div>
                    {/* <h2 className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                        Categories
                    </h2> */}

                    <div className="space-y-2 ">
                        {filters.map((item) => {
                            const isActive = path === item.href;
                            return (
                                <div
                                    onClick={() => onNavigate(item.href)}
                                    key={item.label}
                                    className={`group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-gray-400 hover:text-white hover:bg-blue-800/40 transition ${isActive ? "bg-blue-800/40 text-white" : ""}`}
                                >
                                    {/* ICON WRAPPER */}
                                    <div className="p-1.5 rounded-lg transition group-hover:bg-blue-500/20">
                                        <item.icon className=" w-4 h-4 text-gray-400 group-hover:text-white transition" />
                                    </div>
                                    <span className="text-sm"> {item.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Categories FILTER */}
                <div className="mt-6">
                    <h2 className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                        Categories
                    </h2>

                    <div className="space-y-2">
                        {categories.map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-gray-400 hover:text-white hover:bg-blue-800/40 transition"
                            >
                                < item.icon size={16} />
                                {item.label}
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
                            className="md:hidden fixed inset-0 bg-black/50 z-40  "
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* DRAWER */}
                        <motion.div
                            className="md:hidden fixed top-0 left-0 w-[200px] h-full bg-[#15191d] z-50 p-6 flex flex-col border-r border-white/10 shadow-2xl"
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-bold text-xl tracking-tight text-white">PredictX</span>
                                <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar gap-8">
                                {/* MAIN NAVIGATION */}
                                <div>
                                    <h2 className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-semibold">Menu</h2>
                                    <div className="space-y-1">
                                        {filters.map((item) => {
                                            const isActive = path === item.href;
                                            return (
                                                <div
                                                    onClick={() => onNavigate(item.href)}
                                                    key={item.label}
                                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 
                                                        ${isActive
                                                            ? "bg-blue-600/20 text-white border border-blue-500/30"
                                                            : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                                >
                                                    <item.icon size={20} className={isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white"} />
                                                    <span className="font-medium text-sm">{item.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* CATEGORIES */}
                                <div>
                                    <h2 className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-semibold">Categories</h2>
                                    <div className="space-y-1">
                                        {categories.map((item) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                                            >
                                                <item.icon size={20} />
                                                <span className="font-medium text-sm">{item.label}</span>
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