"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

const markets = [
    {
        id: "1",
        title: "Will Bitcoin hit $100K in 2025?",
        category: "Crypto",
        isLive: true,
        volume: 7200000,
        outcomes: [
            { label: "Yes", percentage: 62 },
            { label: "No", percentage: 38 },
        ],
    },
];

export default function MarketDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const market = useMemo(() => {
        return markets.find((m) => m.id === id);
    }, [id]);

    if (!market) {
        return <div className="p-6 text-white">Market not found</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 transition-colors duration-300">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4">
                {market.title}
            </h1>

            {/* Category + Status */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                <span>{market.category}</span>
                {market.isLive && <span className="text-red-500">● LIVE</span>}
                <span>Vol: ${(market.volume / 1000000).toFixed(1)}M</span>
            </div>

            {/* Layout */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* LEFT: Market Info */}
                <div className="bg-card p-5 rounded-xl border border-border">

                    <h2 className="text-lg mb-4">Probabilities</h2>

                    <div className="space-y-4">
                        {market.outcomes.map((o, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1 text-sm">
                                    <span>{o.label}</span>
                                    <span>{o.percentage}%</span>
                                </div>

                                <div className="h-2 bg-gray-800 rounded-full">
                                    <div
                                        className="h-full bg-green-500"
                                        style={{ width: `${o.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Trade Panel */}
                <div className="bg-card p-5 rounded-xl border border-border">

                    <h2 className="text-lg mb-4">Trade</h2>

                    {/* Amount */}
                    <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full p-2 mb-4 rounded bg-background border border-border"
                    />

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <button className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded">
                            Buy YES
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded">
                            Buy NO
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}