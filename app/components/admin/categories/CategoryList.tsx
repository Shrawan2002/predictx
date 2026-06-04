"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryCard from "./CategoryCard";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import type { Category } from "@/types/category.types";

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
            <div className="w-[110px] shrink-0 flex justify-end">
                <div className="h-2.5 w-16 bg-white/[0.04] rounded" />
            </div>
            <div className="w-[62px] shrink-0 flex gap-1 justify-end">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04]" />
                <div className="w-7 h-7 rounded-lg bg-white/[0.04]" />
            </div>
        </div>
    );
}

export default function CategoryList() {
    const {
        categories,
        loading,
        deleting,
        selectedCategory,
        search,
        setSearch,
        setSelectedCategory,
    } = useCategoryStore();

    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const filtered = categories.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.slug.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (category: Category) => {
        setSelectedCategory(category);
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDeleteClick = (category: Category) => {
        setDeleteTarget(category);
        setDialogOpen(true);
    };

    return (
        <>
            {/* ✅ CHANGE 1: removed overflow-hidden, added flex-1 so it fills parent height */}
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

                {/* ── List header bar — no change here ── */}
                <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-[#0c0f1a]">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-semibold">All Categories</span>
                        <span className="text-[11px] text-slate-500">
                            {loading ? "..." : `${categories.length} total`}
                        </span>
                    </div>
                    <div className="relative w-52">
                        <Search size={12} className="absolute left-3  top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <Input
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-8 pl-10 bg-[#111520] border-white/8 text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-teal-500/40 focus-visible:border-teal-500/30 rounded-lg text-xs"
                        />
                    </div>
                </div>
                {/* ── Column headers — no change here ── */}
                <div className="shrink-0 flex items-center gap-4 px-5 py-2.5 border-b border-white/[0.04] bg-[#0a0d14]">
                    <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold tracking-widest text-slate-600 uppercase">
                            Name / Slug
                        </span>
                    </div>
                    <div className="w-[110px] shrink-0 text-right">
                        <span className="text-[9px] font-bold tracking-widest text-slate-600 uppercase">
                            Created
                        </span>
                    </div>
                    <div className="w-[62px] shrink-0" />
                </div>
                {/* ✅ CHANGE 2: h-[500px] fixes the rows area height + hidden scrollbar */}
                <div className="overflow-y-auto"
                    style={{ height: 300 }}>
                    {loading ? (
                        <>
                            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
                        </>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/3 border border-dashed border-white/1 flex items-center justify-center text-2xl mb-4">
                                {search ? "🔍" : "📂"}
                            </div>
                            <p className="text-slate-400 text-sm font-medium">
                                {search ? "No results found" : "No categories yet"}
                            </p>
                            <p className="text-slate-600 text-xs mt-1 max-w-[180px] leading-relaxed">
                                {search
                                    ? `Nothing matches "${search}"`
                                    : "Create your first category using the form"}
                            </p>
                        </div>
                    ) : (
                        <>
                            {filtered.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onEdit={() => handleEditClick(category)}
                                    onDelete={() => handleDeleteClick(category)}
                                    isDeleting={deleting && deleteTarget?.id === category.id}
                                    isSelected={selectedCategory?.id === category.id}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

            <DeleteCategoryDialog
                category={deleteTarget}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </>
    );
}