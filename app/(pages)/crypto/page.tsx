"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

import FilterTabs from "@/components/FilterTabs";
import MarketCard from "@/components/MarketCard";

import { useTab } from "@/context/tabContext";
import { getMarketsByCategory } from "@/lib/data";
import { MockMarket } from "@/types";

import { Input } from "@/components/ui/input";


export default function CryptoPage() {
    const { activeTab } = useTab();

    const [search, setSearch] = useState("");
    const [openSearch, setOpenSearch] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const [visibleMarkets, setVisibleMarkets] = useState(6);

    const allCryptoMarkets = getMarketsByCategory("Crypto");

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // if click is outside search area
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setOpenSearch(false);
            }
        }

        // listen click on whole document
        document.addEventListener("mousedown", handleClickOutside);

        // cleanup
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    // 🔍 FILTER LOGIC
    const filteredMarkets: MockMarket[] = useMemo(() => {
        let markets =
            activeTab === "all"
                ? allCryptoMarkets
                : allCryptoMarkets.filter(
                    (market) => market.type === activeTab
                );

        if (search.trim()) {
            markets = allCryptoMarkets.filter((m) => (
                m.title.toLowerCase().includes(search.toLowerCase())
            ))
        }

        return markets;
    }, [activeTab, search, allCryptoMarkets]);

    let markets = filteredMarkets.slice(0, visibleMarkets);

    return (
        <main className="min-h-screen bg-background text-foreground px-4 md:px-8 py-6 transition-colors duration-300">

            {/* 🔵 TOP HEADER SECTION */}
            {/* 🔵 HEADER */}
            <div className="mb-6">

                {/* ROW 1 */}
                <div className="flex items-center justify-between gap-3">

                    {/* LEFT */}
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight shrink-0">
                        Crypto
                    </h1>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 ml-auto">

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
                                    ref={searchRef}
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
                                                px-3
                                                "
                                    >
                                        <Search
                                            size={16}
                                            className="text-gray-400 dark:text-gray-500 shrink-0"
                                        />

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
                                            onClick={() => {
                                                setOpenSearch(false);
                                                setSearch("");
                                            }}
                                            className="
                                                text-gray-400 dark:text-gray-500
                                                hover:text-gray-800 dark:hover:text-white
                                                transition
                                                shrink-0
                                            "
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ⚙️ FILTER */}
                        <button
                            className="
                                h-10 w-10
                                flex items-center justify-center
                                rounded-xl
                                hover:bg-accent
                                transition
                                text-gray-800/90 hover:text-gray-900/90
                                 dark:text-white/70 dark:hover:text-white/90
                                shrink-0
                            "
                        >
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* ROW 2 - TABS */}
                <div className="mt-4">
                    <FilterTabs />
                </div>
            </div>

            {/* 🟢 MARKET GRID */}
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    xl:grid-cols-3
                    2xl:grid-cols-4
                    gap-6
                "
            >
                {markets.length > 0 ? (
                    markets.map((market) => (
                        <MarketCard
                            key={market.id}
                            market={market}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 flex justify-center">
                        <p className="text-gray-500 text-lg">
                            No markets found
                        </p>
                    </div>
                )}
            </div>
            {/* BUTTON */}
            {visibleMarkets < filteredMarkets.length && (
                <div className="flex justify-center items-center mt-10">
                    <button
                        onClick={() => setVisibleMarkets((prev) => prev + 6)}
                        className="
                        px-6 h-12 rounded-full
                            border border-border
                            bg-background
                            hover:bg-muted
                            text-foreground
                            font-semibold
                            transition-all
                            hover:scale-[1.02]
                    ">
                        Show more markets
                    </button>
                </div>
            )}
        </main>
    );
}