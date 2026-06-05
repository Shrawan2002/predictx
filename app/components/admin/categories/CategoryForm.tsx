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
        if (ok) clearSelectedCategory();
    };
    return (
        /*
         * Form fills full panel height
         * flex-col: header+fields | submit
         * No external scroll — form manages internally
         */
        <div className="h-full flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">

                    {/* ── Scrollable fields ── */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-5 pt-5 pb-3 flex flex-col gap-4">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                                    isEditing
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : "bg-teal-500/10 text-teal-400 border-teal-500/20"
                                )}>
                                    {isEditing ? <PenLine size={14} /> : <Plus size={14} />}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm leading-none">
                                        {isEditing ? "Edit Category" : "New Category"}
                                    </p>
                                    <p className="text-zinc-600 text-[10px] mt-0.5">
                                        {isEditing ? "Update details" : "Add a new category"}
                                    </p>
                                </div>
                            </div>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={clearSelectedCategory}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        {/* Edit badge */}
                        {isEditing && (
                            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-amber-500/8 border border-amber-500/15">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shrink-0"
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
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g. Sports & Gaming"
                                        className="h-10 rounded-xl bg-zinc-800/40 border-zinc-700/60 text-white placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:border-teal-500/40 text-sm"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* Slug */}
                        <FormField control={form.control} name="slug" render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                                        Slug
                                    </FormLabel>
                                    {!isEditing && (
                                        <span className="text-[10px] text-teal-500/70 font-medium">Auto-generated</span>
                                    )}
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="sports-gaming"
                                        className="h-10 rounded-xl bg-zinc-800/40 border-zinc-700/60 text-white placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:border-teal-500/40 font-mono text-sm"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* Icon */}
                        <FormField control={form.control} name="icon" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                                    Icon
                                </FormLabel>
                                <FormControl>
                                    <IconSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Search and select an icon..."
                                    />
                                </FormControl>

                                {/* Live preview */}
                                {selectedIconOption && PreviewIcon && (
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-zinc-700/40 bg-zinc-800/30 mt-1.5">
                                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                                            <PreviewIcon className="w-4 h-4" style={{ color: "#2dd4bf" }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-xs font-medium leading-none">{selectedIconOption.label}</p>
                                            <p className="text-zinc-600 text-[10px] font-mono mt-1">{selectedIconOption.value}</p>
                                        </div>
                                        <span className="text-[9px] text-teal-500/60 px-1.5 py-0.5 rounded bg-teal-500/8 border border-teal-500/15 font-mono shrink-0">
                                            preview
                                        </span>
                                    </div>
                                )}

                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                    </div>

                    {/* ── Fixed submit ── */}
                    <div className="shrink-0 px-5 py-4 border-t border-zinc-800/60">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                background: isEditing
                                    ? "linear-gradient(135deg,#f59e0b,#d97706)"
                                    : "linear-gradient(135deg,#14b8a6,#0891b2)",
                            }}
                            className="w-full h-10 rounded-xl font-semibold text-sm text-black transition-all duration-200 shadow-lg hover:opacity-90"
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