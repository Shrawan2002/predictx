"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { useSubCategoryStore } from "@/store/subCategoryStore";
import { useCategoryStore } from "@/store/categoryStore";
import SubcategoryCard from "@/components/admin/subcategories/SubcategoryCard";
import DeleteSubcategoryDialog from "./DeleteSubcategoryDialog";
import { getIconOption } from "@/constants/icon-options";
import type { SubCategory } from "@/types/subcategory.types";

function SkeletonRow() {
    return (
        <div className="flex items-center gap-4 px-5 h-[64px] border-b border-cyan-500/[0.06] animate-pulse">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/[0.06] shrink-0" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-28 bg-white/[0.05] rounded" />
                    <div className="h-2 w-20 bg-white/[0.03] rounded" />
                </div>
            </div>
            <div className="w-[100px] shrink-0 flex justify-end">
                <div className="h-2.5 w-16 bg-white/[0.03] rounded" />
            </div>
            <div className="w-[62px] shrink-0 flex gap-1 justify-end">
                <div className="w-7 h-7 rounded-lg bg-white/[0.03]" />
                <div className="w-7 h-7 rounded-lg bg-white/[0.03]" />
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

    function CategoryIcon({ iconName, className }: { iconName: string; className?: string }) {
        const opt = getIconOption(iconName);
        if (!opt) return <span className="text-[10px]">{iconName}</span>;
        const Icon = opt.icon;
        return <Icon className={className ?? "w-3 h-3"} />;
    }

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-[#111827]">

                {/* ── Category filter pills ── */}
                {categories.length > 0 && (
                    <div className="shrink-0 flex items-center gap-1.5 px-5 py-3 border-b border-cyan-500/10 overflow-x-auto [&::-webkit-scrollbar]:hidden bg-[#111827]">
                        <span className="text-[10px] text-slate-600 font-medium tracking-widest uppercase shrink-0 mr-1">
                            Filter:
                        </span>

                        {/* All pill */}
                        <button
                            type="button"
                            onClick={() => setSelectedCategoryFilter(null)}
                            className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${!selectedCategoryFilter
                                ? "bg-cyan-400/10 border-cyan-400/20 text-cyan-300"
                                : "bg-[#0F172A] border-cyan-500/10 text-slate-400 hover:text-white hover:bg-cyan-500/[0.06]"
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
                                        ? "bg-cyan-400/10 border-cyan-400/20 text-cyan-400"
                                        : "bg-[#0F172A] border-cyan-500/10 text-slate-500 hover:text-slate-300 hover:bg-cyan-500/[0.06]"
                                        }`}
                                >
                                    <CategoryIcon
                                        iconName={cat.icon}
                                        className={`w-3 h-3 shrink-0 ${isActive ? "text-cyan-400" : "text-slate-500"}`}
                                    />
                                    <span>{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ── List header ── */}
                <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-cyan-500/10">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-semibold">
                            {categoryWithSubCategories?.name
                                ? `${categoryWithSubCategories.name} Subcategories`
                                : "All Subcategories"}
                        </span>
                        <span className="text-[11px] text-slate-500">
                            {loading ? "..." : `${subCategories.length} total`}
                        </span>

                        {/* Active filter chip */}
                        {selectedCategoryFilter && categoryWithSubCategories && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-400/[0.08] border border-cyan-400/20 text-[10px] text-cyan-300">
                                <CategoryIcon
                                    iconName={categoryWithSubCategories.icon}
                                    className="w-3 h-3 text-cyan-400 shrink-0"
                                />
                                <span className="font-medium">{categoryWithSubCategories.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategoryFilter(null)}
                                    className="text-cyan-500/50 hover:text-cyan-300 transition-colors ml-0.5"
                                >
                                    <X size={10} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={{ position: "relative", width: "192px", display: "flex", alignItems: "center" }}>
                        <Search
                            size={13}
                            style={{ position: "absolute", left: "10px", color: "#64748b", pointerEvents: "none", flexShrink: 0, zIndex: 10 }}
                        />
                        <input
                            type="text"
                            placeholder="Search subcategories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                height: "32px",
                                paddingLeft: "30px",
                                paddingRight: "10px",
                                background: "#0F172A",
                                border: "1px solid rgba(6,182,212,0.15)",
                                borderRadius: "8px",
                                color: "#fff",
                                fontSize: "12px",
                                outline: "none",
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(34,211,238,0.15)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(6,182,212,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                    </div>
                </div>

                {/* ── Column headers ── */}
                <div className="shrink-0 flex items-center gap-4 px-5 py-2 border-b border-cyan-500/[0.06] bg-cyan-500/[0.02]">
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

                    {/* No category selected */}
                    {!selectedCategoryFilter && !loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] border border-dashed border-cyan-500/10 flex items-center justify-center text-2xl mb-4">
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
                            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] border border-dashed border-cyan-500/10 flex items-center justify-center text-2xl mb-4">
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