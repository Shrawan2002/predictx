"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import useTheme from "@/context/themeContext";

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

// 🌓 PROFESSIONAL COLOR SCHEME
const colorTheme = {
    dark: {
        // Containers
        background: "bg-black",                      // #000000 Pure black
        cardBg: "bg-[#1a1a1a]",                     // Very dark gray with depth
        border: "border-[#2a2a2a]",                 // Subtle dark gray
        borderHover: "hover:border-[#4a4a4a]",      // Medium gray on hover
        bgHover: "hover:bg-[#242424]",              // Subtle hover effect

        // Text
        textPrimary: "text-white",                   // Pure white
        textSecondary: "text-[#a0a0a0]",             // Medium gray
        textTertiary: "text-[#707070]",              // Dark gray

        // Green (YES)
        greenYes: "text-[#00ff41]",                  // Bright neon green
        greenBg: "bg-[#0d3320]",                     // Dark green background
        greenHover: "hover:bg-[#174d30]",            // Lighter green on hover

        // Red (NO)
        redNo: "text-[#ff4444]",                     // Bright red
        redBg: "bg-[#3d1020]",                       // Dark red background
        redHover: "hover:bg-[#5a1a2d]",              // Lighter red on hover

        // Other
        separator: "border-[#2a2a2a]",               // Match card border
        rowBg: "bg-[#242424]",                       // Slightly lighter than card
        rowHover: "hover:bg-[#2a2a2a]",              // Slightly darker on hover

        // Badges with new colors
        badges: {
            yesno: "bg-[#0d3320] text-[#00ff41] border-[#00ff41]",
            updown: "bg-[#0d1f3d] text-[#4da6ff] border-[#4da6ff]",
            abovebelow: "bg-[#2a0d3d] text-[#d94aff] border-[#d94aff]",
            range: "bg-[#3d2a0d] text-[#ffaa00] border-[#ffaa00]",
            hit: "bg-[#3d1a0d] text-[#ff6b35] border-[#ff6b35]",
        },
    },
    light: {
        // Containers
        background: "bg-[#f5f5f5]",
        cardBg: "bg-white",
        border: "border-[#e0e0e0]",
        borderHover: "hover:border-[#2563eb]",
        bgHover: "hover:bg-[#f9f9f9]",

        // Text
        textPrimary: "text-[#1a1a1a]",
        textSecondary: "text-[#666666]",
        textTertiary: "text-[#999999]",

        // Green (YES)
        greenYes: "text-[#00a338]",
        greenBg: "bg-[#e8f5e9]",
        greenHover: "hover:bg-[#c8e6c9]",

        // Red (NO)
        redNo: "text-[#d32f2f]",
        redBg: "bg-[#ffebee]",
        redHover: "hover:bg-[#ffcdd2]",

        // Other
        separator: "border-[#e0e0e0]",
        rowBg: "bg-[#fafafa]",
        rowHover: "hover:bg-[#f0f0f0]",

        badges: {
            yesno: "bg-[#e8f5e9] text-[#00a338] border-[#00a338]",
            updown: "bg-[#e3f2fd] text-[#1976d2] border-[#1976d2]",
            abovebelow: "bg-[#f3e5f5] text-[#7b1fa2] border-[#7b1fa2]",
            range: "bg-[#fff3e0] text-[#f57c00] border-[#f57c00]",
            hit: "bg-[#ffe0b2] text-[#e64a19] border-[#e64a19]",
        },
    },
};

export default function MarketCard({ market }: { market: MockMarket }) {

    const { themeMode } = useTheme()

    // 🌓 DETECT MODE - Change isDark to false for light mode
    const isDark = themeMode === "dark";
    const colors = isDark ? colorTheme.dark : colorTheme.light;
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
                    <div className="space-y-2 mt-1">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${colors.rowHover}`}
                            >
                                <span className={`${colors.textSecondary} text-sm font-medium`}>
                                    {outcome.label}
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className={`${colors.textPrimary} font-bold text-sm min-w-[45px] text-right`}>
                                        {outcome.percentage}%
                                    </span>

                                    <button className={`px-2 py-1 rounded text-xs font-medium ${colors.greenBg} ${colors.greenYes} ${colors.greenHover} transition border border-[#00ff41]/30`}>
                                        Yes
                                    </button>

                                    <button className={`px-2 py-1 rounded text-xs font-medium ${colors.redBg} ${colors.redNo} ${colors.redHover} transition border border-[#ff4444]/30`}>
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
                    <div className="flex gap-3 mt-5 mb-0">
                        <button className={`flex-1 py-3 rounded-lg ${colors.greenBg} ${colors.greenYes} ${colors.greenHover} font-semibold transition border border-[#00ff41]/30 text-base`}>
                            Up
                        </button>
                        <button className={`flex-1 py-3 rounded-lg ${colors.redBg} ${colors.redNo} ${colors.redHover} font-semibold transition border border-[#ff4444]/30 text-base`}>
                            Down
                        </button>
                    </div>
                );

            // ABOVE/BELOW TYPE
            case "abovebelow":
                return (
                    <div className="space-y-2 mt-4">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between rounded-lg p-3 transition ${colors.rowBg} ${colors.rowHover}`}
                            >
                                <span className={`${colors.textPrimary} font-medium text-sm`}>
                                    {outcome.label}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`${colors.textPrimary} font-bold text-sm`}>
                                        100%
                                    </span>
                                    <button className={`px-2 py-1 rounded ${colors.greenBg} ${colors.greenYes} text-xs ${colors.greenHover} transition font-medium border border-[#00ff41]/30`}>
                                        Yes
                                    </button>
                                    <button className={`px-2 py-1 rounded ${colors.redBg} ${colors.redNo} text-xs ${colors.redHover} transition font-medium border border-[#ff4444]/30`}>
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            // PRICE RANGE TYPE
            case "range":
                return (
                    <div className="space-y-2 mt-4">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between rounded-lg p-3 transition ${colors.rowBg} ${colors.rowHover}`}
                            >
                                <span className={`${colors.textPrimary} font-medium text-sm`}>
                                    {outcome.label}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`${colors.textPrimary} font-bold text-sm`}>
                                        {outcome.percentage}%
                                    </span>
                                    <button className={`px-2 py-1 rounded ${colors.greenBg} ${colors.greenYes} text-xs ${colors.greenHover} transition font-medium border border-[#00ff41]/30`}>
                                        Yes
                                    </button>
                                    <button className={`px-2 py-1 rounded ${colors.redBg} ${colors.redNo} text-xs ${colors.redHover} transition font-medium border border-[#ff4444]/30`}>
                                        No
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            // HIT PRICE TYPE
            case "hit":
                return (
                    <div className="space-y-2 mt-4">
                        {market.outcomes.map((outcome, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center justify-between rounded-lg p-3 transition ${colors.rowBg} ${colors.rowHover}`}
                            >
                                <span className={`${colors.textPrimary} font-medium text-sm`}>
                                    {outcome.label}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`${colors.textPrimary} font-bold text-sm`}>
                                        {outcome.percentage}%
                                    </span>
                                    <button className={`px-2 py-1 rounded ${colors.greenBg} ${colors.greenYes} text-xs ${colors.greenHover} transition font-medium border border-[#00ff41]/30`}>
                                        Yes
                                    </button>
                                    <button className={`px-2 py-1 rounded ${colors.redBg} ${colors.redNo} text-xs ${colors.redHover} transition font-medium border border-[#ff4444]/30`}>
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

    // Get badge colors
    const getTypeBadgeColor = () => {
        return colors.badges[market.type as keyof typeof colors.badges] || colors.badges.yesno;
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
                <Card className={`${colors.cardBg} ${colors.border} ${colors.borderHover} ${colors.bgHover} rounded-xl transition cursor-pointer h-full flex flex-col shadow-lg`}>
                    <CardContent className="p-4 flex flex-col h-full">
                        {/* HEADER - Icon + Title + Main % */}
                        <div className="flex items-start justify-between mb-3 gap-3">
                            {/* Left: Icon + Title */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-lg shadow-md">
                                    {market.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-semibold ${colors.textPrimary} leading-tight line-clamp-2`}>
                                        {market.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Right: Main Outcome Percentage */}
                            {mainOutcome && (
                                <div className="text-right flex-shrink-0">
                                    <p className={`text-2xl font-bold ${colors.greenYes} leading-tight`}>
                                        {mainOutcome.percentage}%
                                    </p>
                                    <p className={`text-xs ${colors.textSecondary}`}>
                                        {market.type === "yesno"
                                            ? `Yes's chance`
                                            : mainOutcome.label
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* TYPE BADGE */}
                        <div className="mb-2">
                            <span className={`inline-block text-xs font-bold px-2 py-1 rounded border ${getTypeBadgeColor()}`}>
                                {getTypeLabel()}
                            </span>
                        </div>

                        {/* DYNAMIC BUTTONS */}
                        <div className="flex-1">
                            {renderButtons()}
                        </div>

                        {/* FOOTER */}
                        <div className={`flex items-center justify-between mt-2 pt-3 border-t ${colors.separator}`}>
                            {/* Left: LIVE + Category */}
                            <div className="flex items-center gap-2">
                                {market.isLive && (
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                        <span className="text-xs text-red-500 font-semibold">LIVE</span>
                                    </div>
                                )}
                                <span className={`text-xs ${colors.textTertiary}`}>
                                    {market.asset || market.category}
                                </span>
                            </div>

                            {/* Right: Volume + Bookmark */}
                            <div className="flex items-center gap-2">
                                <span className={`text-xs ${colors.textTertiary}`}>
                                    ${(market.volume / 1000000).toFixed(1)}M
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className={`${isDark
                                        ? "text-[#707070] hover:text-white hover:bg-[#2a2a2a]"
                                        : "text-[#999999] hover:text-[#1a1a1a] hover:bg-[#e0e0e0]"
                                        } transition p-1 rounded`}
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