"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input";
import { getMarketsByCategory } from "@/lib/data";
import MarketCard from "@/components/MarketCard";

export default function PoliticsPage() {

    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const [visibleMarkets, setVisibleMarkets] = useState(6);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setOpenSearch(false)
            }
        }

        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);
    }, [])

    //     const sortMarkets = (markets: Market[]) => {
    //     const now = new Date();
    //     return [...markets].sort((a, b) => {
    //       const timeA = a.endTime ? new Date(a.endTime).getTime() : 0;
    //       const timeB = b.endTime ? new Date(b.endTime).getTime() : 0;

    //       // Market ends today
    //       const isAToday = timeA > now.getTime() && new Date(timeA).toDateString() === now.toDateString();
    //       const isBToday = timeB > now.getTime() && new Date(timeB).toDateString() === now.toDateString();

    //       if (isAToday && !isBToday) return -1;
    //       if (!isAToday && isBToday) return 1;

    //       // Live markets first
    //       if (a.isLive && !b.isLive) return -1;
    //       if (!a.isLive && b.isLive) return 1;

    //       // Then highest liquidity
    //       return b.liquidity - a.liquidity;
    //     });
    //   };

    // let allPoliticsMarkets = sortMarkets(getMarketsByCategory("Politics"));

    let allPoliticsMarkets = getMarketsByCategory("Politics");

    if (search.trim()) {
        allPoliticsMarkets = allPoliticsMarkets.filter((market) => {
            return (market.title.toLowerCase().includes(search.toLowerCase()));
        })
    }

    const markets = allPoliticsMarkets.slice(0, visibleMarkets);


    return (
        <div className=" min-h-screen bg-background text-foreground  transition-colors duration-300">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight shrink-0">Politics</h1>
                <div ref={searchRef} className="flex items-center gap-2 ml-auto">
                    {/* 🔍 SEARCH */}
                    <AnimatePresence mode="wait">
                        {!openSearch ? (
                            <motion.button
                                key="search-icon"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setOpenSearch(true)}
                                className="
                                h-10 w-10
                                flex items-center justify-center
                                rounded-md
                                hover:bg-accent
                                transition
                                text-gray-800/90 hover:text-gray-900/90
                                dark:text-white/70 dark:hover:text-white/90
                                shrink-0
                                "
                            >
                                <Search size={20} />
                            </motion.button>
                        ) : (
                            <motion.div
                                key="search-input"
                                initial={{ width: 40, opacity: 0 }}
                                animate={{ width: 220, opacity: 1 }}
                                exit={{ width: 40, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div
                                    className="
                                        h-10
                                        flex items-center gap-2
                                        rounded-xl
                                        border border-border
                                        bg-white dark:bg-[#161b2e]
                                        px-3"
                                >
                                    <Search size={20} className="text-gray-400 dark:text-gray-500 shrink-0" />
                                    <Input
                                        autoFocus
                                        type="text"
                                        placeholder="Search markets..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="
                                                border-0
                                                bg-transparent
                                                p-0
                                                h-auto
                                                text-sm
                                                text-gray-800 dark:text-white
                                                placeholder:text-gray-400 dark:placeholder:text-gray-500
                                                focus-visible:ring-0
                                                focus-visible:ring-offset-0
                                            "
                                    />
                                    <button
                                        className="
                                        text-gray-400 dark:text-gray-500
                                        hover:text-gray-800 dark:hover:text-white
                                        transition
                                        shrink-0
                                        "
                                        onClick={() => setOpenSearch(false)}>
                                        <X size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        )
                        }
                    </AnimatePresence>
                </div>
            </div>
            {/* 🟢 MARKET GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {markets.length > 0 ? (
                    markets.map((market) => (
                        <MarketCard key={market.id} market={market} />
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center">
                        <p>No markets found</p>
                    </div>
                )}
            </div>

            {visibleMarkets < allPoliticsMarkets.length && (
                <div className="flex justify-center items-center mt-10">
                    <button
                        onClick={() => setVisibleMarkets((prev) => prev + 6)}
                        className=" px-6 h-12 rounded-full
                            border border-border
                            bg-background
                            hover:bg-muted
                            text-foreground
                            font-semibold
                            transition-all
                            hover:scale-[1.02]">
                        Show more markets
                    </button>
                </div>
            )}

        </div>
    )
}