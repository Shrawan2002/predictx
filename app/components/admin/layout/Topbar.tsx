"use client";

import {
    Bell, Search, Settings, Menu, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";

interface Props {
    onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
    const admin = useAuthStore(s => s.admin);

    const initials = admin?.name
        ? admin.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
        : "AD";

    return (
        /*
         * TOPBAR
         * sticky top-0 z-40 = stays above content, below modals
         * h-16 = 64px fixed height
         * border-b = subtle surface separation
         * backdrop-blur = glassmorphism on scroll
         */
        <header className="sticky top-0 z-40 h-[72px] shrink-0 flex items-center justify-between px-4 lg:px-6 border-b border-white/5 bg-[#0B1120]/95 backdrop-blur-2xl">
            {/* ── LEFT ── */}
            <div className="flex items-center gap-6 flex-1">
                {/* Mobile menu toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden w-8 h-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    onClick={onMenuClick}
                >
                    <Menu className="h-4 w-4" />
                </Button>
                <div className="hidden xl:flex flex-col min-w-[220px]">
                    <h1 className="text-lg font-semibold text-white tracking-tight">
                        Dashboard
                    </h1>

                    <p className="text-sm text-slate-400">
                        Monitor platform activity
                    </p>
                </div>

                {/* Search — hidden on mobile */}
                <div className="hidden md:flex items-center relative flex-1 max-w-xl">
                    <Search className="absolute left-3 h-4 w-4 text-slate-500 pointer-events-none" />
                    <Input
                        placeholder="Search markets, users, trades..."
                        className="
                                  pl-10
                                  h-11
                                  rounded-2xl
                                  bg-white/[0.03]
                                  border-white/[0.06]
                                  text-slate-200
                                  placeholder:text-slate-500
                                  focus-visible:ring-2
                                  focus-visible:ring-blue-500/30
                                  focus-visible:border-blue-500/30
                        "
                    />
                </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="flex items-center gap-3 ml-6">
                {/* System status */}
                <div className="hidden lg:flex items-center gap-2 px-4 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-emerald-400">System Online</span>
                </div>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="
                    relative
                    w-10
                    h-10
                    rounded-xl
                    bg-white/[0.03]
                    border
                    border-white/[0.06]
                    text-slate-300
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition-all" >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </Button>

                {/* Settings */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white/[0.03]
                    border
                    border-white/[0.06]
                    text-slate-300
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition-all" >
                    <Settings className="h-4 w-4" />
                </Button>

                {/* Profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 px-3 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-[11px] font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-xs font-semibold text-white leading-none">
                                    {admin?.name ?? "Admin"}
                                </span>
                                <span className="text-[10px] text-slate-400 leading-none mt-0.5">
                                    {admin?.role?.replace("_", " ") ?? "Super Admin"}
                                </span>
                            </div>
                            <ChevronDown className="hidden md:block h-3 w-3 text-zinc-500" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        style={{
                            background: "#111827",
                            borderColor: "rgba(255,255,255,0.06)",
                        }}
                        className="w-48 rounded-xl shadow-2xl shadow-black/50 p-1"
                    >
                        {["Profile", "Settings", "Billing"].map((item) => (
                            <DropdownMenuItem
                                key={item}
                                className="rounded-lg text-zinc-300 focus:bg-zinc-800 focus:text-white text-sm cursor-pointer"
                            >
                                {item}
                            </DropdownMenuItem>
                        ))}
                        <div className="h-px bg-zinc-800 my-1" />
                        <DropdownMenuItem className="rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-400 text-sm cursor-pointer">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header >
    );
}