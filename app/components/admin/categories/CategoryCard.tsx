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
        <div
            className={cn(
                "group relative rounded-2xl border p-4",
                "bg-[#111827]",
                "border-white/[0.06]",
                "transition-all duration-200",
                "hover:bg-[#172033]",
                "hover:border-cyan-500/20",
                "hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                isSelected &&
                "border-cyan-500/20 bg-cyan-500/6 shadow-[0_0_20px_rgba(6,182,212,0.08)]"
            )}
        >
            <div className="flex items-start gap-4">

                {/* ICON */}
                <div
                    className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all",
                        isSelected
                            ? "bg-cyan-500/10 border-cyan-500/20"
                            : "bg-white/[0.03] border-white/[0.06]"
                    )}
                >
                    {IconComponent ? (
                        <IconComponent
                            className={cn(
                                "w-5 h-5",
                                isSelected
                                    ? "text-cyan-400"
                                    : "text-slate-400 group-hover:text-cyan-400"
                            )}
                        />
                    ) : (
                        <span className="text-slate-500 text-xs">?</span>
                    )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-2 flex-wrap">

                        <h3
                            className={cn(
                                "text-base font-semibold truncate",
                                isSelected
                                    ? "text-white"
                                    : "text-slate-100"
                            )}
                        >
                            {category.name}
                        </h3>

                        <span
                            className="
                            text-[10px]
                            px-2
                            py-0.5
                            rounded-full
                            bg-emerald-500/10
                            border
                            border-emerald-500/20
                            text-emerald-400
                            font-medium
                            shrink-0
                            "
                        >
                            Active
                        </span>

                    </div>

                    <p className="text-xs text-slate-500 font-mono mt-1 truncate">
                        /{category.slug}
                    </p>

                    <p className="text-xs text-slate-500 mt-3">
                        Created {formatDate(category.createdAt)}
                    </p>

                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 shrink-0">

                    <button
                        onClick={onEdit}
                        disabled={isDeleting}
                        aria-label={`Edit ${category.name}`}
                        className="
                        w-9
                        h-9
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-slate-500
                        hover:text-cyan-400
                        hover:bg-cyan-500/10
                        hover:border-cyan-500/20
                        border
                        border-transparent
                        transition-all
                        disabled:opacity-40
                        "
                    >
                        <Pencil size={14} strokeWidth={1.7} />
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={isDeleting}
                        aria-label={`Delete ${category.name}`}
                        className="
                        w-9
                        h-9
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-slate-500
                        hover:text-rose-400
                        hover:bg-rose-500/10
                        hover:border-rose-500/20
                        border
                        border-transparent
                        transition-all
                        disabled:opacity-40
                        "
                    >
                        {isDeleting ? (
                            <span className="w-3 h-3 border border-rose-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Trash2 size={14} strokeWidth={1.7} />
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
}