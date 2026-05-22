"use client";

import AuthButtons from "@/components/auth/AuthButtons";
import HeaderMenu from "./HeaderMenu";

export default function HeaderRight() {
    return (
        <div className="flex items-center gap-3">

            {/* AUTH */}
            <AuthButtons />

            {/* MENU */}
            <HeaderMenu />

        </div>
    );
}