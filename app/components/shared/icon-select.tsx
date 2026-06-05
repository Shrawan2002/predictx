"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, PackageOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_OPTIONS, getIconOption } from "@/constants/icon-options";
import type { IconSelectProps } from "@/types/icon-select.types";

export function IconSelect({
    value,
    onChange,
    placeholder = "Search and select an icon...",
    disabled = false,
    className,
}: IconSelectProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // ── Close on outside click ──────────────────────────────
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                !triggerRef.current?.contains(e.target as Node) &&
                !dropdownRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // ── Auto-focus search on open ───────────────────────────
    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [open]);

    // ── Filtered list ───────────────────────────────────────
    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return ICON_OPTIONS;
        return ICON_OPTIONS.filter(
            (opt) =>
                opt.label.toLowerCase().includes(q) ||
                opt.value.toLowerCase().includes(q)
        );
    }, [query]);

    // ── Selection handler ───────────────────────────────────
    const handleSelect = useCallback(
        (selectedValue: string) => {
            onChange(selectedValue === value ? "" : selectedValue);
            setOpen(false);
            setQuery("");
        },
        [onChange, value]
    );

    const selected = value ? getIconOption(value) : undefined;
    const SelectedIcon = selected?.icon ?? null;

    return (
        // ✅ relative wrapper — dropdown is positioned relative to this
        <div className="relative w-full">

            {/* ── Trigger button ── */}
            <button
                ref={triggerRef}
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "w-full h-11 px-4 flex items-center justify-between gap-3 rounded-xl",
                    "bg-white/[0.03] border text-left text-sm",
                    "transition-all duration-150",
                    open
                        ? "border-cyan-500/40 ring-2 ring-cyan-500/15 shadow-[0_0_0_1px_rgba(6,182,212,0.15)] bg-white/6"
                        : "border-white/8 hover:border-white/[0.14] hover:bg-white/6",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
            >
                <span className="flex items-center gap-2 min-w-0 flex-1">
                    {SelectedIcon ? (
                        <>
                            <span className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center shrink-0">
                                <SelectedIcon className="w-3.5 h-3.5" style={{ color: "#2dd4bf" }} />
                            </span>
                            <span className="text-white truncate text-sm">{selected!.label}</span>
                        </>
                    ) : (
                        <span className="text-slate-400 truncate">{placeholder}</span>
                    )}
                </span>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-slate-600 shrink-0 transition-transform duration-200",
                        open && "rotate-180"
                    )}
                />
            </button>

            {/* ── Dropdown panel ──
                ✅ absolute positioning — stays INSIDE the form panel
                ✅ z-50 so it renders above sibling elements
                ✅ top-[calc(100%+6px)] — 6px gap below trigger
                ✅ max-h-[220px] — never taller than this
                ✅ overflow-hidden on wrapper, scroll only on list  */}
            {open && (
                <div
                    ref={dropdownRef}
                    role="listbox"
                    className={cn(
                        "absolute left-0 right-0 top-[calc(100%+6px)] z-50",
                        "bg-[#0F172A] border border-white/6 rounded-2xl",
                        "shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl",
                        "flex flex-col overflow-hidden",
                        // ✅ animate in
                        "animate-in fade-in-0 zoom-in-95 duration-150"
                    )}
                >
                    {/* Search row */}
                    <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-white/[0.07]">
                        <Search className="w-3.01 h-3.01 text-slate-500 shrink-0" />
                        <input
                            ref={searchRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search icons..."
                            className="flex-1 bg-transparent text-[13px] text-white placeholder:text-slate-600 outline-none min-w-0"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="w-4 h-4 rounded flex items-center justify-center text-slate-600 hover:text-slate-400 transition-colors shrink-0"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                    {/* Results — this section scrolls */}
                    <div className="overflow-y-auto max-h-[160px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-1.5">
                                <PackageOpen className="w-7 h-7 text-slate-700" />
                                <p className="text-slate-500 text-xs">No icons found</p>
                            </div>
                        ) : (
                            <div className="p-1.5 flex flex-col gap-0.5">
                                {filtered.map((opt) => {
                                    const Icon = opt.icon;
                                    const isActive = value === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            role="option"
                                            aria-selected={isActive}
                                            onClick={() => handleSelect(opt.value)}
                                            className={cn(
                                                "group flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl",
                                                "text-left transition-all duration-100 cursor-pointer",
                                                isActive
                                                    ? "bg-cyan-500/15 text-white shadow-[0_0_20px_rgba(6,182,212,0.08)]"
                                                    : "text-slate-400 hover:bg-white/4 hover:text-white"
                                            )}
                                        >
                                            {/* Icon chip */}
                                            <span className={cn(
                                                "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all mr-2",
                                                isActive
                                                    ? "bg-teal-500/20 text-teal-400 "
                                                    : "bg-white/3 text-slate-500 group-hover:bg-white/[0.09] group-hover:text-slate-300"
                                            )}>
                                                <Icon className="w-3.01 h-3.01" />
                                            </span>

                                            {/* Label */}
                                            <span className="flex-1 text-sm font-medium truncate">
                                                {opt.label}
                                            </span>

                                            {/* Check */}
                                            <Check className={cn(
                                                "w-3.5 h-3.5 text-teal-400 shrink-0 transition-opacity",
                                                isActive ? "opacity-100 " : "opacity-0"
                                            )} />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="shrink-0 px-3 py-2 border-t border-white/6 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 tabular-nums">
                            {filtered.length} / {ICON_OPTIONS.length} icons
                        </span>
                        {value && (
                            <button
                                type="button"
                                onClick={() => { onChange(""); setOpen(false); setQuery(""); }}
                                className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}