"use client";

import { LucideIcon } from "lucide-react";

interface MenuItemProps {
    icon: LucideIcon;
    label: string;
}

export default function MenuItem({
    icon: Icon,
    label,
}: MenuItemProps) {
    return (
        <button
            className="
                w-full flex items-center gap-3 px-4 py-3
                rounded-2xl
                hover:bg-black/5 dark:hover:bg-white/5
                transition-colors
            "
        >
            <Icon className="w-5 h-5 text-yellow-500" />

            <span
                className="
                    text-[15px] font-medium
                    text-[#18181B]
                    dark:text-[#E5E7EB]
                "
            >
                {label}
            </span>
        </button>
    );
}