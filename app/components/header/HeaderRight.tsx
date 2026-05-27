"use client";

import AuthButtons from "@/components/auth/AuthButtons";
import HeaderMenu from "./HeaderMenu";
import { useAuthStore } from "@/store/authStore";

export default function HeaderRight() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    return (
        <div className="flex items-center gap-3">

            {/* AUTH */}
            {user ? (
                <button className="mr-2.5 bg-blue-600/80 text-primary-foreground px-4 py-2 rounded-lg text-xs hover:bg-blue-600/95 transition-colors duration-300 ease-in-out cursor-pointer dark:text-white" onClick={() => window.location.href = "/deposit"} >Deposit</button>
            ) : (
                <AuthButtons />
            )}

            {/* MENU */}
            <HeaderMenu />

        </div>
    );
}