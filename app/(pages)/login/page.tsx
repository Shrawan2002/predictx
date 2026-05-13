"use client";

import { motion } from "framer-motion";
import {
    FaGoogle,
    FaTelegramPlane,
    FaDiscord,
    FaEllipsisH,
    FaFirefoxBrowser
} from "react-icons/fa";
import { SiSteam, SiWalletconnect } from "react-icons/si";
import { BsGridFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[540px] rounded-[22px] bg-white border border-[#e5e5e5] shadow-sm px-5 py-9"
            >
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[22px] sm:text-[24px] font-bold text-center text-black"
                >
                    Welcome to Polymarket
                </motion.h1>

                {/* Google Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-8"
                >
                    <Button
                        className="w-full h-[64px] rounded-[14px] bg-[#2454E6] hover:bg-[#1f4cdc] text-white text-[18px] font-semibold"
                    >
                        <FaGoogle className="mr-3 text-xl" />
                        Continue with Google
                    </Button>
                </motion.div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
                    <span className="text-[#7b8190] font-semibold text-[15px]">
                        OR
                    </span>
                    <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
                </div>

                {/* Email Box */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className="border-2 border-[#4D73FF] rounded-[18px] p-2 flex items-center bg-white shadow-[0_0_0_2px_rgba(77,115,255,0.1)]">
                        <Input
                            placeholder="Email address"
                            className="border-none shadow-none focus-visible:ring-0 h-[56px] text-[18px] placeholder:text-[#A0A6B2]"
                        />

                        <Button
                            className="h-[50px] px-6 rounded-[12px] bg-[#88A2F8] hover:bg-[#7995f4] text-white text-[18px] font-semibold"
                        >
                            Continue
                        </Button>
                    </div>
                </motion.div>

                {/* Wallet Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="grid grid-cols-4 gap-6 mt-8"
                >
                    {wallets.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.06,
                                y: -2,
                            }}
                            whileTap={{ scale: 0.96 }}
                            className="h-[72px] rounded-[12px] border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer transition-all"
                        >
                            {item.icon}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 mt-8 text-[14px] text-[#7B8190] font-medium"
                >
                    <button className="hover:text-black transition-colors">
                        Terms
                    </button>

                    <span>•</span>

                    <button className="hover:text-black transition-colors">
                        Privacy
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}