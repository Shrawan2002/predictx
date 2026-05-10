// "use client";

// import { Market } from "@/types";
// import { motion } from "framer-motion";
// import { TrendingUp } from "lucide-react";

// export default function MarketCard({ market }: { market: Market }) {
//     return (
//         <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="
//             bg-[#121826] 
//             border border-white/10 
//             rounded-2xl 
//             p-5 
//             h-full
//             flex flex-col justify-between
//             hover:border-white/20
//             transition
//             "
//         >
//             {/* Header */}
//             <div className="flex items-start justify-between mb-3">
//                 <h3 className="font-semibold text-sm leading-snug">
//                     {market.title}
//                 </h3>

// {
//     market.isLive && (
//         <span className="text-[10px] px-2 py-1 rounded bg-red-500/20 text-red-400">
//             ● LIVE
//         </span>
//     )
// }
//             </div>

//             {/* Category + volume */}
//             <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
//                 <span className="uppercase">{market.category}</span>

//                 <span className="flex items-center gap-1">
//                     <TrendingUp size={12} />
//                     ${(market.volume / 1000).toFixed(0)}K vol
//                 </span>
//             </div>

//             {/* Outcomes */}
//             <div className="space-y-3">
//                 {market.outcomes.map((o, i) => (
//                     <div key={i} className="space-y-1">

//                         {/* Label + percentage */}
//                         <div className="flex justify-between text-sm">
//                             <span>{o.label}</span>
//                             <span className="text-gray-400">
//                                 {o.percentage}%
//                             </span>
//                         </div>

//                         {/* Probability bar */}
//                         <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//                             <div
//                                 className="h-full bg-green-500"
//                                 style={{ width: `${o.percentage}%` }}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Footer */}
//             <div className="mt-4 flex justify-between text-xs text-gray-500">
//                 <span>
//                     Liquidity: ${(market.liquidity ?? 0).toLocaleString()}
//                 </span>
//             </div>
//         </motion.div>
//     );
// }

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// interface MarketCardProps {
//     id: string;
//     title: string;
//     category: string;
//     yesPrice: number;
//     noPrice: number;
//     volume: number;
//     isLive: boolean;
// }

// export default function MarketCard({ market }: { market: MarketCardProps }) {
//     return (
//         <Link href={`/market/${market.id}`}>
//             <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 transition={{ duration: 0.2 }}
//             >
//                 <Card className="bg-[#1e2428]/50 border border-white/10 hover:border-white/20 hover:bg-[#1e2428]/90 rounded-2xl transition cursor-pointer">
//                     <CardContent className="p-5">

//                         {/* Header */}
//                         <div className="flex justify-between items-center mb-2">
//                             <span className="text-sm text-gray-400">
//                                 {market.category}
//                             </span>

//                             <Badge
//                                 className={
//                                     market.isLive
//                                         ? "bg-green-500/10 text-red-500"
//                                         : "bg-gray-500/10 text-red-600"
//                                 }
//                             >
//                                 {market.isLive ? "🔴LIVE" : "🔴CLOSED"}
//                             </Badge>
//                         </div>

//                         {/* Title */}
//                         <h2 className="text-lg font-semibold mb-4 text-white">
//                             {market.title}
//                         </h2>

//                         {/* Buttons */}
//                         <div className="flex gap-2 mb-4">
//                             <Button size="lg" className="flex-1 bg-[#233a32] hover:bg-green-700 text-white border-none h-[40px]">
//                                 YES {market.yesPrice}
//                             </Button>

//                             <Button size="lg" className="flex-1 bg-[#382629] hover:bg-red-700 text-white border-none h-[40px]">
//                                 NO {market.noPrice}
//                             </Button>
//                         </div>

//                         {/* Volume */}
//                         <p className="text-sm text-gray-400">
//                             Volume: ${market.volume.toLocaleString()}
//                         </p>

//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </Link>
//     );
// }


// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { MockMarket } from "@/types/index";

// export default function MarketCard({ market }: { market: MockMarket }) {
//     return (
//         <Link href={`/market/${market.id}`}>
//             <motion.div
//                 whileHover={{ y: -4 }}
//                 transition={{ duration: 0.2 }}
//             >
//                 <Card className="bg-[#111827] backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-gray-800/70 rounded-2xl transition cursor-pointer">
//                     <CardContent className="p-4">

//                         {/* Header */}
//                         <div className="flex items-start gap-3 mb-3">

//                             {/* Icon */}
//                             <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
//                                 ₿
//                             </div>

//                             {/* Title */}
//                             <div className="flex-1">
//                                 <h3 className="text-sm font-medium text-white leading-snug">
//                                     {market.title}
//                                 </h3>
//                             </div>
//                         </div>

//                         {/* Outcomes */}
//                         <div className="space-y-3">
//                             {market.outcomes.map((o, i) => (
//                                 <div key={i} className="flex items-center justify-between">

//                                     {/* Label */}
//                                     <span className="text-sm text-gray-300">
//                                         {o.label}
//                                     </span>

//                                     {/* Right Side */}
//                                     <div className="flex items-center gap-2">

//                                         {/* Percentage */}
//                                         <span className="text-sm text-gray-400 w-[40px] text-right">
//                                             {o.percentage}%
//                                         </span>

//                                         {/* YES */}
//                                         <button className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-400 hover:bg-green-500/20">
//                                             Yes
//                                         </button>

//                                         {/* NO */}
//                                         <button className="px-2 py-1 text-xs rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
//                                             No
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Footer */}
//                         <div className="flex justify-between items-center mt-4 text-xs text-gray-400">

//                             <div className="flex items-center gap-2">
//                                 {market.isLive && (
//                                     <span className="text-red-500 flex items-center gap-1">
//                                         ● LIVE
//                                     </span>
//                                 )}
//                                 <span>{market.category}</span>
//                             </div>

//                             <span>${(market.volume / 1000000).toFixed(1)}M Vol</span>
//                         </div>

//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </Link>
//     );
// }





// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { MockMarket } from "@/types";

// export default function MarketCard({ market }: { market: MockMarket }) {
//     const getButtons = () => {

//         //yes / no
//         {
//             market.type === "yesno" && (
//                 <div className="flex gap-2">
//                     <button className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg">
//                         Yes
//                     </button>
//                     <button className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg">
//                         No
//                     </button>
//                 </div>
//             )
//         }
//         // 🔵 UP / DOWN
//         if (market.type === "updown") {
//             return (
//                 <div className="flex gap-3 mt-4">
//                     <button className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 font-medium transition">
//                         Up
//                     </button>
//                     <button className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium transition">
//                         Down
//                     </button>
//                 </div>
//             );
//         }

//         // 🟣 ABOVE / BELOW
//         if (market.type === "abovebelow") {
//             return (
//                 <div className="flex gap-3 mt-4">
//                     <button className="flex-1 py-3 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-medium">
//                         Above
//                     </button>
//                     <button className="flex-1 py-3 rounded-xl bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 font-medium">
//                         Below
//                     </button>
//                 </div>
//             );
//         }

//         // 🟡 PRICE RANGE
//         if (market.type === "range") {
//             return (
//                 <div className="space-y-2 mt-4">
//                     {market.outcomes.map((o, i) => (
//                         <button
//                             key={i}
//                             className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm flex justify-between px-3"
//                         >
//                             <span>{o.label}</span>
//                             <span className="text-gray-400">{o.percentage}%</span>
//                         </button>
//                     ))}
//                 </div>
//             );
//         }

//         // 🔴 HIT PRICE
//         if (market.type === "hit") {
//             return (
//                 <div className="flex gap-3 mt-4">
//                     <button className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 font-medium">
//                         Yes
//                     </button>
//                     <button className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium">
//                         No
//                     </button>
//                 </div>
//             );
//         }

//         return null;
//     };

//     const mainOutcome = market.outcomes[0];

//     return (
//         <Link href={`/market/${market.id}`}>
//             <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
//                 <Card className="bg-[#111827] border border-white/10 hover:border-white/20 hover:bg-gray-800/60 rounded-2xl transition cursor-pointer">
//                     <CardContent className="p-4">

//                         {/* 🔵 HEADER */}
//                         <div className="flex items-center justify-between">

//                             {/* LEFT */}
//                             <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold">
//                                     ₿
//                                 </div>

//                                 <h3 className="text-sm font-medium text-white leading-snug">
//                                     {market.title}
//                                 </h3>
//                             </div>

//                             {/* RIGHT % */}
//                             <div className="text-right">
//                                 <p className="text-lg font-semibold text-white">
//                                     {mainOutcome?.percentage}%
//                                 </p>
//                                 <span className="text-xs text-gray-400">
//                                     {mainOutcome?.label}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* 🔥 DYNAMIC BUTTONS */}
//                         {getButtons()}

//                         {/* 🔻 FOOTER */}
//                         <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
//                             <div className="flex items-center gap-2">
//                                 {market.isLive && (
//                                     <span className="text-red-500 flex items-center gap-1">
//                                         ● LIVE
//                                     </span>
//                                 )}
//                                 <span>{market.asset || market.category}</span>
//                             </div>

//                             <span>${(market.volume / 1000000).toFixed(1)}M Vol</span>
//                         </div>

//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </Link>
//     );
// }



"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

interface Outcome {
    label: string;
    percentage: number;
}

interface MockMarket {
    id: string;
    title: string;
    category: string;
    asset?: string;
    type: "yesno" | "updown" | "abovebelow" | "range" | "hit";
    outcomes: Outcome[];
    volume: number;
    isLive: boolean;
    icon: string;
}

export default function MarketCard({ market }: { market: MockMarket }) {
    // Get main outcome (highest percentage)
    const mainOutcome =
        market.outcomes.length > 0
            ? market.outcomes.reduce((max, curr) =>
                curr.percentage > max.percentage ? curr : max
            )
            : null;


    // Render buttons based on market type
    const renderButtons = () => {
        switch (market.type) {
            // YES/NO TYPE - Row format 
            case "yesno":
                return (
                    <div className="space-y-2 mt-2">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800/50 transition"
                            >
                                {/* Left: Label */}
                                <span className="text-gray-300 text-sm font-medium">
                                    {outcome.label}
                                </span>

                                {/* Right: Percentage + Buttons */}
                                <div className="flex items-center gap-2">
                                    {/* Percentage */}
                                    <span className="text-white font-bold text-sm min-w-[45px] text-right">
                                        {outcome.percentage}%
                                    </span>

                                    {/* Yes Button */}
                                    <button className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 transition">
                                        Yes
                                    </button>

                                    {/* No Button */}
                                    <button className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            // UP/DOWN TYPE - Two large buttons
            case "updown":
                return (
                    <div className="flex gap-3 mt-6 mb-0">
                        <button className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 font-medium transition">
                            Up
                        </button>
                        <button className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium transition">
                            Down
                        </button>
                    </div>
                );

            // ABOVE/BELOW TYPE - Multiple price ranges with Yes/No buttons
            case "abovebelow":
                return (
                    <div className="space-y-2 mt-4">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition"
                            >
                                <span className="text-white font-medium text-sm">{outcome.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-bold text-sm">100%</span>
                                    <button className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30 transition font-medium">
                                        Yes
                                    </button>
                                    <button className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition font-medium">
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            // PRICE RANGE TYPE - Multiple ranges with percentages and Yes/No
            case "range":
                return (
                    <div className="space-y-2 mt-4">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition"
                            >
                                <span className="text-white font-medium text-sm">{outcome.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-bold text-sm">{outcome.percentage}%</span>
                                    <button className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30 transition font-medium">
                                        Yes
                                    </button>
                                    <button className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition font-medium">
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            // HIT PRICE TYPE - Multiple price targets with percentages and Yes/No
            case "hit":
                return (
                    <div className="space-y-2 mt-4">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition"
                            >
                                <span className="text-white font-medium text-sm">{outcome.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-bold text-sm">{outcome.percentage}%</span>
                                    <button className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30 transition font-medium">
                                        Yes
                                    </button>
                                    <button className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition font-medium">
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    // Get badge color based on type
    const getTypeBadgeColor = () => {
        switch (market.type) {
            case "updown":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "abovebelow":
                return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "range":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "hit":
                return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            default:
                return "bg-green-500/10 text-green-400 border-green-500/20";
        }
    };

    const getTypeLabel = () => {
        switch (market.type) {
            case "yesno":
                return "Yes / No";
            case "updown":
                return "Up / Down";
            case "abovebelow":
                return "Above / Below";
            case "range":
                return "Price Range";
            case "hit":
                return "Hit Price";
            default:
                return "Market";
        }
    };

    return (
        <Link href={`/market/${market.id}`}>
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full"
            >
                <Card className="bg-[#0f1419] border border-white/10 hover:border-blue-500/30 hover:bg-[#1a1f2e] rounded-xl transition cursor-pointer h-full flex flex-col">
                    <CardContent className="p-4 flex flex-col h-full pb-0.5">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-3 gap-3">
                            {/* Left: Icon + Title */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
                                    {market.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
                                        {market.title}
                                    </h3>
                                </div>
                            </div>
                            {/* Right: Main Outcome Percentage */}
                            {mainOutcome && (
                                <div className="text-right flex-shrink-0">
                                    <div className="flex items-center justify-end gap-2">
                                        <div>
                                            <p className="text-xl font-bold text-green-400 leading-tight">
                                                {mainOutcome.percentage}%
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {market.type === "yesno" ? mainOutcome.label + "'s chance" : mainOutcome.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Type Badge */}
                        <div >
                            <span
                                className={`inline-block text-xs font-medium px-2 py-1 rounded border ${getTypeBadgeColor()}`}
                            >
                                {getTypeLabel()}
                            </span>
                        </div>

                        {/* Dynamic Buttons based on type */}
                        <div className="flex-1">{renderButtons()}</div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                {market.isLive && (
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                        <span className="text-xs text-red-500 font-medium">LIVE</span>
                                    </div>
                                )}
                                <span className="text-xs text-gray-400">
                                    {market.asset || market.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">
                                    ${(market.volume / 1000000).toFixed(1)}M
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className="text-gray-500 hover:text-white transition p-1 hover:bg-white/5 rounded"
                                >
                                    <Bookmark size={16} />
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}