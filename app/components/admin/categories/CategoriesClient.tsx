"use client";

import { useEffect } from "react";
import { Tag, RefreshCw } from "lucide-react";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

export default function CategoriesClient() {
    const { fetchCategories, loading } = useCategoryStore();

    // Fetch on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="flex flex-col h-full min-h-0">

            {/* ── Sticky Page Header ── */}
            <div className="shrink-0 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/10 border border-white/[0.07] flex items-center justify-center">
                        <Tag size={16} className="text-cyan-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-base tracking-tight leading-none">
                            Category Management
                        </h1>
                        <p className="text-slate-500 text-xs mt-1 leading-none">
                            Organise your prediction markets
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => fetchCategories()}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] 
                    border border-transparent hover:border-white/[0.06] transition-all duration-150 text-xs disabled:opacity-50"
                >
                    <RefreshCw
                        size={12}
                        aria-hidden="true"
                        className={loading ? "animate-spin" : ""}
                    />
                    Refresh
                </button>
            </div>

            {/* ── 35/65 Layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-5 flex-1 min-h-0">

                {/* Form — 35% / 350px fixed */}
                <div id="category-form" className="lg:self-start lg:sticky lg:top-0">
                    <CategoryForm />
                </div>

                {/* List — 65% / remaining */}
                <div className="min-h-0 flex flex-col" style={{ minHeight: "500px" }}>
                    <CategoryList />
                </div>

            </div>
        </div>
    );
}