"use client";

import { Pencil, Trash2, Calendar } from "lucide-react";
import type { Category } from "@/types/category.types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    category: Category;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
    isSelected: boolean;
}

function formatDate(dateStr?: string): string {
    if (!dateStr) return "";
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
    return (
        <div
            className={cn(
                "group relative flex items-center gap-3.5 px-4 py-3 rounded-xl border transition-all duration-200",
                isSelected
                    ? "border-amber-500/25 bg-amber-500/[0.05] shadow-sm shadow-amber-500/10"
                    : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.09]"
            )}
        >
            {/* Selected indicator */}
            {isSelected && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-amber-400 to-orange-500" />
            )}

            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-lg shrink-0 select-none">
                {category.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium tracking-tight truncate leading-snug">
                    {category.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[11px] text-slate-500 font-mono truncate">
                        /{category.slug}
                    </span>
                    {category.createdAt && (
                        <>
                            <span className="text-slate-700 text-[10px] shrink-0">·</span>
                            <span className="text-[11px] text-slate-600 flex items-center gap-1 shrink-0">
                                <Calendar size={9} aria-hidden="true" />
                                {formatDate(category.createdAt)}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Actions — visible on hover or when selected */}
            <div className={cn(
                "flex items-center gap-1 shrink-0 transition-opacity duration-150",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
                <button
                    onClick={onEdit}
                    disabled={isDeleting}
                    aria-label={`Edit ${category.name}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <Pencil size={13} strokeWidth={1.5} />
                </button>
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    aria-label={`Delete ${category.name}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isDeleting ? (
                        <span className="w-3 h-3 border border-rose-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Trash2 size={13} strokeWidth={1.5} />
                    )}
                </button>
            </div>
        </div>
    );
}