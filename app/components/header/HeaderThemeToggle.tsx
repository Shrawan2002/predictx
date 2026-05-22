"use client";

import { Moon } from "lucide-react";
import useTheme from "@/context/themeContext";

export default function HeaderThemeToggle() {
    const {
        themeMode,
        darkTheme,
        lightTheme,
    } = useTheme();

    return (
        <div className="
            flex items-center justify-between
            rounded-2xl
            px-4 py-3
            bg-white/5
        ">

            <div className="flex items-center gap-3">
                <Moon
                    className={`
                        w-5 h-5
                        ${themeMode === "dark"
                            ? "text-indigo-500"
                            : "text-slate-400"
                        }
                    `}
                />

                <span className="
                    text-[15px] font-medium
                    text-[#18181B]
                    dark:text-[#E5E5E5]
                ">
                    Dark mode
                </span>
            </div>

            <button
                onClick={() =>
                    themeMode === "dark"
                        ? lightTheme()
                        : darkTheme()
                }
                className={`
                    relative inline-flex items-center
                    w-[52px] h-[26px]
                    rounded-full
                    transition-colors

                    ${themeMode === "dark"
                        ? "bg-blue-500"
                        : "bg-[#d1d1d6]"
                    }
                `}
            >
                <span
                    className={`
                        w-[22px] h-[22px]
                        rounded-full bg-white
                        shadow-md
                        transition-transform

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