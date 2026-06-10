"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useUserEventStore } from "@/store/user/userEventStore";
import { getIconOption } from "@/constants/icon-options";

export default function HeaderTabs() {
    const router = useRouter();
    const pathname = usePathname();

    // ✅ Read categories from userEventStore (fetched by AppInit)
    const categories = useUserEventStore((s) => s.categories);
    const setSelectedCategoryId = useUserEventStore((s) => s.setSelectedCategoryId);

    return (
        <div className="flex justify-center items-center gap-3 md:gap-6 px-4 md:px-6 py-1 border-b border-border overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
                const isActive = pathname === `/${category.slug}`;
                const iconOpt = category.icon ? getIconOption(category.icon) : undefined;
                const Icon = iconOpt?.icon ?? null;

                return (
                    <button
                        key={category.id}
                        onClick={() => {
                            // ✅ Set category filter in store
                            setSelectedCategoryId(category.id);
                            // ✅ Navigate to category page
                            router.push(`/${category.slug}`);
                        }}
                        className={`
                            relative flex items-center gap-2 shrink-0
                            px-2 py-2 text-sm font-semibold transition-colors
                            ${isActive
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white"
                            }
                        `}
                    >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{category.name}</span>

                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-blue-500"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}