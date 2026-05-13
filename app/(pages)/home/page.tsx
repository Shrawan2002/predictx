"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

import MarketCard from "@/components/MarketCard";
import { allMarkets } from "@/lib/data";

const INITIAL_COUNT = 12;

export default function MarketsPage() {

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    // 🔥 Visible Markets
    const visibleMarkets = allMarkets.slice(0, visibleCount);

    // 🔥 Show More
    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <div className=" ">
            <h1 className="text-2xl font-bold mb-4">🔥 All Trending Markets</h1>

            {/* 🔥 MARKET GRID */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="show"

            >
                {visibleMarkets.map((market) => (
                    <motion.div
                        key={market.id}
                        variants={itemVariants}
                        layout
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MarketCard market={market} />
                    </motion.div>
                ))}
            </motion.div>

            {/* 🔥 SHOW MORE BUTTON */}
            {visibleCount < allMarkets.length && (
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <button
                        onClick={handleShowMore}
                        className="
                            px-7 py-3 rounded-full
                            border border-border
                            bg-background/80
                            backdrop-blur-md
                            text-foreground
                            font-medium
                            hover:bg-accent
                            hover:scale-105
                            active:scale-95
                            transition-all duration-300
                            shadow-sm hover:shadow-xl
                        "
                    >
                        Show more markets
                    </button>
                </motion.div>
            )}
        </div>
    );
}

/* 🔥 STAGGER CONTAINER ANIMATION */
const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.8,
        },
    },
};

/* 🔥 CARD ANIMATION */
const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.96,
    },

    show: {
        opacity: 1,
        y: 0,
        scale: 1,

        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};