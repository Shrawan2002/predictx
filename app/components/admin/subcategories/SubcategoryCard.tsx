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
    const rawIcon = (subCategory.icon ?? "").trim();
    const IconComponent = rawIcon ? (getIconOption(rawIcon)?.icon ?? null) : null;

    const catName = subCategory.category?.name ?? parentCategoryName;
    const rawCatIcon = ((subCategory.category?.icon ?? parentCategoryIcon) ?? "").trim();
    const CatIconComponent = rawCatIcon ? (getIconOption(rawCatIcon)?.icon ?? null) : null;

    const iconFallback = rawIcon
        ? rawIcon.charAt(0).toUpperCase()
        : subCategory.name.charAt(0).toUpperCase();

    return (
        <div
            className={cn(
                "group relative flex items-center gap-4 px-5 h-[68px]",
                "border-b border-cyan-500/[0.06] border-l-2 transition-all duration-200",
                isSelected
                    ? "bg-gradient-to-r from-cyan-500/[0.08] to-transparent border-l-cyan-400"
                    : "border-l-transparent hover:bg-gradient-to-r hover:from-cyan-500/[0.04] hover:to-transparent hover:border-l-cyan-500/40"
            )}
        >
            {/* ── Subtle top-highlight line on hover ── */}
            <div className={cn(
                "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 transition-opacity duration-200",
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )} />

            {/* ── Icon box ── */}
            <div className={cn(
                "relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
                isSelected
                    ? "bg-cyan-400/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.12)]"
                    : "bg-[#0F172A] border border-cyan-500/[0.12] group-hover:bg-cyan-500/[0.1] group-hover:border-cyan-400/25 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.08)]"
            )}>
                {IconComponent ? (
                    <IconComponent className={cn(
                        "w-[18px] h-[18px] transition-all duration-200",
                        isSelected
                            ? "text-cyan-300"
                            : "text-slate-500 group-hover:text-cyan-400 group-hover:scale-110"
                    )} />
                ) : (
                    <span className={cn(
                        "text-xs font-bold select-none transition-colors duration-200",
                        isSelected ? "text-cyan-300" : "text-slate-500 group-hover:text-cyan-400"
                    )}>
                        {iconFallback}
                    </span>
                )}

                {/* Selected dot indicator */}
                {isSelected && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                )}
            </div>

            {/* ── Name + slug ── */}
            <div className="flex-1 min-w-0">
                <p className={cn(
                    "text-sm font-semibold truncate leading-tight tracking-[-0.01em]",
                    isSelected ? "text-cyan-100" : "text-slate-100 group-hover:text-white"
                )}>
                    {subCategory.name}
                </p>
                <p className="text-[11px] text-slate-600 font-mono mt-0.5 truncate leading-none group-hover:text-slate-500 transition-colors duration-200">
                    /{subCategory.slug}
                </p>
            </div>

            {/* ── Parent category badge ── */}
            <div className="w-[116px] shrink-0 flex justify-start">
                {catName ? (
                    <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold max-w-full",
                        "bg-cyan-400/[0.07] border border-cyan-500/[0.12] text-cyan-400",
                        "group-hover:bg-cyan-400/[0.12] group-hover:border-cyan-400/20 transition-all duration-200"
                    )}>
                        {CatIconComponent ? (
                            <CatIconComponent className="w-3 h-3 shrink-0 text-cyan-400" />
                        ) : rawCatIcon ? (
                            <span className="text-[11px] font-bold text-cyan-400 shrink-0 leading-none">
                                {rawCatIcon.charAt(0).toUpperCase()}
                            </span>
                        ) : null}
                        <span className="truncate">{catName}</span>
                    </span>
                ) : (
                    <span className="text-[10px] text-slate-700">—</span>
                )}
            </div>

            {/* ── Date ── */}
            <div className="w-[96px] shrink-0 text-right">
                <span className="text-[11px] text-slate-600 tabular-nums group-hover:text-slate-500 transition-colors duration-200">
                    {formatDate(subCategory.createdAt)}
                </span>
            </div>

            {/* ── Actions — always visible, not hidden ── */}
            <div className="w-[72px] shrink-0 flex items-center justify-end gap-1.5">
                {/* Edit button */}
                <button
                    onClick={onEdit}
                    disabled={isDeleting}
                    aria-label={`Edit ${subCategory.name}`}
                    className={cn(
                        "relative w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40",
                        "border text-slate-500",
                        "bg-[#0F172A] border-white/[0.06]",
                        "hover:text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400/25 hover:shadow-[0_0_8px_rgba(34,211,238,0.15)] hover:scale-110",
                        "active:scale-95"
                    )}
                >
                    <Pencil size={11} strokeWidth={1.8} />
                </button>

                {/* Delete button */}
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    aria-label={`Delete ${subCategory.name}`}
                    className={cn(
                        "relative w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-40",
                        "border text-slate-500",
                        "bg-[#0F172A] border-white/[0.06]",
                        "hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/25 hover:shadow-[0_0_8px_rgba(244,63,94,0.15)] hover:scale-110",
                        "active:scale-95"
                    )}
                >
                    {isDeleting ? (
                        <span className="w-2.5 h-2.5 border border-rose-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Trash2 size={11} strokeWidth={1.8} />
                    )}
                </button>
            </div>
        </div>
    );
}