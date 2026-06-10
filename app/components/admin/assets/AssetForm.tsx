"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, PenLine, X, Upload, ImageIcon } from "lucide-react";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { assetSchema, AssetFormData } from "@/schema/assets.schema";
import { useAssetsStore } from "@/store/assetsStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AssetForm() {
    const {
        selectedAssets, creating, updating,
        createAssets, updateAssets, clearSelectedAssets,
    } = useAssetsStore();

    const isEditing = !!selectedAssets;
    const isSubmitting = creating || updating;

    // ── Image preview state ────────────────────────────────
    const [preview, setPreview] = useState<string | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<AssetFormData>({
        resolver: zodResolver(assetSchema),
        defaultValues: { symbol: "", name: "" },
    });

    // Populate form when editing
    useEffect(() => {
        if (selectedAssets) {
            form.reset({
                symbol: selectedAssets.symbol,
                name: selectedAssets.name,
            });
            // Show existing icon as preview
            setPreview(selectedAssets.iconUrl ?? null);
            setIconFile(null);
        } else {
            form.reset({ symbol: "", name: "" });
            setPreview(null);
            setIconFile(null);
        }
    }, [selectedAssets, form]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // Validate size — max 2MB
        if (file.size > 2 * 1024 * 1024) {
            form.setError("icon", { message: "Image must be under 2MB" });
            return;
        }
        setIconFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data: AssetFormData) => {
        let ok = false;
        if (isEditing && selectedAssets) {
            ok = await updateAssets(selectedAssets.id, { ...data, icon: iconFile });
        } else {
            ok = await createAssets({ ...data, icon: iconFile });
        }
        if (ok) {
            form.reset({ symbol: "", name: "" });
            setPreview(null);
            setIconFile(null);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">

                    {/* ── Scrollable fields ── */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden px-5 pt-5 pb-3 flex flex-col gap-4">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                                    isEditing
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                )}>
                                    {isEditing ? <PenLine size={14} /> : <Plus size={14} />}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm leading-none">
                                        {isEditing ? "Edit Asset" : "New Asset"}
                                    </p>
                                    <p className="text-zinc-600 text-[10px] mt-0.5">
                                        {isEditing ? "Update asset details" : "Add a tradeable asset"}
                                    </p>
                                </div>
                            </div>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => { clearSelectedAssets(); setPreview(null); setIconFile(null); }}
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
                                    style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
                                >
                                    {selectedAssets?.symbol?.slice(0, 2)}
                                </div>
                                <span className="text-amber-400 text-xs font-medium truncate">
                                    Editing: {selectedAssets?.name}
                                </span>
                            </div>
                        )}

                        {/* Symbol */}
                        <FormField control={form.control} name="symbol" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                                    Symbol
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g. BTC"
                                        className="h-10 rounded-xl bg-zinc-800/40 border-zinc-700/60 text-white placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/40 font-mono uppercase text-sm"
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* Name */}
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="e.g. Bitcoin"
                                        className="h-10 rounded-xl bg-zinc-800/40 border-zinc-700/60 text-white placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/40 text-sm"
                                    />
                                </FormControl>
                                <FormMessage className="text-rose-400 text-xs" />
                            </FormItem>
                        )} />

                        {/* Icon upload */}
                        <FormField control={form.control} name="icon" render={() => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                                    Icon <span className="normal-case text-zinc-600 ml-1">(jpg / png / webp, max 2MB)</span>
                                </FormLabel>

                                {/* Upload area */}
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={cn(
                                        "cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-4",
                                        preview
                                            ? "border-indigo-500/30 bg-indigo-500/5"
                                            : "border-zinc-700/60 bg-zinc-800/20 hover:border-indigo-500/40 hover:bg-zinc-800/40"
                                    )}
                                >
                                    {preview ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-700/60 shrink-0 relative">
                                                <Image
                                                    src={preview}
                                                    alt="icon preview"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-xs font-medium">
                                                    {iconFile ? iconFile.name : "Current icon"}
                                                </p>
                                                <p className="text-indigo-400 text-[10px] mt-0.5">
                                                    Click to change
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreview(null);
                                                    setIconFile(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                                }}
                                                className="w-6 h-6 rounded-lg flex items-center justify-center text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all shrink-0"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 py-2">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-700/50 flex items-center justify-center">
                                                <ImageIcon size={18} className="text-zinc-500" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-zinc-400 text-xs font-medium">Click to upload icon</p>
                                                <p className="text-zinc-600 text-[10px] mt-0.5">Optional — leave empty to skip</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

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
                                    : "linear-gradient(135deg,#6366f1,#4f46e5)",
                            }}
                            className="w-full h-10 rounded-xl font-semibold text-sm text-white transition-all duration-200 shadow-lg hover:opacity-90"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin" />
                                    {isEditing ? "Updating..." : "Creating..."}
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isEditing ? <PenLine size={14} /> : <Plus size={14} />}
                                    {isEditing ? "Update Asset" : "Create Asset"}
                                </span>
                            )}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}