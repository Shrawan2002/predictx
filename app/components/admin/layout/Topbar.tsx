"use client";

import Link from "next/link";

import {
    Bell,
    Search,
    Settings,
    Menu,
    ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
    onMenuClick?: () => void;
}

export default function Topbar({
    onMenuClick,
}: Props) {
    return (
        <header
            className="
                sticky
                top-0
                z-50
                h-[72px]
                border-b
                border-white/10
                bg-[#0B1120]/70
                backdrop-blur-2xl
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    h-full
                    px-6
                "
            >
                {/* LEFT */}

                <div className="flex items-center gap-4">
                    {/* MOBILE MENU */}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* SEARCH */}

                    <div
                        className="
                            hidden
                            md:flex
                            items-center
                            relative
                            w-[340px]
                        "
                    >
                        <Search
                            className="
                                absolute
                                left-3
                                h-4
                                w-4
                                text-muted-foreground
                            "
                        />

                        <Input
                            placeholder="Search markets, users, trades..."
                            className="
                                pl-10
                                h-11
                                rounded-2xl
                                bg-white/[0.04]
                                border-white/10
                                focus-visible:ring-blue-500
                            "
                        />
                    </div>
                </div>

                {/* RIGHT */}

                <div className="flex items-center gap-3">
                    {/* LIVE STATUS */}

                    <div
                        className="
                            hidden
                            md:flex
                            items-center
                            gap-2
                            px-4
                            h-10
                            rounded-2xl
                            bg-emerald-500/10
                            border
                            border-emerald-500/20
                        "
                    >
                        <div
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-emerald-400
                                animate-pulse
                            "
                        />

                        <span
                            className="
                                text-sm
                                font-medium
                                text-emerald-400
                            "
                        >
                            System Online
                        </span>
                    </div>

                    {/* NOTIFICATIONS */}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="
                            relative
                            rounded-2xl
                            bg-white/[0.04]
                            border
                            border-white/10
                            hover:bg-white/[0.08]
                        "
                    >
                        <Bell className="h-5 w-5" />

                        <span
                            className="
                                absolute
                                top-2
                                right-2
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />
                    </Button>

                    {/* SETTINGS */}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="
                            rounded-2xl
                            bg-white/[0.04]
                            border
                            border-white/10
                            hover:bg-white/[0.08]
                        "
                    >
                        <Settings className="h-5 w-5" />
                    </Button>

                    {/* PROFILE */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    h-12
                                    rounded-2xl
                                    bg-white/[0.04]
                                    border
                                    border-white/10
                                    hover:bg-white/[0.08]
                                    transition
                                "
                            >
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback
                                        className="
                                            bg-blue-500/20
                                            text-blue-400
                                        "
                                    >
                                        SK
                                    </AvatarFallback>
                                </Avatar>

                                <div
                                    className="
                                        hidden
                                        md:flex
                                        flex-col
                                        items-start
                                    "
                                >
                                    <span
                                        className="
                                            text-sm
                                            font-semibold
                                        "
                                    >
                                        Shrawan
                                    </span>

                                    <span
                                        className="
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        Super Admin
                                    </span>
                                </div>

                                <ChevronDown
                                    className="
                                        hidden
                                        md:block
                                        h-4
                                        w-4
                                        text-muted-foreground
                                    "
                                />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="
                                w-56
                                rounded-2xl
                                border-white/10
                                bg-[#111827]
                                backdrop-blur-2xl
                            "
                        >
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                Billing
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="
                                    text-red-400
                                    focus:text-red-400
                                "
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}