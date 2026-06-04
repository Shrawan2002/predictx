"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Category } from "@/types/category.types";
import { cn } from "@/lib/utils";
import { getIconOption } from "@/constants/icon-options";

interface CategoryCardProps {
    category: Category;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
    isSelected: boolean;
}

function formatDate(dateStr?: string): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function CategoryCard({
    category,
    onEdit,
    onDelete,
    isDeleting,
    isSelected,
}: CategoryCardProps) {
    const iconOption = getIconOption(category.icon);
    const IconComponent = iconOption?.icon;

    return (
        <div className={cn(
            "group flex items-center gap-4",
            "px-5 h-[64px] border-b border-zinc-800/40",
            "border-l-2 transition-all duration-150",
            isSelected
                ? "bg-amber-500/[0.04] border-l-amber-500"
                : "border-l-transparent hover:bg-zinc-800/20"
        )}>

            {/* LEFT: icon + name + slug */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-150",
                    isSelected
                        ? "bg-amber-500/10 border-amber-500/25"
                        : "bg-zinc-800/60 border-zinc-700/60 group-hover:bg-zinc-700/60 group-hover:border-zinc-600/60"
                )}>
                    {IconComponent ? (
                        <IconComponent className={cn(
                            "w-4 h-4 transition-colors",
                            isSelected ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300"
                        )} />
                    ) : (
                        <span className="text-zinc-700 text-xs">?</span>
                    )}
                </div>
                <div className="min-w-0">
                    <p className={cn(
                        "text-sm font-medium truncate leading-none",
                        isSelected ? "text-amber-100" : "text-zinc-100"
                    )}>
                        {category.name}
                    </p>
                    <p className="text-[11px] text-zinc-600 font-mono mt-1 truncate leading-none">
                        /{category.slug}
                    </p>
                </div>
            </div>

            {/* DATE */}
            <div className="w-[110px] shrink-0 text-right">
                <span className="text-xs text-zinc-600 tabular-nums">
                    {formatDate(category.createdAt)}
                </span>
            </div>

            {/* ACTIONS */}
            <div className={cn(
                "w-[62px] shrink-0 flex items-center justify-end gap-1",
                "transition-opacity duration-150",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
                <button
                    onClick={onEdit}
                    disabled={isDeleting}
                    aria-label={`Edit ${category.name}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all disabled:opacity-40"
                >
                    <Pencil size={12} strokeWidth={1.5} />
                </button>
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    aria-label={`Delete ${category.name}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all disabled:opacity-40"
                >
                    {isDeleting ? (
                        <span className="w-2.5 h-2.5 border border-rose-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Trash2 size={12} strokeWidth={1.5} />
                    )}
                </button>
            </div>
        </div>
    );
}