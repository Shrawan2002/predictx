"use client";

import { useState } from "react";

const tabs = ["All", "Up / Down", "Above / Below", "Price Range"];

export default function FilterTabs() {
    const [active, setActive] = useState("All");

    return (
        <div className="flex gap-3 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`px-4 py-2 rounded-xl text-sm ${active === tab
                            ? "bg-blue-600"
                            : "bg-[#121826] text-gray-400"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}