"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import type { AssetsType } from "@/types/assets.type";
import { cn } from "@/lib/utils";

interface AssetCardProps {
    asset: AssetsType;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
    isSelected: boolean;
}

// ✅ Color map per coin symbol
const accentMap: Record<string, { avatar: string; accent: string }> = {
    BTC: { avatar: "bg-amber-500/10 text-amber-300 border-amber-500/20", accent: "#f59e0b" },
    ETH: { avatar: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20", accent: "#6366f1" },
    SOL: { avatar: "bg-purple-500/10 text-purple-300 border-purple-500/20", accent: "#a855f7" },
    BNB: { avatar: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20", accent: "#eab308" },
    ADA: { avatar: "bg-blue-500/10 text-blue-300 border-blue-500/20", accent: "#3b82f6" },
    XRP: { avatar: "bg-teal-500/10 text-teal-300 border-teal-500/20", accent: "#14b8a6" },
    DOGE: { avatar: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20", accent: "#eab308" },
    AVAX: { avatar: "bg-red-500/10 text-red-300 border-red-500/20", accent: "#ef4444" },
    MATIC: { avatar: "bg-violet-500/10 text-violet-300 border-violet-500/20", accent: "#8b5cf6" },
    LINK: { avatar: "bg-blue-500/10 text-blue-300 border-blue-500/20", accent: "#2563eb" },
};

// Fallback for unknown symbols
const DEFAULT_COLORS = { avatar: "bg-zinc-800/60 text-zinc-400 border-zinc-700/60", accent: "#6366f1" };

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

export default function AssetCard({ asset, onEdit, onDelete, isDeleting, isSelected }: AssetCardProps) {

    // ✅ Get colors for this symbol — fallback to default
    const colors = accentMap[asset.symbol] ?? DEFAULT_COLORS;

    return (
        <div className={cn(
            "group relative flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden",
            isSelected
                ? "border-indigo-500/40 bg-indigo-500/[0.05]"
                : "border-zinc-800/60 bg-zinc-900/40 hover:border-zinc-700/60 hover:bg-zinc-900/60"
        )}>

            {/* ✅ Top accent line — uses symbol color */}
            <div
                className="h-[2.5px] w-full shrink-0"
                style={{
                    background: `linear-gradient(90deg, ${colors.accent}90, ${colors.accent}30, transparent)`,
                }}
            />

            <div className="p-4 flex flex-col gap-3">

                {/* ── Top: icon + symbol + name ── */}
                <div className="flex items-center gap-3">

                    {/* ✅ Avatar — uses symbol color when no image */}
                    <div className={cn(
                        "w-12 h-12 rounded-xl border overflow-hidden shrink-0 flex items-center justify-center",
                        asset.icon
                            ? "border-zinc-700/60 bg-zinc-800/60"
                            : colors.avatar  // ← colored avatar when no image
                    )}>
                        {asset.icon ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={asset.icon}  // ✅ use icon not iconUrl
                                    alt={asset.symbol}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            // ✅ Fallback initials with symbol color
                            <span className="text-sm font-bold font-mono">
                                {asset.symbol.slice(0, 2)}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Symbol — uses accent color */}
                        <div className="flex items-center gap-2">
                            <span
                                className="text-base font-bold font-mono"
                                style={{ color: isSelected ? "#a5b4fc" : colors.accent }}
                            >
                                {asset.symbol}
                            </span>
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-500 border border-zinc-700/60">
                                #{asset.id}
                            </span>
                        </div>
                        {/* Name */}
                        <p className="text-sm text-zinc-400 truncate mt-0.5">
                            {asset.name}
                        </p>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="h-px bg-zinc-800/60" />

                {/* ── Bottom: date + actions ── */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-600 tabular-nums">
                        {formatDate(asset.createdAt)}
                    </span>

                    <div className={cn(
                        "flex items-center gap-1.5 transition-opacity duration-150",
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                        <button
                            onClick={onEdit}
                            disabled={isDeleting}
                            aria-label={`Edit ${asset.name}`}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all disabled:opacity-40"
                        >
                            <Pencil size={12} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={onDelete}
                            disabled={isDeleting}
                            aria-label={`Delete ${asset.name}`}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all disabled:opacity-40"
                        >
                            {isDeleting ? (
                                <span className="w-2.5 h-2.5 border border-rose-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Trash2 size={12} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}