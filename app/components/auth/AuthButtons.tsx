"use client";

import { useState } from "react";

import SignupDialog from "./SignupDialog";
import LoginDialog from "./LoginDialog";
import { useAuthStore } from "@/store/authStore";

export default function AuthButtons() {

    const [signupOpen, setSignupOpen,] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const clearError = useAuthStore((s) => s.clearError);
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

            <SignupDialog
                open={signupOpen}
                onOpenChange={
                    setSignupOpen
                }
                onSuccess={() => {

                    // CLOSE signup dialog
                    setTimeout(() => {
                        setSignupOpen(false);
                    }, 100);

                    // OPEN login dialog
                    setTimeout(() => {
                        setLoginOpen(true);
                    }, 100);
                }}
                onLoginClick={() => {
                    setSignupOpen(false);
                    setLoginOpen(true);
                    clearError();
                }}
            />

            <LoginDialog
                open={loginOpen}
                onOpenChange={
                    setLoginOpen
                }
            />
        </>
    );
}