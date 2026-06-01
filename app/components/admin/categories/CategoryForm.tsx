"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, PenLine, Sparkles, X } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { categorySchema, CategoryFormData } from "@/schema/category.schema";
import { useCategoryStore } from "@/store/categoryStore";
import { cn } from "@/lib/utils";

function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function CategoryForm() {
    const { selectedCategory, creating, updating, createCategory, updateCategory, clearSelectedCategory } =
        useCategoryStore();

    const isEditing = !!selectedCategory;
    const isSubmitting = creating || updating;

    const form = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "", slug: "", icon: "" },
    });

    const nameValue = form.watch("name");

    // Auto-slug when creating
    useEffect(() => {
        if (!isEditing && nameValue !== undefined) {
            form.setValue("slug", toSlug(nameValue), { shouldValidate: !!nameValue });
        }
    }, [nameValue, isEditing, form]);

    // Populate form when editing
    useEffect(() => {
        if (selectedCategory) {
            form.reset({
                name: selectedCategory.name,
                slug: selectedCategory.slug,
                icon: selectedCategory.icon,
            });
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
        <Card className="border-white/[0.06] bg-[#0c0f18] overflow-hidden shadow-xl shadow-black/30">
            {/* Accent line */}
            <div className={cn(
                "h-[2px]",
                isEditing
                    ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    : "bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            )} />
            <CardHeader className="px-6 pt-5 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center",
                            isEditing
                                ? "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                                : "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20"
                        )}>
                            {isEditing ? <PenLine size={16} /> : <Plus size={16} />}
                        </div>
                        <div>
                            <h2 className="text-white font-semibold text-sm tracking-tight">
                                {isEditing ? "Edit Category" : "Create Category"}
                            </h2>
                            <p className="text-slate-500 text-xs mt-0.5">
                                {isEditing ? "Update the selected category" : "Add a new category"}
                            </p>
                        </div>
                    </div>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={clearSelectedCategory}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* Icon */}
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[11px] font-medium tracking-widest text-slate-500 uppercase">
                                        Icon
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="e.g. 🏆"
                                                className="h-11 rounded-xl bg-white/[0.03] border-white/[0.07] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500/40 text-lg pr-9"
                                            />
                                            <Sparkles size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700" />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-rose-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[11px] font-medium tracking-widest text-slate-500 uppercase">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Sports & Gaming"
                                            className="h-11 rounded-xl bg-white/[0.03] border-white/[0.07] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500/40"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-rose-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Slug */}
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-[11px] font-medium tracking-widest text-slate-500 uppercase">
                                            Slug
                                        </FormLabel>
                                        {!isEditing && (
                                            <span className="text-[10px] text-cyan-500/60 tracking-wide">
                                                Auto-generated
                                            </span>
                                        )}
                                    </div>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm select-none">
                                                /
                                            </span>
                                            <Input
                                                {...field}
                                                placeholder="sports-gaming"
                                                className="h-11 rounded-xl bg-white/[0.03] border-white/[0.07] text-white placeholder:text-slate-700 focus-visible:ring-1 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500/40 pl-5 font-mono text-sm"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-rose-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full h-11 rounded-xl font-semibold text-sm tracking-tight transition-all duration-200 mt-2",
                                isEditing
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
                                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                            )}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin" />
                                    {isEditing ? "Updating..." : "Creating..."}
                                </span>
                            ) : (
                                isEditing ? "Update Category" : "Create Category"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}