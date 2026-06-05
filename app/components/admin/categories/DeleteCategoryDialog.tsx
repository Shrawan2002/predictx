"use client";

import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/categoryStore";
import type { Category } from "@/types/category.types";

interface DeleteCategoryDialogProps {
    category: Category | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteCategoryDialog({
    category,
    open,
    onOpenChange,
}: DeleteCategoryDialogProps) {
    const { deleteCategory, deleting } = useCategoryStore();

    const handleConfirm = async () => {
        if (!category) return;

        const ok = await deleteCategory(category.id);

        if (ok) {
            onOpenChange(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent
                className="
                bg-[#0B1120]
                border
                border-white/[0.08]
                rounded-3xl
                max-w-md
                p-0
                overflow-hidden
                backdrop-blur-xl
                shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                animate-in
                fade-in-0
                zoom-in-95
                duration-200
                [&>button]:text-slate-500
                [&>button]:hover:text-white
                "
            >
                {/* Header */}
                <div className="p-7 pb-5">
                    <div className="flex items-start gap-4">
                        <div
                            className="
                            h-12
                            w-12
                            rounded-2xl
                            bg-rose-500/10
                            border
                            border-rose-500/20
                            flex
                            items-center
                            justify-center
                            shrink-0
                            "
                        >
                            <AlertTriangle
                                size={20}
                                className="text-rose-400"
                            />
                        </div>

                        <div>
                            <AlertDialogTitle className="text-xl font-semibold text-white">
                                Delete Category
                            </AlertDialogTitle>

                            <p className="text-sm text-slate-400 mt-1">
                                This action is permanent and cannot be reversed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Category Info */}
                <div className="px-7">
                    <div
                        className="
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-white/[0.03]
                        p-4
                        "
                    >
                        <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-2">
                            Category
                        </p>

                        <p className="text-white font-semibold text-base">
                            {category?.name}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="px-7 pt-5">
                    <p className="text-sm leading-7 text-slate-400">
                        Deleting this category will permanently remove it from
                        the platform. Any associated records or market mappings
                        may become unavailable.
                    </p>
                </div>

                {/* Footer */}
                <div
                    className="
                    p-7
                    pt-6
                    flex
                    items-center
                    justify-end
                    gap-3
                    "
                >
                    <AlertDialogCancel
                        disabled={deleting}
                        className="
                        h-11
                        px-5
                        rounded-xl
                        bg-white/[0.04]
                        border-white/[0.08]
                        text-slate-300
                        hover:bg-white/[0.08]
                        hover:text-white
                        focus:ring-0
                        focus-visible:ring-0
                        focus-visible:outline-none
                        "
                    >
                        Cancel
                    </AlertDialogCancel>

                    <Button
                        onClick={handleConfirm}
                        disabled={deleting}
                        className="
                        h-11
                        px-5
                        rounded-xl
                        bg-rose-600
                        hover:bg-rose-500
                        text-white
                        shadow-lg
                        shadow-rose-500/20
                        transition-all
                        duration-200
                        "
                    >
                        {deleting ? (
                            <>
                                <Loader2
                                    size={15}
                                    className="mr-2 animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2
                                    size={15}
                                    className="mr-2"
                                />
                                Delete Category
                            </>
                        )}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}