"use client";

import { useEffect, useState } from "react";
import { Tag, RefreshCw } from "lucide-react";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

export default function CategoriesClient() {
    const { fetchCategories, loading, categories } = useCategoryStore();
    const [mobileFormOpen, setMobileFormOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div
            className="flex flex-col h-full min-h-0 bg-[#0B1120]"
        >

            {/* ── Sticky page header ── */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-800/60 bg-zinc-900/60">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                        <Tag size={15} className="text-teal-400" />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-sm leading-none">
                            Category Management
                        </h1>
                        <p className="text-zinc-500 text-[11px] mt-0.5">
                            Organise prediction markets
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <span>Total</span>
                        <span className="min-w-[24px] h-5 px-1.5 rounded-full bg-teal-500 text-black text-[11px] font-bold flex items-center justify-center">
                            {categories.length}
                        </span>
                    </div>
                    <button
                        onClick={() => fetchCategories()}
                        disabled={loading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-700/60 transition-all text-xs disabled:opacity-50"
                    >
                        <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* ── Split panels ── */}
            <div className="flex flex-1 min-h-0 overflow-hidden">

                {/*
                 * FORM PANEL — 340px fixed
                 * NO overflow — CategoryForm manages its own internal scroll
                 * border-r separates from list
                 */}
                <div
                    id="category-form"
                    className="w-[340px] shrink-0 border-r border-zinc-800/60 bg-zinc-950"
                >
                    <CategoryForm />
                </div>

                {/* LIST PANEL — fills remaining width */}
                <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-zinc-950">
                    <CategoryList />
                </div>

            </div>
        </div>
    );
}