"use client";

import { useState } from "react";
import { Search, Layers, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryCard from "./CategoryCard";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import type { Category } from "@/types/category.types";

function SkeletonCard() {
    return (
        <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.01] animate-pulse">
            <div className="w-9 h-9 rounded-lg bg-white/[0.05] shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3 w-28 bg-white/[0.06] rounded-full" />
                <div className="h-2.5 w-20 bg-white/[0.04] rounded-full" />
            </div>
            <div className="flex gap-1">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04]" />
                <div className="w-8 h-8 rounded-lg bg-white/[0.04]" />
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
        // Scroll form into view on mobile
        if (window.innerWidth < 1024) {
            document.getElementById("category-form")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleDeleteClick = (category: Category) => {
        setDeleteTarget(category);
        setDialogOpen(true);
    };

    return (
        <>
            <Card className="border-white/[0.06] bg-[#0c0f18] overflow-hidden shadow-xl shadow-black/30 flex flex-col h-full">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

                <CardHeader className="px-6 pt-5 pb-4 shrink-0">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 flex items-center justify-center">
                                <Layers size={16} />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-sm tracking-tight">
                                    Categories
                                </h2>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    {loading ? "Loading..." : `${categories.length} total`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-500">
                            <SlidersHorizontal size={11} aria-hidden="true" />
                            <span className="text-[11px]">All</span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search
                            size={13}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                            aria-hidden="true"
                        />
                        <Input
                            placeholder="Search by name or slug..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-10 bg-white/[0.03] border-white/[0.07] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-violet-500/40 focus-visible:border-violet-500/40 rounded-xl text-sm"
                        />
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-6 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {loading ? (
                        <div className="space-y-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-2xl mb-4 select-none">
                                {search ? "🔍" : "📂"}
                            </div>
                            <p className="text-slate-400 text-sm font-medium">
                                {search ? "No results found" : "No categories yet"}
                            </p>
                            <p className="text-slate-600 text-xs mt-1 max-w-[200px] leading-relaxed">
                                {search
                                    ? `No categories match "${search}"`
                                    : "Create your first category using the form on the left"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
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
                </CardContent>
            </Card>

            <DeleteCategoryDialog
                category={deleteTarget}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </>
    );
}