"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSubCategoryStore } from "@/store/subCategoryStore";
import { useCategoryStore } from "@/store/categoryStore";
import SubcategoryCard from "@/components/admin/subcategories/SubcategoryCard";
import DeleteSubcategoryDialog from "./DeleteSubcategoryDialog";
import { getIconOption } from "@/constants/icon-options"; // ✅ needed to resolve icon strings
import type { SubCategory } from "@/types/subcategory.types";

function SkeletonRow() {
    return (
        <div className="flex items-center gap-4 px-5 h-[64px] border-b border-white/[0.04] animate-pulse">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] shrink-0" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-28 bg-white/[0.06] rounded" />
                    <div className="h-2 w-20 bg-white/[0.04] rounded" />
                </div>
            </div>
            <div className="w-[100px] shrink-0 flex justify-end">
                <div className="h-2.5 w-16 bg-white/[0.04] rounded" />
            </div>
            <div className="w-[62px] shrink-0 flex gap-1 justify-end">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04]" />
                <div className="w-7 h-7 rounded-lg bg-white/[0.04]" />
            </div>
        </div>
    );
}

export default function SubcategoryList() {
    const {
        categoryWithSubCategories,
        loading,
        deleting,
        selectedSubCategory,
        selectedCategoryFilter,
        search,
        setSearch,
        setSelectedSubCategory,
        setSelectedCategoryFilter,
    } = useSubCategoryStore();

    const { categories } = useCategoryStore();

    const [deleteTarget, setDeleteTarget] = useState<SubCategory | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const subCategories = categoryWithSubCategories?.subCategories ?? [];

    const filtered = subCategories.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.slug.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (sub: SubCategory) => {
        setSelectedSubCategory(sub);
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            document.getElementById("subcategory-form")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDeleteClick = (sub: SubCategory) => {
        setDeleteTarget(sub);
        setDialogOpen(true);
    };

    // ✅ Helper to render a Lucide icon from string name
    function CategoryIcon({ iconName, className }: { iconName: string; className?: string }) {
        const opt = getIconOption(iconName);
        if (!opt) return <span className="text-[10px]">{iconName}</span>;
        const Icon = opt.icon;
        return <Icon className={className ?? "w-3 h-3"} />;
    }

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

                {/* ── Category filter pills ── */}
                {categories.length > 0 && (
                    <div className="shrink-0 flex items-center gap-1.5 px-5 py-3 border-b border-white/[0.06] overflow-x-auto [&::-webkit-scrollbar]:hidden bg-[#0a0d14]">
                        <span className="text-[10px] text-slate-600 font-medium tracking-widest uppercase shrink-0 mr-1">
                            Filter:
                        </span>

                        {/* All pill */}
                        <button
                            type="button"
                            onClick={() => setSelectedCategoryFilter(null)}
                            className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${!selectedCategoryFilter
                                ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                                : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-slate-300 hover:bg-white/[0.05]"
                                }`}
                        >
                            All
                        </button>

                        {/* Category pills */}
                        {categories.map((cat) => {
                            const isActive = selectedCategoryFilter === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategoryFilter(cat.id)}
                                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${isActive
                                        ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                                        : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-slate-300 hover:bg-white/[0.05]"
                                        }`}
                                >
                                    {/* ✅ FIX 1 — render actual Lucide icon not raw string */}
                                    <CategoryIcon
                                        iconName={cat.icon}
                                        className={`w-3 h-3 shrink-0 ${isActive ? "text-violet-400" : "text-slate-600"}`}
                                    />
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ── List header ── */}
                <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-semibold">
                            {categoryWithSubCategories?.name
                                ? `${categoryWithSubCategories.name} Subcategories`
                                : "All Subcategories"}
                        </span>
                        <span className="text-[11px] text-slate-500">
                            {loading ? "..." : `${subCategories.length} total`}
                        </span>

                        {/* ✅ FIX 2 — active filter chip with Lucide icon */}
                        {selectedCategoryFilter && categoryWithSubCategories && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-[10px] text-violet-400">
                                <CategoryIcon
                                    iconName={categoryWithSubCategories.icon}
                                    className="w-3 h-3 text-violet-400 shrink-0"
                                />
                                <span className="font-medium">{categoryWithSubCategories.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategoryFilter(null)}
                                    className="text-violet-500/60 hover:text-violet-300 transition-colors ml-0.5"
                                >
                                    <X size={10} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative w-48">
                        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <Input
                            placeholder="Search subcategories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-8 pl-8 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-violet-500/40 rounded-lg text-xs"
                        />
                    </div>
                </div>

                {/* ✅ FIX 3 — column headers match SubcategoryCard flex layout exactly
                    Card: flex gap-4 | flex-1 (name) | w-[100px] (date) | w-[62px] (actions) */}
                <div className="shrink-0 flex items-center gap-4 px-5 py-2 border-b border-white/[0.04] bg-white/[0.01]">
                    <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold tracking-widest text-slate-600 uppercase">
                            Name / Slug
                        </span>
                    </div>
                    <div className="w-[100px] shrink-0 text-right">
                        <span className="text-[9px] font-bold tracking-widest text-slate-600 uppercase">
                            Created
                        </span>
                    </div>
                    <div className="w-[62px] shrink-0" />
                </div>

                {/* ── Rows ── */}
                <div className="h-[500px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* ✅ FIX 4 — no category selected state */}
                    {!selectedCategoryFilter && !loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.08] flex items-center justify-center text-2xl mb-4">
                                👆
                            </div>
                            <p className="text-slate-400 text-sm font-medium">Select a category</p>
                            <p className="text-slate-600 text-xs mt-1 max-w-[180px] leading-relaxed">
                                Click a category pill above to view its subcategories
                            </p>
                        </div>
                    ) : loading ? (
                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.08] flex items-center justify-center text-2xl mb-4">
                                {search ? "🔍" : "📂"}
                            </div>
                            <p className="text-slate-400 text-sm font-medium">
                                {search ? "No results found" : "No subcategories yet"}
                            </p>
                            <p className="text-slate-600 text-xs mt-1 max-w-[200px] leading-relaxed">
                                {search
                                    ? `Nothing matches "${search}"`
                                    : "Create your first subcategory using the form"}
                            </p>
                        </div>
                    ) : (
                        filtered.map((sub) => (
                            <SubcategoryCard
                                key={sub.id}
                                subCategory={sub}
                                onEdit={() => handleEditClick(sub)}
                                onDelete={() => handleDeleteClick(sub)}
                                isDeleting={deleting && deleteTarget?.id === sub.id}
                                isSelected={selectedSubCategory?.id === sub.id}
                                parentCategoryName={categoryWithSubCategories?.name}
                                parentCategoryIcon={categoryWithSubCategories?.icon}
                            />
                        ))
                    )}
                </div>
            </div>

            <DeleteSubcategoryDialog
                subCategory={deleteTarget}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </>
    );
}