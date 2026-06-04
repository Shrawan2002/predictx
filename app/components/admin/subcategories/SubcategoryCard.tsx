"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { SubCategory } from "@/types/subcategory.types";
import { getIconOption } from "@/constants/icon-options";
import { cn } from "@/lib/utils";

interface SubcategoryCardProps {
    subCategory: SubCategory;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
    isSelected: boolean;
    // ✅ pass parent category name from the list since SubCategory
    // may not have .category joined
    parentCategoryName?: string;
    parentCategoryIcon?: string;
}

function formatDate(dateStr?: string): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function SubcategoryCard({
    subCategory,
    onEdit,
    onDelete,
    isDeleting,
    isSelected,
    parentCategoryName,
    parentCategoryIcon,
}: SubcategoryCardProps) {
    const iconOption = getIconOption(subCategory.icon ?? "");
    const IconComponent = iconOption?.icon;

    // Use joined .category if present, fallback to passed props
    const catName = subCategory.category?.name ?? parentCategoryName;
    const catIcon = subCategory.category?.icon ?? parentCategoryIcon;

    return (
        <div className={cn(
            "group flex items-center gap-4",
            "px-5 h-[64px] border-b border-white/[0.04]",
            "border-l-2 transition-all duration-150",
            isSelected
                ? "bg-violet-500/[0.06] border-l-violet-500"
                : "border-l-transparent hover:bg-white/[0.03]"
        )}>

            {/* ── LEFT: icon + name + slug ── */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-150",
                    isSelected
                        ? "bg-violet-500/10 border-violet-500/25"
                        : "bg-white/[0.04] border-white/[0.07] group-hover:bg-white/[0.07] group-hover:border-white/[0.12]"
                )}>
                    {IconComponent ? (
                        <IconComponent className={cn(
                            "w-4 h-4 transition-colors duration-150",
                            isSelected ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                        )} />
                    ) : (
                        <span className="text-slate-700 text-xs select-none">?</span>
                    )}
                </div>
                <div className="min-w-0">
                    <p className={cn(
                        "text-sm font-medium truncate leading-none",
                        isSelected ? "text-violet-100" : "text-white"
                    )}>
                        {subCategory.name}
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono mt-1 truncate leading-none">
                        /{subCategory.slug}
                    </p>
                </div>
            </div>

            {/* ── MIDDLE: parent category tag ── */}
            <div className="w-[100px] shrink-0">
                {catName ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-teal-500/10 border border-teal-500/15 text-[10px] font-medium text-teal-400 max-w-full truncate">
                        {catIcon && <span className="text-xs leading-none shrink-0">{catIcon}</span>}
                        <span className="truncate">{catName}</span>
                    </span>
                ) : (
                    <span className="text-[10px] text-slate-700">—</span>
                )}
            </div>

            {/* ── DATE ── */}
            <div className="w-[100px] shrink-0 text-right">
                <span className="text-xs text-slate-500 tabular-nums">
                    {formatDate(subCategory.createdAt)}
                </span>
            </div>

            {/* ── ACTIONS ── */}
            <div className={cn(
                "w-[62px] shrink-0 flex items-center justify-end gap-1",
                "transition-opacity duration-150",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
                <button
                    onClick={onEdit}
                    disabled={isDeleting}
                    aria-label={`Edit ${subCategory.name}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all disabled:opacity-40"
                >
                    <Pencil size={12} strokeWidth={1.5} />
                </button>
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    aria-label={`Delete ${subCategory.name}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all disabled:opacity-40"
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