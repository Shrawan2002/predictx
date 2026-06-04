"use client";

import { useEffect } from "react";
import { Layers, RefreshCw } from "lucide-react";
import { useSubCategoryStore } from "@/store/subCategoryStore";
import { useCategoryStore } from "@/store/categoryStore";
import SubcategoryForm from "./SubcategoryForm";
import SubcategoryList from "./SubcategoryList";

export default function SubcategoriesClient() {
    const { fetchSubCategories, loading, categoryWithSubCategories } = useSubCategoryStore();
    const { fetchCategories, categories } = useCategoryStore();

    // Fetch both on mount
    useEffect(() => {
        fetchSubCategories();
        if (categories.length === 0) fetchCategories();
    }, [fetchSubCategories, fetchCategories, categories.length]);

    return (
        <div className="flex flex-col min-h-0 overflow-hidden" style={{ height: "calc(100vh - 72px)" }}>

            {/* ── Page Header ── */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0c0f1a]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Layers size={16} className="text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-sm tracking-tight leading-none">
                            Subcategory Management
                        </h1>
                        <p className="text-slate-500 text-[11px] mt-0.5">Admin Console</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <span>Total</span>
                        <span className="min-w-[26px] h-6 px-1.5 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center justify-center">
                            {categoryWithSubCategories?.subCategories?.length}
                        </span>
                    </div>
                    <button
                        onClick={() => fetchSubCategories()}
                        disabled={loading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] border border-white/[0.06] transition-all text-xs disabled:opacity-50"
                    >
                        <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* ── Split panels ── */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <div
                    id="subcategory-form"
                    className="w-[340px] shrink-0 border-r border-white/[0.06] bg-[#0a0d14]"
                >
                    <SubcategoryForm />
                </div>
                <div className="flex-1 min-w-0 flex flex-col min-h-0 overflow-hidden bg-[#080b12]">
                    <SubcategoryList />
                </div>
            </div>
        </div>
    );
}