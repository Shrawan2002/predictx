"use client";

import { Moon } from "lucide-react";
import useTheme from "@/context/themeContext";

export default function ThemeToggle() {
    const { themeMode, darkTheme, lightTheme } = useTheme();

    return (
        <div
            className="
                flex items-center justify-between
                rounded-2xl
                bg-black/[0.03]
                dark:bg-white/5
                px-4 py-3
            "
        >
            <div className="flex items-center gap-3">
                <Moon
                    className={`
                        w-5 h-5
                        ${themeMode === "dark"
                            ? "text-indigo-500"
                            : "text-slate-500"}
                    `}
                />

                <span
                    className="
                        text-[15px] font-medium
                        text-[#18181B]
                        dark:text-[#E5E7EB]
                    "
                >
                    Dark mode
                </span>
            </div>

            <button
                role="switch"
                aria-checked={themeMode === "dark"}
                onClick={() =>
                    themeMode === "dark"
                        ? lightTheme()
                        : darkTheme()
                }
                className={`
                    relative inline-flex items-center
                    w-[52px] h-[26px]
                    rounded-full
                    transition-colors duration-300

                    ${themeMode === "dark"
                        ? "bg-blue-500"
                        : "bg-[#D1D5DB]"
                    }
                `}
            >
                <span
                    className={`
                        w-[22px] h-[22px]
                        rounded-full bg-white shadow-md
                        transition-transform duration-300

                        ${themeMode === "dark"
                            ? "translate-x-[28px]"
                            : "translate-x-[2px]"
                        }
                    `}
                />
            </button>
        </div>
    );
}