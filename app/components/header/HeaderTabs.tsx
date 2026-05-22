"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { tabs } from "./data";

export default function HeaderTabs() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="
            flex justify-center items-center
            gap-3 md:gap-6
            px-4 md:px-6 py-1
            border-b border-border
        ">

            {tabs.map((tab) => {
                const isActive =
                    pathname === tab.href;

                return (
                    <button
                        key={tab.label}
                        onClick={() =>
                            router.push(tab.href)
                        }
                        className={`
                            relative flex items-center gap-2
                            px-2 py-2
                            text-sm font-semibold
                            transition-colors

                            ${isActive
                                ? "text-[#18181B] dark:text-white"
                                : "text-[#6B7280] hover:text-[#18181B] dark:text-[#94A3B8] dark:hover:text-white"
                            }
                        `}
                    >
                        <tab.icon className="w-4 h-4" />

                        <span>{tab.label}</span>

                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="
                                    absolute bottom-0
                                    left-0 right-0
                                    h-[2px]
                                    rounded-full
                                    bg-blue-500
                                "
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 35,
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}