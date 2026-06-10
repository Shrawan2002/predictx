"use client";

import type { SubCategory } from "@/types/user/userEvent.types";

interface FilterTabsProps {
    subCategories: SubCategory[];
    selected: number | null;
    onSelect: (id: number | null) => void;
}

export default function FilterTabs({ subCategories, selected, onSelect }: FilterTabsProps) {
    if (subCategories.length === 0) return null;

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
            {/* All — clears subcategory filter */}
            <button
                onClick={() => onSelect(null)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${!selected
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
            >
                All
            </button>
            {subCategories.map((sub) => (
                <button
                    key={sub.id}
                    onClick={() => onSelect(sub.id)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${selected === sub.id
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                >
                    {sub.name}
                </button>
            ))}
        </div>
    );
}