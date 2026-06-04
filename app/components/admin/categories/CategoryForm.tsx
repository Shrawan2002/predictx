"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, PenLine, X } from "lucide-react";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categorySchema, CategoryFormData } from "@/schema/category.schema";
import { useCategoryStore } from "@/store/categoryStore";
import { IconSelect } from "@/components/shared/icon-select";
import { getIconOption } from "@/constants/icon-options";
import { cn } from "@/lib/utils";

function toSlug(value: string): string {
    return value.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function CategoryForm() {
    const {
        selectedCategory, creating, updating,
        createCategory, updateCategory, clearSelectedCategory,
    } = useCategoryStore();

    const isEditing = !!selectedCategory;
    const isSubmitting = creating || updating;

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "", slug: "", icon: "" },
    });

    const nameValue = form.watch("name");
    const iconValue = form.watch("icon");

    const selectedIconOption = useMemo(
        () => (iconValue ? getIconOption(iconValue) : undefined),
        [iconValue]
    );
    const PreviewIcon = selectedIconOption?.icon ?? null;

    useEffect(() => {
        if (!isEditing && nameValue !== undefined) {
            form.setValue("slug", toSlug(nameValue), { shouldValidate: !!nameValue });
        }
    }, [nameValue, isEditing, form]);

    useEffect(() => {
        if (selectedCategory) {
            form.reset({ name: selectedCategory.name, slug: selectedCategory.slug, icon: selectedCategory.icon });
        } else {
            form.reset({ name: "", slug: "", icon: "" });
        }
    }, [selectedCategory, form]);

    const onSubmit = async (data: CategoryFormData) => {
        let ok = false;
        if (isEditing && selectedCategory) {
            ok = await updateCategory(selectedCategory.id, data);
        } else {
            ok = await createCategory(data);
        }
        if (ok) form.reset({ name: "", slug: "", icon: "" });
    };

    return (
        // ✅ Form is full height of the panel, flex column, NO overflow-y-auto
        <div className=" flex flex-col ">

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    // ✅ form itself is flex column filling available height
                    className="flex flex-col h-full "
                >
                    {/* ── Scrollable fields area ── */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-5 pt-5 pb-3 flex flex-col gap-4">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                    isEditing
                                        ? "bg-amber-500/15! text-amber-400 border border-amber-500/20!"
                                        : "bg-teal-500/15 text-teal-400! border border-teal-500/20!"
                                )}>
                                    {isEditing ? <PenLine size={14} /> : <Plus size={14} />}
                                </div>
                                <span className="text-white font-semibold text-sm">
                                    {isEditing ? "Edit Category" : "New Category"}
                                </span>
                            </div>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={clearSelectedCategory}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Edit badge */}
                        {isEditing && (
                            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[10px] tracking-wide shrink-0"
                                    style={{ background: "linear-gradient(135deg,#06b6d4,#3b82f6)" }}
                                >
                                    {selectedCategory?.name?.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="text-amber-400 text-xs font-medium truncate">
                                    Editing: {selectedCategory?.name}
                                </span>
                            </div>
                        )}

                        {/* Name */}
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="e.g. Sports & Gaming"
                                        className="h-10 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:border-teal-500/40 text-sm"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* Slug */}
                        <FormField control={form.control} name="slug" render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                                        Slug
                                    </FormLabel>
                                    {!isEditing && (
                                        <span className="text-[10px] text-teal-500/70 font-medium">Auto-generated</span>
                                    )}
                                </div>
                                <FormControl>
                                    <Input {...field} placeholder="sports-gaming"
                                        className="h-10 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:border-teal-500/40 font-mono text-sm"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* Icon */}
                        <FormField control={form.control} name="icon" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                                    Icon
                                </FormLabel>
                                <FormControl>
                                    <IconSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Search and select an icon..."
                                    />
                                </FormControl>

                                {/* Live Preview */}
                                {/* <div className={cn(
                                    "mt-1.5 rounded-xl border transition-all duration-200",
                                    selectedIconOption
                                        ? "border-white/[0.07] bg-white/[0.02]"
                                        : "border-dashed border-white/[0.06]"
                                )}>
                                    {selectedIconOption && PreviewIcon ? (
                                        <div className="flex items-center gap-3 px-3 py-2.5">
                                            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                                                <PreviewIcon className="w-5 h-5" style={{ color: "#2dd4bf" }} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium leading-none">{selectedIconOption.label}</p>
                                                <p className="text-slate-600 text-[11px] font-mono mt-1">{selectedIconOption.value}</p>
                                            </div>
                                            <span className="text-[10px] text-teal-500/60 px-2 py-1 rounded-md bg-teal-500/10 border border-teal-500/15 font-mono shrink-0">
                                                preview
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2.5 px-3 py-2.5">
                                            <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-dashed border-white/[0.08] flex items-center justify-center shrink-0">
                                                <span className="text-slate-700 text-base select-none">?</span>
                                            </div>
                                            <div>
                                                <p className="text-slate-600 text-xs font-medium">No icon selected</p>
                                                <p className="text-slate-700 text-[11px] mt-0.5">Search and pick one above</p>
                                            </div>
                                        </div>
                                    )}
                                </div> */}

                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                    </div>

                    {/* ── Fixed submit button at bottom ── */}
                    <div className="shrink-0 px-5 py-4 border-t border-white/5">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full h-10 rounded-xl font-semibold text-sm transition-all duration-200",
                                isEditing
                                    ? "bg-amber-500! hover:bg-amber-400! text-black shadow-lg shadow-amber-500/20"
                                    : "bg-teal-500! hover:bg-teal-400! text-black shadow-lg shadow-teal-500/20"
                            )}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin" />
                                    {isEditing ? "Updating..." : "Creating..."}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isEditing ? <PenLine size={14} /> : <Plus size={14} />}
                                    {isEditing ? "Update Category" : "Create Category"}
                                </span>
                            )}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}