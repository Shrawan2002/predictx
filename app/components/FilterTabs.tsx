// "use client";

// import { useTab } from "@/context/tabContext";

// const tabs = [{ label: "All", value: "all" },
// { label: "Up / Down", value: "updown" },
// { label: "Above / Below", value: "abovebelow" },
// { label: "Price Range", value: "range" },
// { label: "Hit Price", value: "hit" }];

// export default function FilterTabs() {
//     const { activeTab, setActiveTab } = useTab();

//     return (
//         <div className="flex gap-3 mb-6">
//             {tabs.map((tab) => (
//                 <button
//                     key={tab.value}
//                     onClick={() => setActiveTab(tab.value)}
//                     className={`px-4 py-2 rounded-xl text-sm ${activeTab === tab.value
//                         ? "bg-blue-600"
//                         : "bg-[#121826] text-gray-400"
//                         }`}
//                 >
//                     {tab.label}
//                 </button>
//             ))}
//         </div>
//     );
// }



"use client";

import { motion } from "framer-motion";
import { useTab } from "@/context/tabContext";

const tabs = [
    { label: "All", value: "all" },
    { label: "Up / Down", value: "updown" },
    { label: "Above / Below", value: "abovebelow" },
    { label: "Price Range", value: "range" },
    { label: "Hit Price", value: "hit" },
];

export default function FilterTabs() {
    const { activeTab, setActiveTab } = useTab();

    return (
        <div className="overflow-x-auto scrollbar-hide mb-6">
            <div className="flex gap-3 min-w-max">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;

                    return (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className="relative px-4 py-2 rounded-xl text-sm whitespace-nowrap overflow-hidden"
                        >
                            {/* Animated Background */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[#11314a] rounded-xl"
                                    transition={{
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 10,
                                    }}
                                />
                            )}

                            {/* Text */}
                            <span
                                className={`relative z-10 transition-colors duration-300 ${isActive
                                    ? "text-blue-500"
                                    : "text-gray-400"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}