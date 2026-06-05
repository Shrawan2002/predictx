"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, PenLine, X } from "lucide-react";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubCategorySchema, SubCategoryFormData } from "@/schema/subcategory.schema";
import { useSubCategoryStore } from "@/store/subCategoryStore";
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

export default function SubcategoryForm() {
    const {
        selectedSubCategory, creating, updating,
        createSubCategory, updateSubCategory, clearSelectedSubCategory,
    } = useSubCategoryStore();

    const { categories, fetchCategories } = useCategoryStore();

    const isEditing = !!selectedSubCategory;
    const isSubmitting = creating || updating;

    const form = useForm<SubCategoryFormData>({
        resolver: zodResolver(SubCategorySchema),
        defaultValues: { name: "", slug: "", icon: "", categoryId: 0 },
    });

    const nameValue = form.watch("name");
    const iconValue = form.watch("icon");

    const selectedIconOption = useMemo(
        () => (iconValue ? getIconOption(iconValue) : undefined),
        [iconValue]
    );
    const PreviewIcon = selectedIconOption?.icon ?? null;

    useEffect(() => {
        if (categories.length === 0) fetchCategories();
    }, [categories.length, fetchCategories]);

    useEffect(() => {
        if (!isEditing && nameValue) {
            form.setValue("slug", toSlug(nameValue), { shouldValidate: !!nameValue });
        }
    }, [nameValue, isEditing, form]);

    useEffect(() => {
        if (selectedSubCategory) {
            form.reset({
                name: selectedSubCategory.name,
                slug: selectedSubCategory.slug,
                icon: selectedSubCategory.icon ?? "",
                categoryId: selectedSubCategory.categoryId,
            });
        } else {
            form.reset({ name: "", slug: "", icon: "", categoryId: 0 });
        }
    }, [selectedSubCategory, form]);

    const onSubmit = async (data: SubCategoryFormData) => {
        let ok = false;
        if (isEditing && selectedSubCategory) {
            ok = await updateSubCategory(selectedSubCategory.id, data);
        } else {
            ok = await createSubCategory(data);
        }
        if (ok) form.reset({ name: "", slug: "", icon: "", categoryId: 0 });
    };

    return (
        <div className="h-full flex flex-col bg-[#111827] ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">

                    {/* ── Scrollable area ── */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 pt-6 pb-3 gap-6 flex flex-col ">

                        {/* ── Header ── */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "w-11 h-11 rounded-2xl flex items-center justify-center border",
                                        isEditing
                                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                            : "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                                    )}
                                >
                                    {isEditing ? (
                                        <PenLine size={18} />
                                    ) : (
                                        <Plus size={18} />
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-white text-base font-semibold">
                                        {isEditing ? "Edit Subcategory" : "New Subcategory"}
                                    </h3>

                                    <p className="text-slate-400 text-xs mt-1">
                                        {isEditing
                                            ? "Update subcategory details"
                                            : "Create a new subcategory"}
                                    </p>
                                </div>
                            </div>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={clearSelectedSubCategory}
                                    className="
            w-8 h-8
            rounded-xl
            text-slate-500
            hover:text-rose-400
            hover:bg-rose-500/10
            transition-all
        "
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        {/* ── Edit badge ── */}
                        {isEditing && (
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                                    style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
                                >
                                    {selectedSubCategory?.name?.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="text-amber-400 text-xs font-medium truncate">
                                    Editing: {selectedSubCategory?.name}
                                </span>
                            </div>
                        )}

                        {/* ── Parent Category dropdown ── */}
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-400  uppercase">
                                        Parent Category
                                    </FormLabel>

                                    <Select
                                        value={field.value ? String(field.value) : ""}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        <FormControl>
                                            {/* ✅ Trigger — dark styled with style prop to override shadcn */}
                                            <SelectTrigger
                                                style={{

                                                    borderColor: "rgba(255,255,255,0.08)",
                                                    color: field.value ? "#f1f5f9" : "#334155",
                                                    height: "40px",
                                                    borderRadius: "12px",
                                                    fontSize: "14px",
                                                }}
                                                className="h-11
                                                rounded-2xl
                                                bg-white/[0.03]
                                                border-white/[0.08]
                                                text-white
                                                focus:ring-cyan-500/30"
                                            >
                                                <SelectValue placeholder="Select parent category..." />
                                            </SelectTrigger>
                                        </FormControl>

                                        {/* ✅ Dropdown content — forced dark background */}
                                        <SelectContent
                                            style={{
                                                background: "#0f1320",
                                                borderColor: "rgba(255,255,255,0.09)",
                                                borderRadius: "12px",
                                                overflow: "hidden",
                                            }}
                                            className="p-1 shadow-2xl shadow-black/60"
                                        >
                                            {categories.length === 0 ? (
                                                <div className="px-3 py-4 text-center text-slate-600 text-xs">
                                                    No categories found
                                                </div>
                                            ) : (
                                                categories.map((cat) => {
                                                    const Icon = getIconOption(cat.icon)?.icon;

                                                    return (
                                                        <SelectItem
                                                            key={cat.id}
                                                            value={String(cat.id)}
                                                            className="
                text-slate-300
                focus:bg-cyan-500/15
                focus:text-white
                cursor-pointer
            "
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="
                    w-8 h-8
                    rounded-lg
                    bg-cyan-500/10
                    border border-cyan-500/20
                    flex items-center justify-center
                ">
                                                                    {Icon && (
                                                                        <Icon className="h-4 w-4 text-cyan-400" />
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-medium">
                                                                        {cat.name}
                                                                    </span>

                                                                    <span className="text-xs text-slate-500">
                                                                        /{cat.slug}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                })
                                            )}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage className="text-rose-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* ── Name ── */}
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g. Cricket"
                                        className="
                                        h-11
                                        rounded-2xl
                                        bg-[#0f172a]
border-white/[0.08]
                                        text-white
                                        placeholder:text-slate-500
                                        focus-visible:ring-1
                                        focus-visible:ring-cyan-500/30
                                        focus-visible:border-cyan-500/30
                                        "
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* ── Slug ── */}
                        <FormField control={form.control} name="slug" render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                                        Slug
                                    </FormLabel>
                                    {!isEditing && (
                                        <span className="text-[10px] text-cyan-500/70 font-medium">
                                            Auto-generated
                                        </span>
                                    )}
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="cricket"
                                        className="
                                                    h-11
                                                    rounded-2xl
                                                   bg-[#0f172a]
                                                   border-white/[0.08]
                                                    text-white
                                                    placeholder:text-slate-500
                                                    focus-visible:ring-1
                                                    focus-visible:ring-cyan-500/30
                                                    focus-visible:border-cyan-500/30
                                        "
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* ── Icon ── */}
                        <FormField control={form.control} name="icon" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                                    Icon
                                </FormLabel>
                                <FormControl>
                                    <IconSelect
                                        value={field.value ?? ""}
                                        onChange={field.onChange}
                                        placeholder="Search and select an icon..."
                                    />
                                </FormControl>

                                {/* Live preview */}
                                <div className={cn(
                                    "mt-1.5 rounded-xl border transition-all duration-200",
                                    selectedIconOption
                                        ? " border-cyan-500/10 bg-[#0f172a]"
                                        : "border-dashed border-white/[0.06]"
                                )}>
                                    {selectedIconOption && PreviewIcon ? (
                                        <div className="flex items-center gap-3 px-3 py-2.5">
                                            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                                <PreviewIcon className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium leading-none">
                                                    {selectedIconOption.label}
                                                </p>
                                                <p className="text-slate-600 text-[11px] font-mono mt-1">
                                                    {selectedIconOption.value}
                                                </p>
                                            </div>
                                            <span className="text-[10px] text-cyan-500/60 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/15 font-mono shrink-0">
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
                                                <p className="text-slate-700 text-[11px] mt-0.5">
                                                    Search and pick one above
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                    </div>

                    {/* ── Fixed submit button ── */}
                    <div className="shrink-0 px-5 py-4 border-t border-white/[0.05]">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                background: isEditing
                                    ? "linear-gradient(135deg,#f59e0b,#d97706)"
                                    : "linear-gradient(135deg,#06b6d4,#3b82f6)",
                            }}
                            className="
                            w-full
                            h-11
                            rounded-2xl
                            font-semibold
                            text-sm
                            text-black
                            shadow-[0_10px_30px_rgba(59,130,246,0.25)]
                            hover:opacity-90
                            transition-all
                            "
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin" />
                                    {isEditing ? "Updating..." : "Creating..."}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isEditing ? <PenLine size={14} /> : <Plus size={14} />}
                                    {isEditing ? "Update Subcategory" : "Create Subcategory"}
                                </span>
                            )}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}