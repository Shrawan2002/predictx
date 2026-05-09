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

    return (
        <main className="min-h-screen bg-[#15191d] text-white px-4 md:px-8 py-6">

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
                            rounded-xl
                            hover:bg-[#1b222d]
                            transition
                            text-gray-300 hover:text-white
                            shrink-0
                        "
                                >
                                    <Search size={20} />
                                </motion.button>
                            ) : (
                                <motion.div
                                    ref={searchRef}
                                    key="search-input"
                                    initial={{
                                        width: 40,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        width: 220,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        width: 40,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        className="
                                h-10
                                flex items-center gap-2
                                rounded-xl
                                border border-[#2a3441]
                                bg-[#1e2428]
                                px-3
                            "
                                    >
                                        <Search
                                            size={16}
                                            className="text-gray-500 shrink-0"
                                        />

                                        <Input
                                            autoFocus
                                            type="text"
                                            placeholder="Search markets..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            className="
                                    border-0
                                    bg-transparent
                                    p-0
                                    h-auto
                                    text-sm
                                    text-white
                                    placeholder:text-gray-500
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
                                    text-gray-500
                                    hover:text-white
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
                    hover:bg-[#1b222d]
                    transition
                    text-gray-300 hover:text-white
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
                    md:grid-cols-2
                    xl:grid-cols-3
                    2xl:grid-cols-4
                    gap-6
                "
            >
                {filteredMarkets.length > 0 ? (
                    filteredMarkets.map((market) => (
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
        </main>
    );
}