"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    FaGoogle,
    FaTelegramPlane,
    FaDiscord,
    FaEllipsisH,
    FaFirefoxBrowser,
} from "react-icons/fa";

import { SiSteam, SiWalletconnect } from "react-icons/si";
import { BsGridFill } from "react-icons/bs";

const wallets = [
    {
        icon: <FaTelegramPlane className="text-[#229ED9] text-3xl" />,
    },
    {
        icon: <SiSteam className="text-[#1b2838] text-3xl" />,
    },
    {
        icon: <FaFirefoxBrowser className="text-[#E2761B] text-3xl" />,
    },
    {
        icon: <SiWalletconnect className="text-[#2563ff] text-3xl" />,
    },
    {
        icon: (
            <div className="w-10 h-10 rounded-xl bg-[#7C8CF8] flex items-center justify-center">
                <FaDiscord className="text-white text-2xl" />
            </div>
        ),
    },
    {
        icon: (
            <div className="w-10 h-10 rounded-xl bg-[#B197FC] flex items-center justify-center">
                <span className="text-white text-xl font-bold">👻</span>
            </div>
        ),
    },
    {
        icon: <BsGridFill className="text-black text-3xl" />,
    },
    {
        icon: <FaEllipsisH className="text-gray-500 text-2xl" />,
    },
];

function AuthDialog({
    type,
    open,
    onOpenChange,
}: {
    type: "login" | "signup";
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const isLogin = type === "login";

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent
                className="
                    max-w-[560px]
                    border
                    border-border
                    rounded-[28px]
                    bg-background
                    p-4
                    overflow-hidden
                    shadow-2xl
                    mt-5
                "
            >
                <DialogTitle className="hidden">
                    {isLogin ? "Login" : "Signup"}
                </DialogTitle>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={type}
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="px-3 py-2"
                    >
                        {/* TITLE */}
                        <h1 className="text-[20px] font-bold text-center text-foreground">
                            Welcome to PredictX
                        </h1>

                        {/* GOOGLE BUTTON */}
                        <div
                            className={`
                                mt-4 transition-all duration-300
                            `}
                        >
                            <Button
                                className={
                                    `
                                    w-full
                                    h-[58px]
                                    rounded-md
                                    text-white
                                    text-[18px]
                                    font-semibold
                                    ${isLogin ? "bg-[#89a8f7]" : "bg-[#2454E6] hover:bg-[#1f4cdc]"}
                                `
                                }
                            >
                                <FaGoogle className="mr-3 text-xl" />

                                Continue with Google
                            </Button>
                        </div>

                        {/* DIVIDER */}
                        <div className="flex items-center gap-4 my-4">
                            <div className="h-px flex-1 bg-[#E5E7EB]" />

                            <span className="text-[#7b8190] font-semibold text-[15px]">
                                OR
                            </span>

                            <div className="h-px flex-1 bg-[#E5E7EB]" />
                        </div>

                        {/* EMAIL BOX */}
                        <div
                            className="
                                border
                                border-gray-300
                                focus-within:border-[#4D73FF]
                                transition-all
                                duration-200
                                rounded-[18px]
                                p-2
                                flex
                                items-center
                                bg-background
                            "
                        >
                            <Input
                                placeholder="Email address"
                                className="
                                    border-none
                                    shadow-none
                                    focus-visible:ring-0
                                    focus-visible:outline-none
                                    h-[26px]
                                    text-[18px]
                                    placeholder:text-foreground
                                "
                            />

                            <Button
                                className="
                                    h-[38px]
                                    px-4
                                    rounded-[6px]
                                    bg-[#0093FD]
                                    hover:bg-[#7995f4]
                                    text-white
                                     text-[15px]
                                    font-semibold
                                "
                            >
                                Continue
                            </Button>
                        </div>

                        {/* WALLET GRID */}
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {wallets.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -2,
                                    }}
                                    whileTap={{
                                        scale: 0.96,
                                    }}
                                    className="
                                        h-[68px]
                                        rounded-lg
                                        border
                                        border-border
                                        bg-background
                                        flex
                                        items-center
                                        justify-center
                                        cursor-pointer
                                        transition-all
                                    "
                                >
                                    {item.icon}
                                </motion.div>
                            ))}
                        </div>

                        {/* FOOTER */}
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                mt-8
                                text-[14px]
                                text-[#7B8190]
                                font-medium
                            "
                        >
                            <button className="hover:text-black transition-colors">
                                Terms
                            </button>

                            <span>•</span>

                            <button className="hover:text-black transition-colors">
                                Privacy
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}


export default function AuthButtons() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    return (
        <>
            {/* LOGIN BUTTON */}
            <button
                onClick={() => setLoginOpen(true)}
                className="
                    rounded-md
                    text-sm
                    hover:bg-[#77809B]/8
                    text-blue-700
                    font-bold
                    py-2
                    px-4
                    transition
                "
            >
                Log In
            </button>

            {/* SIGNUP BUTTON */}
            <button
                onClick={() => setSignupOpen(true)}
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
            >
                Sign Up
            </button>

            {/* LOGIN MODAL */}
            <AuthDialog
                type="login"
                open={loginOpen}
                onOpenChange={setLoginOpen}
            />

            {/* SIGNUP MODAL */}
            <AuthDialog
                type="signup"
                open={signupOpen}
                onOpenChange={setSignupOpen}
            />
        </>
    );
}