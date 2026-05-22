"use client";

import { useState } from "react";

import AuthDialog from "./AuthDialog";

export default function AuthButtons() {
    const [loginOpen, setLoginOpen] =
        useState(false);

    const [
        signupOpen,
        setSignupOpen,
    ] = useState(false);

    return (
        <>
            <button
                className="rounded-md
                    text-sm
                    hover:bg-[#77809B]/8
                    text-blue-700
                    font-bold
                    py-2
                    px-4
                    transition"
                onClick={() =>
                    setLoginOpen(true)
                }
            >
                Login
            </button>

            <button
                className="
                    text-sm
                    text-white
                    px-4
                    h-[36px]
                    rounded-md
                    bg-[#1452F0]
                    hover:bg-[#1452F0]/90
                    transition
                "
                onClick={() =>
                    setSignupOpen(true)
                }
            >
                Sign Up
            </button>

            <AuthDialog
                type="login"
                open={loginOpen}
                onOpenChange={
                    setLoginOpen
                }
            />

            <AuthDialog
                type="signup"
                open={signupOpen}
                onOpenChange={
                    setSignupOpen
                }
            />
        </>
    );
}