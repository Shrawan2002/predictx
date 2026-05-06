"use client";

import Link from "next/link";
import { Mail, X, Camera, Disc, Music } from "lucide-react";
import { Logo } from "./Header";

export default function Footer() {
    return (
        <footer className="bg-[#15191d] text-gray-400 border-t border-white/10 mt-16">

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* 🔵 TOP SECTION */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <Logo />
                        <div>
                            <h3 className="text-white text-lg font-semibold">
                                PredictX
                            </h3>
                            <p className="text-sm text-gray-400 max-w-md">
                                PredictX is the world's largest decentralized prediction market
                            </p>
                        </div>
                    </div>

                    {/* SOCIAL ICONS */}
                    <div className="flex gap-4 text-gray-400 mt-2">
                        <Mail size={18} className="hover:text-white cursor-pointer" />
                        <X size={18} className="hover:text-white cursor-pointer" />
                        <Camera size={18} className="hover:text-white cursor-pointer" />
                        <Disc size={18} className="hover:text-white cursor-pointer" />
                        <Music size={18} className="hover:text-white cursor-pointer" />
                    </div>
                </div>

                {/* 🔵 TITLE */}
                <div className="mt-10">
                    <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                        Markets by category and topics
                    </h2>
                </div>

                {/* 🔵 GRID SECTION */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-8">

                    {/* Markets 1 */}
                    <div>
                        <ul className="space-y-3 text-sm">
                            {["Iran", "Met Gala", "Hantavirus", "Cuba", "Earnings"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white hover:text-gray-300 transition">
                                        {item}
                                        <p className="text-xs text-gray-500">
                                            Predictions & odds
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Markets 2 */}
                    <div>
                        <ul className="space-y-3 text-sm">
                            {["UK Elections", "Oil", "Ohio Primaries", "2026 NBA Playoffs", "Fed Chair"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white hover:text-gray-300 transition">
                                        {item}
                                        <p className="text-xs text-gray-500">
                                            Predictions & odds
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Markets 3 (hidden on mobile) */}
                    <div className="hidden md:block">
                        <ul className="space-y-3 text-sm">
                            {[
                                "Musk v Altman",
                                "Strait of Hormuz",
                                "James Comey",
                                "2026 NHL Playoffs",
                                "Will Trump win 2026 midterms?"
                            ].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white hover:text-gray-300 transition">
                                        {item}
                                        <p className="text-xs text-gray-500">
                                            Predictions & odds
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium mb-3">
                            Support & Social
                        </h3>

                        <ul className="space-y-2 text-sm">
                            {[
                                "Learn",
                                "X (Twitter)",
                                "Instagram",
                                "Discord",
                                "TikTok",
                                "News",
                                "Contact us",
                                "Help Center"
                            ].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white hover:text-gray-300 transition">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium mb-3">
                            PredictX
                        </h3>

                        <ul className="space-y-2 text-sm">
                            {[
                                "Rewards",
                                "APIs",
                                "Leaderboard",
                                "Accuracy",
                                "Brand",
                                "Activity",
                                "Careers",
                                "Press"
                            ].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white hover:text-gray-300 transition">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* 🔵 DIVIDER */}
                <div className="border-t border-white/10 my-10" />

                {/* 🔵 BOTTOM */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">

                    <div className="flex flex-wrap gap-4 text-gray-500">
                        <span>Adventure One QSS Inc. © 2026</span>
                        <Link href="#" className="hover:text-white">Privacy</Link>
                        <Link href="#" className="hover:text-white">Terms</Link>
                        <Link href="#" className="hover:text-white">Market Integrity</Link>
                        <Link href="#" className="hover:text-white">Help Center</Link>
                        <Link href="#" className="hover:text-white">Docs</Link>
                    </div>

                    <div className="text-gray-400">
                        🌐 English
                    </div>
                </div>

                {/* 🔵 DISCLAIMER */}
                <p className="text-xs text-gray-500 mt-6 leading-relaxed max-w-5xl">
                    PredictX operates globally through separate legal entities.
                    PredictX US is operated by QCX LLC d/b/a PredictX US, a CFTC-regulated
                    Designated Contract Market. This international platform is not regulated by
                    the CFTC and operates independently. Trading involves substantial risk of loss.
                    See our Terms of Service & Privacy Policy.
                </p>

            </div>
        </footer>
    );
}