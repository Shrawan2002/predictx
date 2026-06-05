"use client";

import { useEffect, useState } from "react";
import { Layers, RefreshCw, Plus } from "lucide-react";
import { useSubCategoryStore } from "@/store/subCategoryStore";
import { useCategoryStore } from "@/store/categoryStore";
import SubcategoryForm from "./SubcategoryForm";
import SubcategoryList from "./SubcategoryList";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export default function SubcategoriesClient() {
    const { fetchSubCategories, loading, categoryWithSubCategories } = useSubCategoryStore();
    const { fetchCategories, categories } = useCategoryStore();
    const [mobileFormOpen, setMobileFormOpen] = useState(false);

    useEffect(() => {
        fetchSubCategories();
        if (categories.length === 0) fetchCategories();
    }, []);
    return (
        <div className="flex flex-col h-full min-h-0 bg-linear-to-br from-[#020817] to-[#0B1120] overflow-hidden">
            {/* Header */}
            <div className="
                    shrink-0
                    px-6
                    py-5
                    border-b
                    border-white/5
                    bg-[#020817]/95
                    backdrop-blur-xl
                 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="
                                    h-11 w-11
                                    rounded-2xl
                                    bg-cyan-500/15
                                    border border-cyan-500/30
                                    flex items-center justify-center
                                    shadow-[0_0_20px_rgba(6,182,212,0.15)]
                                ">
                            <Layers className="h-5 w-5 text-cyan-400" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold text-white tracking-tight"> Subcategory Management </h1>
                            <p className="text-slate-400 text-sm">Admin Console</p>
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
                            <span className="px-3 py-1.5 text-sm font-semibold text-cyan-400">Total</span>
                            <span className="px-3 py-1.5 text-sm text-violet-300"> {categoryWithSubCategories?.subCategories?.length ?? 0}</span>
                        </div>
                        <button
                            onClick={() => fetchSubCategories()}
                            disabled={loading}
                            className="
                                 flex items-center gap-2
                                 px-4 py-2
                                 rounded-xl
                                 border border-white/[0.06]
                                 bg-white/[0.03]
                                 hover:bg-white/[0.06]
                                 text-slate-300
                                 hover:text-white
                                 transition-all
                                ">
                            <RefreshCw
                                size={14}
                                className={` ${loading ? "animate-spin" : ""}`}
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
                                  bg-gradient-to-r
                                  from-cyan-500
                                  to-blue-500
                                  text-white
                                  font-medium
                                  flex items-center gap-2
                                  shadow-[0_8px_20px_rgba(6,182,212,0.25)]
                                  hover:scale-[1.02]
                                  transition-all
                                  "
                        >
                            <Plus size={14} />
                            Add
                        </button>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="flex-1 min-h-0 p-4 lg:p-6 overflow-hidden">
                <div className="h-full grid grid-cols-1 xl:grid-cols-[370px_1fr] gap-6">
                    {/* Form Panel */}
                    <div
                        id="subcategory-form"
                        className="
                           hidden
                           xl:flex
                           flex-col
                           shrink-0
                           overflow-hidden
                           rounded-3xl
                           border border-white/[0.06]
                           bg-[#0B1120]
                           backdrop-blur-xl
                           shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                         "
                    >
                        <SubcategoryForm />
                    </div>

                    {/* List Panel */}
                    <div className="
                    min-w-0
                    flex
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    border border-white/[0.06]
                    bg-[#0B1120]    
                    backdrop-blur-xl
                shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            ">
                        <SubcategoryList />
                    </div>
                </div>
            </div>
            <Sheet open={mobileFormOpen} onOpenChange={setMobileFormOpen}>
                <SheetContent
                    side="right"
                    className="p-0 flex flex-col h-full overflow-hidden"
                >
                    <SheetTitle className="p-2 mt-4 mx-3 border-b border-white/[0.06] backdrop-blur-md text-lg font-semibold">
                        Add Subcategory
                    </SheetTitle>
                    <SubcategoryForm />
                </SheetContent>
            </Sheet>
        </div>
    );
}