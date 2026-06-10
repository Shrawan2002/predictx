"use client";

import { useEffect, useState } from "react";
import { Tag, RefreshCw, Plus } from "lucide-react";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet";

export default function CategoriesClient() {
    const { fetchCategories, loading, categories } = useCategoryStore();
    const [mobileFormOpen, setMobileFormOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div
            className="flex flex-col h-full min-h-0 bg-linear-to-br from-[#020817] to-[#0B1120]">
            {/* ── Sticky page header ── */}
            <div className="shrink-0 px-6 py-5 border-b border-white/6 bg-[#020817]/95 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="
                            h-11
                            w-11
                            rounded-2xl
                           bg-cyan-500/15
                            border
                            border-cyan-500/30
                            flex
                            items-center
                            justify-center
                            ">
                            <Tag className="h-5 w-5 text-cyan-400" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-white">
                                Categories
                            </h1>

                            <p className="text-sm text-slate-400">
                                Manage prediction market categories
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="
                                     hidden
                                     sm:flex
                                     items-center
                                     gap-2
                                     px-3
                                     h-10
                                     rounded-xl
                                     bg-cyan-500/10
                                     border
                                     border-cyan-500/20
                                     ">
                            <span className="text-slate-400 text-sm">
                                Total
                            </span>

                            <span className="text-cyan-400 font-semibold">
                                {categories.length}
                            </span>
                        </div>

                        <button
                            onClick={() => fetchCategories()}
                            disabled={loading}
                            className="
                                     h-10
                                     px-4
                                     rounded-xl
                                     bg-white/[0.03]
                                     border
                                     border-white/[0.06]
                                     text-slate-300
                                    hover:text-white
                                     hover:bg-white/[0.06]
                                     transition-all
                                     flex
                                     items-center
                                     gap-2
                                     "
                        >
                            <RefreshCw
                                size={14}
                                className={loading ? "animate-spin" : ""}
                            />
                            <p className="text-xs font-medium">Refresh</p>
                        </button>

                        {/* Mobile Add Button */}
                        <button
                            onClick={() => setMobileFormOpen(true)}
                            className="
                                 xl:hidden
                                 h-10
                                 px-4
                                 rounded-xl
                                 bg-cyan-500
                                 text-black
                                 font-medium    
                                 flex
                                 items-center
                                 gap-2
                                 "
                        >
                            <Plus size={14} />
                            Add
                        </button>

                    </div>
                </div>
            </div>
            {/* ── Content Area ── */}
            <div className="flex-1 min-h-0 p-4 lg:p-6 overflow-hidden">
                <div className="h-full grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
                    {/* Form Panel */}
                    <div
                        id="category-form"
                        className="
                            hidden
                            xl:flex
                            flex-col
                            rounded-3xl
                            border
                            shrink-0
                            border-white/5
                            backdrop-blur-xl
                            overflow-hidden
                            bg-[#0B1120]
                        "
                    >
                        <CategoryForm />
                    </div>
                    {/* LIST PANEL — fills remaining width */}
                    <div
                        className="
                            min-w-0
                            flex
                            flex-col
                            rounded-3xl
                            border
                            border-white/5
                             bg-[#0B1120]
                            backdrop-blur-xl    
                            overflow-hidden
                        "
                    >
                        <CategoryList />
                    </div>
                </div>
            </div>
            <Sheet open={mobileFormOpen} onOpenChange={setMobileFormOpen}>
                <SheetContent side="bottom" className="h-[90vh] p-0 bg-[#0B1120] border-white/10">
                    <div className="border-b border-white/5 p-4">
                        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/20" />
                        <SheetTitle className="text-white text-lg font-semibold">
                            Create Category
                        </SheetTitle>
                    </div>
                    <CategoryForm />
                </SheetContent>
            </Sheet>
        </div>
    );
}

