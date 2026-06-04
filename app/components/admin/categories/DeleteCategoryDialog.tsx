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
            <AlertDialogContent
                // ✅ Force dark background directly — overrides shadcn light theme
                style={{ background: "#0d1117" }}
                className="
                    border border-white/[0.08]
                    rounded-2xl
                    shadow-2xl shadow-black/80
                    max-w-md w-full
                    p-0 gap-0
                    overflow-hidden
                    [&>button]:text-slate-500
                    [&>button]:hover:text-slate-300
                "
            >
                {/* ── Top rose accent line ── */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-rose-500/80 to-transparent" />

                <div className="p-6 flex flex-col gap-5">

                    {/* ── Header ── */}
                    <AlertDialogHeader className="p-0 space-y-0">
                        <div className="flex items-center gap-3 mb-4">
                            {/* Rose icon box */}
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                <AlertTriangle size={18} className="text-rose-400" />
                            </div>
                            <AlertDialogTitle
                                // ✅ Force white text
                                style={{ color: "#f1f5f9" }}
                                className="text-base font-semibold tracking-tight"
                            >
                                Delete Category
                            </AlertDialogTitle>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/[0.06] mb-4" />

                        <AlertDialogDescription
                            // ✅ Force slate text
                            style={{ color: "#94a3b8" }}
                            className="text-sm leading-relaxed"
                        >
                            Are you sure you want to delete{" "}
                            <span style={{ color: "#f1f5f9" }} className="font-semibold">
                                {category?.name}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {/* ── Buttons ── */}
                    <AlertDialogFooter className="!flex-row gap-2.5 p-0">

                        {/* Cancel — dark ghost */}
                        <AlertDialogCancel
                            disabled={deleting}
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "#cbd5e1",
                                transition: "all 150ms ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                                e.currentTarget.style.color = "#f1f5f9";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.color = "#cbd5e1";
                            }}
                            className="flex-1 h-10 rounded-xl text-sm font-medium disabled:opacity-50"
                        >
                            Cancel
                        </AlertDialogCancel>

                        {/* Delete — rose solid */}
                        <Button
                            onClick={handleConfirm}
                            disabled={deleting}
                            style={{
                                background: "#e11d48",
                                transition: "all 150ms ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f43f5e";
                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(244,63,94,0.35)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#e11d48";
                                e.currentTarget.style.boxShadow = "0 4px 14px rgba(225,29,72,0.25)";
                            }}
                            className="flex-1 h-10 rounded-xl text-white text-sm font-medium shadow-lg shadow-rose-500/25 disabled:opacity-50"
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