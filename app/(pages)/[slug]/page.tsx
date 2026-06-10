"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/EventCard";
import FilterTabs from "@/components/FilterTabs";
import { useUserEventStore, selectFilteredEvents } from "@/store/user/userEventStore";

const INITIAL_COUNT = 12;
export default function CategoryPage() {

    const params = useParams();
    const slug = params?.slug as string;
    const {
        userEvents,
        categories,
        subCategories,
        loading,
        search,
        selectedCategoryId,
        selectedSubCategoryId,
        selectedEventType,
        setSearch,
        setSelectedCategoryId,
        setSelectedSubCategoryId,
        getAllUserEvents,
        getAllSubCategories,
    } = useUserEventStore();

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const [openSearch, setOpenSearch] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // ✅ STEP 1 — When slug changes, find category by slug and set it
    // This handles both:
    // - Direct URL visit (/crypto)
    // - Tab click (HeaderTabs already set id, but we verify here)
    useEffect(() => {
        if (!slug || categories.length === 0) return;

        const found = categories.find((c) => c.slug === slug);
        if (!found) {
            setSelectedCategoryId(0);
            setSelectedSubCategoryId(null);
            return;
        };

        // ✅ Only update if different — avoids infinite loop
        if (selectedCategoryId !== found.id) {
            setSelectedCategoryId(found.id);
        }
    }, [slug, categories]);
    // ↑ Don't add selectedCategoryId or setSelectedCategoryId to deps
    //   because setSelectedCategoryId would trigger re-render loop

    // ✅ STEP 2 — When selectedCategoryId is set, fetch events + subcategories
    useEffect(() => {
        if (!selectedCategoryId || selectedCategoryId === 0) return;

        // Fetch events filtered by this category
        getAllUserEvents();

        // Fetch subcategories for this category (for FilterTabs)
        getAllSubCategories();

    }, [selectedCategoryId]);
    // ↑ Runs every time category changes — correct behaviour

    // ✅ STEP 3 — When subcategory filter changes, refetch events
    useEffect(() => {
        if (!selectedCategoryId || selectedCategoryId === 0) return;
        getAllUserEvents();
    }, [selectedSubCategoryId]);

    // Reset visible count when any filter changes
    useEffect(() => {
        setVisibleCount(INITIAL_COUNT);
    }, [selectedCategoryId, selectedSubCategoryId, selectedEventType, search]);

    // Close search on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setOpenSearch(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // ✅ Client-side search + eventType filter on top of API results
    const filtered = selectFilteredEvents(
        userEvents,
        search,
        selectedEventType,
        selectedCategoryId,
        selectedSubCategoryId,
    );

    const visible = filtered.slice(0, visibleCount);
    const activeCategory = categories.find((c) => c.slug === slug);

    return (
        <main className="min-h-screen bg-white text-black transition-colors duration-300">
            {/* ── Header ── */}
            <div className="mb-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight capitalize">
                            {activeCategory?.name ?? slug}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {loading ? "Loading..." : `${filtered.length} events`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Animated search */}
                        <AnimatePresence mode="wait">
                            {!openSearch ? (
                                <motion.button
                                    key="icon"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setOpenSearch(true)}
                                    className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-accent transition text-muted-foreground hover:text-foreground shrink-0"
                                >
                                    <Search size={20} />
                                </motion.button>
                            ) : (
                                <motion.div
                                    ref={searchRef}
                                    key="input"
                                    initial={{ width: 40, opacity: 0 }}
                                    animate={{ width: 220, opacity: 1 }}
                                    exit={{ width: 40, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                >
                                    <div className="h-10 flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                                        <Search size={16} className="text-muted-foreground shrink-0" />
                                        <Input
                                            autoFocus
                                            placeholder="Search events..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                        <button
                                            onClick={() => { setOpenSearch(false); setSearch(""); }}
                                            className="text-muted-foreground hover:text-foreground transition shrink-0"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-accent transition text-muted-foreground hover:text-foreground shrink-0">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* ── Subcategory filter pills ── */}
                {subCategories.length > 0 && (
                    <div className="mt-4">
                        <FilterTabs
                            subCategories={subCategories}
                            selected={selectedSubCategoryId}
                            onSelect={setSelectedSubCategoryId}
                        />
                    </div>
                )}
            </div>

            {/* ── Events grid ── */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-muted/40 animate-pulse"
                            style={{ aspectRatio: "3/4" }}
                        />
                    ))}
                </div>
            ) : visible.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="text-4xl mb-4">📭</div>
                    <p className="text-base font-medium">No events found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Try a different filter or check back later
                    </p>
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {visible.map((event) => (
                        <motion.div key={event.id} variants={itemVariants} className="h-full">
                            <EventCard event={event} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* ── Show more ── */}
            {visibleCount < filtered.length && !loading && (
                <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <button
                        onClick={() => setVisibleCount((p) => p + 6)}
                        className="px-7 py-3 rounded-full border border-border bg-background/80 backdrop-blur-md text-foreground font-medium hover:bg-accent hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        Show more events
                    </button>
                </motion.div>
            )}

        </main>
    );
}

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};