"use client";

import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
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
        if (ok) onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-[#0c0f18] border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/50 max-w-sm p-0 overflow-hidden">
                <div className="h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                <div className="p-6">
                    <AlertDialogHeader>
                        <div className="flex items-start gap-4 mb-1">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 ring-1 ring-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                                <AlertTriangle size={18} />
                            </div>
                            <div>
                                <AlertDialogTitle className="text-white text-base font-semibold tracking-tight">
                                    Delete Category
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-400 text-sm leading-relaxed mt-1">
                                    Are you sure you want to delete{" "}
                                    <span className="text-white font-medium">
                                        {category?.icon} {category?.name}
                                    </span>
                                    ? This action cannot be undone.
                                </AlertDialogDescription>
                            </div>
                        </div>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex gap-2 mt-6">
                        <AlertDialogCancel
                            disabled={deleting}
                            className="flex-1 bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08] hover:text-white rounded-xl h-10 hover:border-white/[0.12] transition-all"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            onClick={handleConfirm}
                            disabled={deleting}
                            className="flex-1 bg-rose-500/90 hover:bg-rose-500 text-white rounded-xl h-10 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 transition-all"
                        >
                            {deleting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={13} className="animate-spin" />
                                    Deleting...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Trash2 size={13} />
                                    Delete
                                </span>
                            )}
                        </Button>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}