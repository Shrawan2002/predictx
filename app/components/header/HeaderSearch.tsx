"use client";

import { Search } from "lucide-react";

export default function HeaderSearch() {
    return (
        <div className="hidden md:flex flex-1 justify-center px-6">

            <div className="relative w-full max-w-[760px]">

                <Search
                    className="
                        absolute left-5 top-1/2
                        -translate-y-1/2
                        text-[#8B93A7]
                        h-5 w-5
                    "
                />

                <input
                    type="text"
                    placeholder="Search polymarkets..."
                    className="
                        w-full h-[42px]
                        pl-14 pr-5
                        rounded-xl

                        bg-[#F3F4F6]
                        dark:bg-[#1E2428]

                        text-[#111827]
                        dark:text-[#E5E7EB]

                        placeholder:text-[#8B93A7]

                        border border-transparent
                        outline-none

                        transition-all duration-200

                        focus:bg-white
                        dark:focus:bg-[#1E2428]

                        focus:ring-4
                        focus:ring-[#E5E7EB]
                        dark:focus:ring-[#2A3137]
                    "
                />
            </div>
        </div>
    );
}