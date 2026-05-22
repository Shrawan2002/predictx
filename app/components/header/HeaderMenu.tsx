"use client";

import {
    Award,
    ChevronRight,
    Coins,
    Menu,
    Rocket,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiSettings } from "react-icons/ci";

import { Separator } from "@/components/ui/separator";

import MenuItem from "./MenuItem";
import MenuLink from "./MenuLink";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";

export default function HeaderMenu() {
    const { user } = useAuthStore();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="
                        w-10 h-10 rounded-xl
                        bg-black/[0.03]
                        dark:bg-white/5

                        flex items-center justify-center

                        hover:bg-black/5
                        dark:hover:bg-white/10

                        transition
                    "
                >
                    <Menu className="w-5 h-5 text-[#18181B] dark:text-white" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="
                    absolute
                    right-0
                    top-10
                    w-[290px]
                    rounded-xl
                    border border-border

                    bg-white/95
                    dark:bg-[#15191D]/95

                    backdrop-blur-2xl
                    shadow-2xl

                    p-0 overflow-hidden
                "
            >{
                    user && (
                        <div className="flex items-center justify-between px-5 pt-1 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-400 flex items-center justify-center text-white dark:text-white">{user?.name.slice(0, 2).toUpperCase()}</span>
                                <span className="text-[#18181B] dark:text-white text-sm font-medium">{user?.name[0].toLocaleUpperCase() + user?.name.slice(1)}</span>
                            </div>
                            <div className="flex">
                                <CiSettings size={25} color="#18181B] dark:text-white" />
                            </div>
                        </div>
                    )
                }
                <Separator className="bg-black/10 dark:bg-white/10" />
                {/* TOP */}
                <div className="p-3 space-y-1">
                    <MenuItem icon={Award} label="Leaderboard" />
                    <MenuItem icon={Coins} label="Rewards" />
                    <MenuItem icon={Rocket} label="APIs" />
                    <ThemeToggle />
                </div>

                <Separator className="bg-black/10 dark:bg-white/10" />

                {/* BOTTOM */}
                <div className="p-2 space-y-1">
                    <MenuLink label="Accuracy" />
                    <MenuLink label="Documentation" />
                    <MenuLink label="Help Center" />
                    <MenuLink label="Terms of Use" />

                    <button
                        className="
                            w-full mt-2
                            flex items-center justify-between

                            px-3 py-3 rounded-2xl

                            hover:bg-black/5
                            dark:hover:bg-white/5

                            transition
                        "
                    >
                        <div
                            className="
                                flex items-center gap-3
                                text-[#6B7280]
                                dark:text-[#94A3B8]
                            "
                        >
                            <span className="text-lg">🇮🇳</span>
                            <span>भाषा</span>
                        </div>

                        <ChevronRight
                            className="
                                w-4 h-4
                                text-[#9CA3AF]
                            "
                        />
                    </button>
                </div>
                {
                    user && (
                        <div className="p-3">
                            <Button className="w-full text-[#E23939] dark:text-red-500 hover:border-[#E23939] hover:text-[#E23939] hover:bg-red-100/60" variant="outline">Logout</Button>
                        </div>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}