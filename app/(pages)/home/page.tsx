"use client"

import MarketCard from "@/components/MarketCard";
import { allMarkets } from "@/lib/data";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background text-foreground p-6 mt-0 transition-colors duration-300">
            <h1 className="text-2xl font-bold mb-4">🔥 All Trending Markets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allMarkets.map((m) => (
                    <MarketCard key={m.id} market={m} />
                ))}
            </div>
        </main>
    );
}