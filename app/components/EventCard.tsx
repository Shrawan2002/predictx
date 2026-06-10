"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Clock, Users, TrendingUp, TrendingDown,
    Target, ArrowUpDown, BarChart2, Zap,
} from "lucide-react";
import type { UserEvent } from "@/types/user/userEvent.types";
import useTheme from "@/context/themeContext";

// ── Time helper ────────────────────────────────────────────
function timeLeft(endTime: string): { label: string; urgent: boolean } {
    const diff = new Date(endTime).getTime() - Date.now();
    if (diff <= 0) return { label: "Ended", urgent: false };
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    if (h > 24) return { label: `${Math.floor(h / 24)}d left`, urgent: false };
    if (h > 0) return { label: `${h}h ${m}m left`, urgent: h < 2 };
    return { label: `${m}m left`, urgent: true };
}

function formatVolume(val: string | number): string {
    const n = Number(val);
    if (isNaN(n) || n === 0) return "$0";
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n.toFixed(0)}`;
}

// ── Event type config ──────────────────────────────────────
const TYPE_CONFIG = {
    "up-down": {
        label: "Up / Down",
        Icon: ArrowUpDown,
        dark: { accent: "#3b82f6", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
        light: { accent: "#2563eb", badge: "bg-blue-50 text-blue-700 border-blue-200" },
    },
    "above-below": {
        label: "Above / Below",
        Icon: BarChart2,
        dark: { accent: "#8b5cf6", badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
        light: { accent: "#7c3aed", badge: "bg-violet-50 text-violet-700 border-violet-200" },
    },
    "price-range": {
        label: "Price Range",
        Icon: BarChart2,
        dark: { accent: "#f59e0b", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
        light: { accent: "#d97706", badge: "bg-amber-50 text-amber-700 border-amber-200" },
    },
    "hit-price": {
        label: "Hit Price",
        Icon: Target,
        dark: { accent: "#f97316", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
        light: { accent: "#ea580c", badge: "bg-orange-50 text-orange-700 border-orange-200" },
    },
} as const;

type EventType = keyof typeof TYPE_CONFIG;

// ── Sub-info line per type ─────────────────────────────────
function eventSubInfo(event: UserEvent): string {
    switch (event.eventType) {
        case "up-down":
            return event.direction === "up" ? "Trending UP ↑" : "Trending DOWN ↓";
        case "above-below":
            return `Target $${Number(event.targetPrice).toLocaleString()}`;
        case "price-range":
            return `$${Number(event.rangeLow).toLocaleString()} – $${Number(event.rangeHigh).toLocaleString()}`;
        case "hit-price":
            return `Hit $${Number(event.targetPrice).toLocaleString()}`;
        default: return "";
    }
}

// ── YES probability bar ────────────────────────────────────
// qYes / (qYes + qNo) — shows market sentiment
function ProbBar({ qYes, qNo, accent }: { qYes: string; qNo: string; accent: string }) {
    const yes = Number(qYes);
    const no = Number(qNo);
    const total = yes + no;
    // if no trades yet show 50/50
    const yesPct = total === 0 ? 50 : Math.round((yes / total) * 100);
    const noPct = 100 - yesPct;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-semibold">
                <span style={{ color: "#10b981" }}>YES {yesPct}%</span>
                <span style={{ color: "#f43f5e" }}>NO {noPct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-white/10">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${yesPct}%`,
                        background: `linear-gradient(90deg, #10b981, ${accent})`,
                    }}
                />
            </div>
        </div>
    );
}

// ── UP / DOWN buttons ──────────────────────────────────────
function UpDownBtns({ isDark }: { isDark: boolean }) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={(e) => e.preventDefault()}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-150
                    ${isDark
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    }`}
            >
                <TrendingUp size={13} /> UP
            </button>
            <button
                onClick={(e) => e.preventDefault()}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-150
                    ${isDark
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/25 hover:bg-rose-500/20"
                        : "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                    }`}
            >
                <TrendingDown size={13} /> DOWN
            </button>
        </div>
    );
}

// ── YES / NO buttons ───────────────────────────────────────
function YesNoBtns({ isDark }: { isDark: boolean }) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={(e) => e.preventDefault()}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all duration-150
                    ${isDark
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    }`}
            >
                YES
            </button>
            <button
                onClick={(e) => e.preventDefault()}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all duration-150
                    ${isDark
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/25 hover:bg-rose-500/20"
                        : "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                    }`}
            >
                NO
            </button>
        </div>
    );
}

// ── Main card ──────────────────────────────────────────────
export default function EventCard({ event }: { event: UserEvent }) {
    const { themeMode } = useTheme();
    const isDark = themeMode === "dark";

    const cfg = TYPE_CONFIG[event.eventType as EventType] ?? TYPE_CONFIG["up-down"];
    const colors = isDark ? cfg.dark : cfg.light;
    const { Icon } = cfg;
    const subInfo = eventSubInfo(event);
    const { label: timeLabel, urgent } = timeLeft(event.tradingEndsAt);

    return (
        <Link href={`/market/${event.slug}`} className="block h-full group">
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={`h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-200 ${isDark
                    ? "bg-[#0e1117] border-white/[0.07] group-hover:border-white/[0.15] group-hover:bg-[#111520]"
                    : "bg-white border-zinc-200/80 group-hover:border-zinc-300 group-hover:shadow-xl group-hover:shadow-black/5"
                    }`}
            >
                {/* ── Color accent bar ── */}
                <div
                    className="h-[3px] w-full shrink-0"
                    style={{
                        background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}40, transparent)`,
                    }}
                />

                <div className="flex flex-col flex-1 p-4 gap-3">

                    {/* ── Row 1: Asset icon + Symbol + Title ── */}
                    <div className="flex items-start gap-3">
                        {/* Coin icon */}
                        <div
                            className="relative w-9 h-9 rounded-xl shrink-0 overflow-hidden border"
                            style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e4e4e7" }}
                        >
                            {event.asset?.icon ? (
                                <Image
                                    src={event.asset.icon}
                                    alt={event.asset.symbol}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center text-[11px] font-bold"
                                    style={{ background: colors.accent + "20", color: colors.accent }}
                                >
                                    {event.asset?.symbol?.slice(0, 2)}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            {/* Symbol · Name */}
                            <div className="flex items-center gap-1.5 mb-1">
                                <span
                                    className="text-[11px] font-bold"
                                    style={{ color: colors.accent }}
                                >
                                    {event.asset?.symbol}
                                </span>
                                <span className={`text-[10px] ${isDark ? "text-slate-600" : "text-zinc-400"}`}>
                                    · {event.asset?.name}
                                </span>
                                {event.isFeaturedBool && (
                                    <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isDark
                                        ? "bg-yellow-500/10 text-yellow-400"
                                        : "bg-yellow-50 text-yellow-600"
                                        }`}>
                                        ★ HOT
                                    </span>
                                )}
                            </div>
                            {/* Question title */}
                            <p className={`text-[13px] font-semibold leading-snug line-clamp-2 ${isDark ? "text-zinc-100" : "text-zinc-900"
                                }`}>
                                {event.title}
                            </p>
                        </div>
                    </div>

                    {/* ── Row 2: Type badge + sub-info chip ── */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Event type badge */}
                        <span
                            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg border ${colors.badge}`}
                        >
                            <Icon size={10} />
                            {cfg.label}
                        </span>

                        {/* Sub-info — target / range / direction */}
                        {subInfo && (
                            <span
                                className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg"
                                style={{
                                    background: colors.accent + (isDark ? "15" : "10"),
                                    color: colors.accent,
                                    border: `1px solid ${colors.accent}30`,
                                }}
                            >
                                <Zap size={9} />
                                {subInfo}
                            </span>
                        )}
                    </div>

                    {/* ── Row 3: Probability bar (YES vs NO sentiment) ── */}
                    <ProbBar qYes={event.qYes} qNo={event.qNo} accent={colors.accent} />

                    {/* ── Row 4: Action buttons ── */}
                    <div className="mt-auto pt-1">
                        {event.eventType === "up-down"
                            ? <UpDownBtns isDark={isDark} />
                            : <YesNoBtns isDark={isDark} />
                        }
                    </div>

                    {/* ── Row 5: Footer stats ── */}
                    <div
                        className={`flex items-center justify-between pt-2.5 border-t text-[10px] font-medium ${isDark ? "border-white/[0.05]" : "border-zinc-100"
                            }`}
                    >
                        {/* Countdown */}
                        <div
                            className="flex items-center gap-1"
                            style={{ color: urgent ? "#f43f5e" : isDark ? "#64748b" : "#94a3b8" }}
                        >
                            <Clock size={11} />
                            {timeLabel}
                        </div>

                        <div className={`flex items-center gap-3 ${isDark ? "text-slate-500" : "text-zinc-400"}`}>
                            {/* Traders */}
                            <div className="flex items-center gap-1">
                                <Users size={10} />
                                {event.uniqueTraders}
                            </div>
                            {/* Volume */}
                            <div className="flex items-center gap-1">
                                <BarChart2 size={10} />
                                {formatVolume(event.totalVolume)}
                            </div>
                            {/* Min trade */}
                            <div
                                className="font-semibold"
                                style={{ color: colors.accent }}
                            >
                                ${event.minTradeAmount}+
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </Link>
    );
}