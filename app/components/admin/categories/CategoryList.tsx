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
        <div className="flex items-center gap-4 px-5 h-[84px] rounded-2xl
                        border
                        border-white/5
                        bg-white/2
                        mb-3 animate-pulse">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0" />
                <div className="flex flex-col gap-2">
                    <div className="h-3 w-28 bg-zinc-800 rounded" />
                    <div className="h-2 w-20 bg-zinc-800/60 rounded" />
                </div>
            </div>
            <div className="w-[110px] shrink-0 flex justify-end">
                <div className="h-2.5 w-16 bg-zinc-800/60 rounded" />
            </div>
            <div className="w-[62px] shrink-0 flex gap-1 justify-end">
                <div className="w-7 h-7 rounded-lg bg-zinc-800/60" />
                <div className="w-7 h-7 rounded-lg bg-zinc-800/60" />
            </div>
        </div>
    );
}

export default function CategoryList() {
    const {
        categories, loading, deleting,
        selectedCategory, search, setSearch, setSelectedCategory,
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
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-3xl">

                {/* ── List header ── */}
                <div className="shrink-0
                        flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    border-b
                    border-white/6
                    bg-white/2
                    backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-base font-semibold">All Categories</span>
                        <span className="text-[11px] text-slate-400">
                            {loading ? "..." : `${categories.length} total`}
                        </span>
                    </div>
                    <div className="relative w-64">
                        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                        <Input
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-10 pl-8 bg-[#111827] border-white/60 text-white placeholder:text-slate-500 
                            focus-visible:ring-1 focus-visible:ring-cyan-500/20 rounded-xl text-xs"
                        />
                    </div>
                </div>

                {/* ── Column headers ── */}
                {/* <div className="shrink-0 flex items-center gap-4 px-5 py-2.5 border-b border-white/[0.06]/40 bg-zinc-950/60">
                    <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase">Name / Slug</span>
                    </div>
                    <div className="w-[110px] shrink-0 text-right">
                        <span className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase">Created</span>
                    </div>
                    <div className="w-[62px] shrink-0" />
                </div> */}

                {/* ── Rows ── */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-dashed border-cyan-500/20 flex items-center justify-center text-3xl mb-4">
                                {search ? "🔍" : "📂"}
                            </div>
                            <p className="text-zinc-400 text-sm font-medium">
                                {search ? "No results found" : "No categories yet"}
                            </p>
                            <p className="text-zinc-600 text-xs mt-1 max-w-[180px] leading-relaxed">
                                {search ? `Nothing matches "${search}"` : "Create your first category using the form"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
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
                        </div>
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