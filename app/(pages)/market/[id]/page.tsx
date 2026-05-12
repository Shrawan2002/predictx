"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Area, AreaChart,
} from "recharts";
import {
    TrendingUp, TrendingDown, Users, DollarSign, Calendar,
    Clock, ExternalLink, Share2, Bookmark, ChevronRight,
    MessageCircle, ThumbsUp, AlertCircle, BarChart2,
    Droplets, Shield, Zap, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

// ─── FAKE DATA ────────────────────────────────────────────────────────────────

const generateChartData = (points: number, startVal: number) => {
    let val = startVal;
    return Array.from({ length: points }, (_, i) => {
        val = Math.min(95, Math.max(5, val + (Math.random() - 0.48) * 4));
        const date = new Date();
        date.setHours(date.getHours() - (points - i));
        return {
            time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: date.toLocaleDateString([], { month: "short", day: "numeric" }),
            yes: +val.toFixed(1),
            no: +(100 - val).toFixed(1),
        };
    });
};

const chartDataSets: Record<string, ReturnType<typeof generateChartData>> = {
    "1H": generateChartData(60, 62),
    "1D": generateChartData(24, 58),
    "1W": generateChartData(28, 50),
    "1M": generateChartData(30, 45),
    "ALL": generateChartData(40, 35),
};

const buyOrders = [
    { price: 0.62, shares: 4200, total: 2604 },
    { price: 0.61, shares: 8100, total: 4941 },
    { price: 0.60, shares: 12300, total: 7380 },
    { price: 0.59, shares: 6700, total: 3953 },
    { price: 0.58, shares: 9200, total: 5336 },
    { price: 0.57, shares: 3400, total: 1938 },
];

const sellOrders = [
    { price: 0.63, shares: 3800, total: 2394 },
    { price: 0.64, shares: 7200, total: 4608 },
    { price: 0.65, shares: 5600, total: 3640 },
    { price: 0.66, shares: 11000, total: 7260 },
    { price: 0.67, shares: 4100, total: 2747 },
    { price: 0.68, shares: 6800, total: 4624 },
];

const comments = [
    {
        id: 1, avatar: "🦊", username: "crypto_sage",
        text: "BTC momentum looks strong after the ETF inflows. 62% feels underpriced honestly.",
        time: "2h ago", likes: 47, badge: "Top Trader",
    },
    {
        id: 2, avatar: "🐻", username: "bear_market_bob",
        text: "Macro headwinds are real. Fed isn't cutting anytime soon. I'm voting NO.",
        time: "4h ago", likes: 23, badge: null,
    },
    {
        id: 3, avatar: "🤖", username: "algo_pete",
        text: "Historical cycles suggest Q4 2025 breakout is likely. My model gives 68% YES.",
        time: "6h ago", likes: 91, badge: "Analyst",
    },
    {
        id: 4, avatar: "🌙", username: "hodl_forever",
        text: "I've been in since 2017. This is absolutely happening. Adding more YES shares.",
        time: "9h ago", likes: 34, badge: null,
    },
];

const relatedMarkets = [
    {
        id: "eth-2k", icon: "⟠", title: "Will Ethereum reach $5,000 before Dec 2026?",
        yes: 71, category: "Crypto", volume: "3.2M", live: true,
    },
    {
        id: "sol-200", icon: "◎", title: "Will Solana cross $400 in 2026?",
        yes: 44, category: "Crypto", volume: "1.8M", live: true,
    },
    {
        id: "sp500", icon: "📈", title: "Will S&P 500 hit 6500 by end of 2026?",
        yes: 58, category: "Finance", volume: "5.1M", live: false,
    },
];

// ─── SUB COMPONENTS ───────────────────────────────────────────────────────────

const LiveDot = () => (
    <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
    </span>
);

const StatCard = ({
    icon: Icon, label, value, sub, color = "blue",
}: {
    icon: any; label: string; value: string; sub?: string; color?: string;
}) => {
    const colors: Record<string, string> = {
        blue: "text-blue-400 bg-blue-400/10",
        green: "text-emerald-400 bg-emerald-400/10",
        purple: "text-purple-400 bg-purple-400/10",
        orange: "text-orange-400 bg-orange-400/10",
        pink: "text-pink-400 bg-pink-400/10",
    };
    return (
        <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3"
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-sm font-bold text-foreground">{value}</p>
                {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
            </div>
        </motion.div>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-3">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-sm font-bold text-emerald-400">YES {payload[0]?.value}%</p>
            <p className="text-sm font-bold text-red-400">NO {payload[1]?.value}%</p>
        </div>
    );
};

// ─── TRADING PANEL ────────────────────────────────────────────────────────────

const TradingPanel = () => {
    const [side, setSide] = useState<"buy" | "sell">("buy");
    const [outcome, setOutcome] = useState<"yes" | "no">("yes");
    const [orderType, setOrderType] = useState<"market" | "limit">("market");
    const [amount, setAmount] = useState("100");

    const shares = amount ? (+amount / (outcome === "yes" ? 0.62 : 0.38)).toFixed(1) : "0";
    const payout = amount ? (+shares * 1).toFixed(2) : "0";
    const fee = amount ? (+amount * 0.02).toFixed(2) : "0";

    return (
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Buy / Sell tabs */}
            <div className="flex">
                {(["buy", "sell"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setSide(t)}
                        className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wider transition-all ${side === t
                            ? t === "buy"
                                ? "bg-emerald-500/20 text-emerald-400 border-b-2 border-emerald-400"
                                : "bg-red-500/20 text-red-400 border-b-2 border-red-400"
                            : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="p-4 space-y-4">
                {/* YES / NO */}
                <div className="flex gap-2">
                    {(["yes", "no"] as const).map((o) => (
                        <motion.button
                            key={o}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setOutcome(o)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${outcome === o
                                ? o === "yes"
                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                    : "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                : "border-border text-muted-foreground hover:border-muted-foreground"
                                }`}
                        >
                            {o.toUpperCase()} {o === "yes" ? "62¢" : "38¢"}
                        </motion.button>
                    ))}
                </div>

                {/* Market / Limit */}
                <div className="flex gap-1 bg-muted/40 rounded-xl p-1">
                    {(["market", "limit"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setOrderType(t)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${orderType === t
                                ? "bg-card text-foreground shadow"
                                : "text-muted-foreground"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Amount */}
                <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Amount (USDC)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-muted/40 border border-border rounded-xl py-3 pl-7 pr-3 text-sm font-bold text-foreground focus:outline-none focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="flex gap-1 mt-2">
                        {["25", "50", "100", "250"].map((v) => (
                            <button
                                key={v}
                                onClick={() => setAmount(v)}
                                className="flex-1 py-1 text-xs rounded-lg bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground transition font-medium"
                            >
                                ${v}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="space-y-2 rounded-xl bg-muted/30 p-3 text-xs">
                    {[
                        { label: "Shares", value: shares },
                        { label: "Est. Payout", value: `$${payout}` },
                        { label: "Trading Fee (2%)", value: `$${fee}` },
                        { label: "Avg Price", value: outcome === "yes" ? "62¢" : "38¢" },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-bold text-foreground">{value}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${side === "buy"
                        ? outcome === "yes"
                            ? "bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[0_4px_24px_rgba(16,185,129,0.4)]"
                            : "bg-linear-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white shadow-[0_4px_24px_rgba(239,68,68,0.4)]"
                        : "bg-linear-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white"
                        }`}
                >
                    {side === "buy" ? "Buy" : "Sell"} {outcome.toUpperCase()} Shares
                </motion.button>

                <p className="text-center text-xs text-muted-foreground">
                    Powered by <span className="text-blue-400 font-semibold">PredictX</span> · USDC settlement
                </p>
            </div>
        </div>
    );
};

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function MarketDetailPage() {
    const [chartTab, setChartTab] = useState("1D");
    const [chartData, setChartData] = useState(chartDataSets["1D"]);
    const [bookmarked, setBookmarked] = useState(false);
    const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
    const [liveYes, setLiveYes] = useState(62);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const iv = setInterval(() => {
            setLiveYes((v) => +Math.min(95, Math.max(5, v + (Math.random() - 0.5) * 0.4)).toFixed(1));
        }, 2000);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        setChartData(chartDataSets[chartTab]);
    }, [chartTab]);

    const liveNo = +(100 - liveYes).toFixed(1);

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
        }),
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── NAV ── */}
            {/* <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tight">PredictX</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Markets</span>
                        <ChevronRight size={14} />
                        <span>Crypto</span>
                        <ChevronRight size={14} />
                        <span className="text-foreground font-medium truncate max-w-[160px]">BTC $150K</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="h-8 px-3 rounded-lg text-xs font-semibold border border-border hover:bg-muted transition">Log In</button>
                        <button className="h-8 px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition">Sign Up</button>
                    </div>
                </div>
            </nav> */}

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

                    {/* ══ LEFT COLUMN ══════════════════════════════════════════════════ */}
                    <div className="space-y-5 min-w-0">

                        {/* ── MARKET HEADER ── */}
                        <motion.div
                            custom={0} variants={fadeUp} initial="hidden" animate="visible"
                            className="rounded-2xl border border-border bg-card p-5"
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl shadow-lg shrink-0">
                                    ₿
                                </div>

                                {/* Title & meta */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                                            Crypto
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                                            <LiveDot /> LIVE
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock size={11} /> Ends Dec 31, 2026
                                        </span>
                                    </div>

                                    <h1 className="text-xl font-black leading-tight text-foreground mb-3">
                                        Will Bitcoin hit $150K before Dec 2026?
                                    </h1>

                                    <div className="flex flex-wrap gap-4 text-sm">
                                        {[
                                            { icon: DollarSign, label: "Volume", value: "$7.2M" },
                                            { icon: Users, label: "Traders", value: "14,382" },
                                            { icon: Calendar, label: "Created", value: "Jan 2, 2025" },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div key={label} className="flex items-center gap-1.5 text-muted-foreground">
                                                <Icon size={13} />
                                                <span className="text-xs">{label}:</span>
                                                <span className="text-xs font-bold text-foreground">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setBookmarked(!bookmarked)}
                                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${bookmarked ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        <Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} />
                                    </motion.button>
                                    <button className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition">
                                        <Share2 size={15} />
                                    </button>
                                    <button className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition">
                                        <ExternalLink size={15} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>


                        {/* ── PRICE CARDS ── */}
                        <motion.div
                            custom={1} variants={fadeUp} initial="hidden" animate="visible"
                            className="grid grid-cols-2 gap-3"
                        >
                            {/* YES */}
                            <motion.div
                                whileHover={{ y: -3, scale: 1.01 }}
                                className="relative rounded-2xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/10 to-emerald-500/5 p-5 overflow-hidden cursor-pointer group shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
                                <div className="absolute top-3 right-3">
                                    <ArrowUpRight size={16} className="text-emerald-400" />
                                </div>
                                <p className="text-xs font-bold text-emerald-400/70 uppercase tracking-widest mb-1">Yes</p>
                                <motion.p
                                    key={liveYes}
                                    initial={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    className="text-4xl font-black text-emerald-400 leading-none"
                                >
                                    {liveYes}¢
                                </motion.p>
                                <p className="text-sm text-emerald-400/60 mt-1 font-medium">{liveYes}% chance</p>
                                <div className="mt-3 h-1.5 rounded-full bg-emerald-500/20">
                                    <motion.div
                                        animate={{ width: `${liveYes}%` }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full rounded-full bg-emerald-400"
                                    />
                                </div>
                            </motion.div>

                            {/* NO */}
                            <motion.div
                                whileHover={{ y: -3, scale: 1.01 }}
                                className="relative rounded-2xl border border-red-500/30 bg-linear-to-br from-red-500/10 to-red-500/5 p-5 overflow-hidden cursor-pointer group shadow-[0_0_30px_rgba(239,68,68,0.08)]"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
                                <div className="absolute top-3 right-3">
                                    <ArrowDownRight size={16} className="text-red-400" />
                                </div>
                                <p className="text-xs font-bold text-red-400/70 uppercase tracking-widest mb-1">No</p>
                                <motion.p
                                    key={liveNo}
                                    initial={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    className="text-4xl font-black text-red-400 leading-none"
                                >
                                    {liveNo}¢
                                </motion.p>
                                <p className="text-sm text-red-400/60 mt-1 font-medium">{liveNo}% chance</p>
                                <div className="mt-3 h-1.5 rounded-full bg-red-500/20">
                                    <motion.div
                                        animate={{ width: `${liveNo}%` }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full rounded-full bg-red-400"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* ── CHART ── */}
                        <motion.div
                            custom={2} variants={fadeUp} initial="hidden" animate="visible"
                            className="rounded-2xl border border-border bg-card p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <BarChart2 size={16} className="text-blue-400" />
                                    <span className="text-sm font-bold">Probability History</span>
                                </div>
                                <div className="flex gap-1 bg-muted/40 rounded-xl p-1">
                                    {["1H", "1D", "1W", "1M", "ALL"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setChartTab(t)}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${chartTab === t
                                                ? "bg-blue-600 text-white shadow"
                                                : "text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* mounted guard prevents recharts measuring a zero-size SSR container */}
                            {mounted && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={chartTab}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25 }}
                                        style={{ width: "100%", height: 208 }}
                                    >
                                        <ResponsiveContainer width="100%" height={208}>
                                            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                                                <defs>
                                                    <linearGradient id="gradYes" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="gradNo" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                                <XAxis
                                                    dataKey={chartTab === "1H" || chartTab === "1D" ? "time" : "date"}
                                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                                    axisLine={false} tickLine={false}
                                                    interval={Math.floor(chartData.length / 5)}
                                                />
                                                <YAxis
                                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                                    axisLine={false} tickLine={false}
                                                    domain={[0, 100]}
                                                    tickFormatter={(v) => `${v}%`}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area type="monotone" dataKey="yes" stroke="#10b981" strokeWidth={2} fill="url(#gradYes)" dot={false} />
                                                <Area type="monotone" dataKey="no" stroke="#ef4444" strokeWidth={2} fill="url(#gradNo)" dot={false} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </motion.div>
                                </AnimatePresence>
                            )}

                            {/* Skeleton while not yet mounted */}
                            {!mounted && (
                                <div className="h-52 rounded-xl bg-muted/30 animate-pulse" />
                            )}

                            <div className="flex gap-4 mt-2">
                                {[
                                    { color: "bg-emerald-400", label: "YES" },
                                    { color: "bg-red-400", label: "NO" },
                                ].map(({ color, label }) => (
                                    <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                                        {label} probability
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── ORDER BOOK ── */}
                        <motion.div
                            custom={3} variants={fadeUp} initial="hidden" animate="visible"
                            className="rounded-2xl border border-border bg-card p-5"
                        >
                            <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                                <TrendingUp size={15} className="text-blue-400" />
                                Order Book
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {/* BUY */}
                                <div>
                                    <div className="flex justify-between text-xs text-emerald-400 font-bold mb-2 px-1">
                                        <span>BUY ORDERS</span>
                                    </div>
                                    <div className="text-xs grid grid-cols-3 gap-1 text-muted-foreground font-medium mb-1 px-1">
                                        <span>Price</span><span className="text-right">Shares</span><span className="text-right">Total</span>
                                    </div>
                                    {buyOrders.map((o, i) => {
                                        const maxShares = Math.max(...buyOrders.map((x) => x.shares));
                                        const depth = (o.shares / maxShares) * 100;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="relative grid grid-cols-3 gap-1 text-xs px-1 py-1 rounded hover:bg-emerald-500/5 transition cursor-pointer"
                                            >
                                                <div
                                                    className="absolute inset-0 rounded bg-emerald-500/8"
                                                    style={{ width: `${depth}%` }}
                                                />
                                                <span className="relative text-emerald-400 font-bold">{o.price.toFixed(2)}</span>
                                                <span className="relative text-right text-foreground">{o.shares.toLocaleString()}</span>
                                                <span className="relative text-right text-muted-foreground">${o.total.toLocaleString()}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* SELL */}
                                <div>
                                    <div className="flex justify-between text-xs text-red-400 font-bold mb-2 px-1">
                                        <span>SELL ORDERS</span>
                                    </div>
                                    <div className="text-xs grid grid-cols-3 gap-1 text-muted-foreground font-medium mb-1 px-1">
                                        <span>Price</span><span className="text-right">Shares</span><span className="text-right">Total</span>
                                    </div>
                                    {sellOrders.map((o, i) => {
                                        const maxShares = Math.max(...sellOrders.map((x) => x.shares));
                                        const depth = (o.shares / maxShares) * 100;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="relative grid grid-cols-3 gap-1 text-xs px-1 py-1 rounded hover:bg-red-500/5 transition cursor-pointer"
                                            >
                                                <div
                                                    className="absolute inset-0 rounded bg-red-500/8"
                                                    style={{ width: `${depth}%` }}
                                                />
                                                <span className="relative text-red-400 font-bold">{o.price.toFixed(2)}</span>
                                                <span className="relative text-right text-foreground">{o.shares.toLocaleString()}</span>
                                                <span className="relative text-right text-muted-foreground">${o.total.toLocaleString()}</span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>

                        {/* ── MARKET STATS ── */}
                        <motion.div
                            custom={4} variants={fadeUp} initial="hidden" animate="visible"
                        >
                            <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                                <BarChart2 size={15} className="text-blue-400" />
                                Market Stats
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <StatCard icon={DollarSign} label="Total Volume" value="$7.2M" sub="+12% today" color="green" />
                                <StatCard icon={Droplets} label="Liquidity" value="$1.4M" color="blue" />
                                <StatCard icon={Users} label="Traders" value="14,382" sub="Active now: 341" color="purple" />
                                <StatCard icon={Shield} label="Resolution" value="Chainlink" sub="Oracle verified" color="orange" />
                                <StatCard icon={Calendar} label="Created" value="Jan 2, 2025" color="pink" />
                                <StatCard icon={Clock} label="Closes" value="Dec 31, 2026" sub="577 days left" color="blue" />
                            </div>
                        </motion.div>

                        {/* ── COMMENTS ── */}
                        <motion.div
                            custom={5} variants={fadeUp} initial="hidden" animate="visible"
                            className="rounded-2xl border border-border bg-card p-5"
                        >
                            <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                                <MessageCircle size={15} className="text-blue-400" />
                                Discussion <span className="text-muted-foreground font-normal">({comments.length})</span>
                            </h2>

                            {/* input */}
                            <div className="flex gap-3 mb-5">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm shrink-0">
                                    🧑
                                </div>
                                <div className="flex-1 flex gap-2">
                                    <input
                                        placeholder="Share your analysis..."
                                        className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition text-foreground placeholder:text-muted-foreground"
                                    />
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition">
                                        Post
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {comments.map((c, i) => (
                                    <motion.div
                                        key={c.id}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex gap-3 group"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-lg shrink-0">
                                            {c.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="text-sm font-bold text-foreground">{c.username}</span>
                                                {c.badge && (
                                                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-semibold">
                                                        {c.badge}
                                                    </span>
                                                )}
                                                <span className="text-xs text-muted-foreground">{c.time}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                                            <button
                                                onClick={() =>
                                                    setLikedComments((prev) => {
                                                        const next = new Set(prev);
                                                        next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                                                        return next;
                                                    })
                                                }
                                                className={`flex items-center gap-1 mt-2 text-xs transition ${likedComments.has(c.id) ? "text-blue-400" : "text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                <ThumbsUp size={12} fill={likedComments.has(c.id) ? "currentColor" : "none"} />
                                                {c.likes + (likedComments.has(c.id) ? 1 : 0)}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── RELATED MARKETS ── */}
                        <motion.div
                            custom={6} variants={fadeUp} initial="hidden" animate="visible"
                        >
                            <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                                <TrendingUp size={15} className="text-blue-400" />
                                Related Markets
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {relatedMarkets.map((m, i) => (
                                    <motion.div
                                        key={m.id}
                                        whileHover={{ y: -3 }}
                                        className="rounded-2xl border border-border bg-card p-4 cursor-pointer hover:border-blue-500/50 transition group"
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-base shrink-0">
                                                {m.icon}
                                            </div>
                                            <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                                                {m.title}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-black text-emerald-400">{m.yes}%</span>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">${m.volume}</p>
                                                {m.live && (
                                                    <span className="flex items-center gap-1 text-xs text-red-400 justify-end">
                                                        <LiveDot /> LIVE
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                    {/* ══ END LEFT ══════════════════════════════════════════════════════ */}

                    {/* ══ RIGHT COLUMN — STICKY TRADING PANEL ══════════════════════════ */}
                    <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
                        <motion.div
                            custom={1} variants={fadeUp} initial="hidden" animate="visible"
                        >
                            <TradingPanel />
                        </motion.div>

                        {/* Risk warning */}
                        <motion.div
                            custom={2} variants={fadeUp} initial="hidden" animate="visible"
                            className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex gap-3"
                        >
                            <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-400/80 leading-relaxed">
                                Prediction markets involve risk. Only trade with funds you can afford to lose. This is not financial advice.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}