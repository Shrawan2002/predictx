"use client"

import { createContext, useContext, useEffect, useState } from "react";

type themeContextType = {
    themeMode: string,
    darkTheme: () => void,
    lightTheme: () => void
}

export const ThemeContext = createContext<themeContextType>({
    themeMode: "light",
    darkTheme: () => { },
    lightTheme: () => { }
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [themeMode, setThemeMode] = useState("light");

    const lightTheme = () => {
        setThemeMode("light");
    }

    const darkTheme = () => {
        setThemeMode("dark");
    }

    useEffect(() => {
        window.document.querySelector("html")?.classList.remove("light", "dark");
        window.document.querySelector("html")?.classList.add(themeMode);
    }, [themeMode])

    return (
        <ThemeContext.Provider value={{ themeMode, lightTheme, darkTheme }} >
            {children}
        </ThemeContext.Provider>
    )
};

export default function useTheme() {
    return useContext(ThemeContext)
}