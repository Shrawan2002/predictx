"use client";

import Image from "next/image";

import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Pencil,
    Share2,
    ScanSearch,
    Search,
    ArrowUpRight,
    ArrowDownUp,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {

    // =========================
    // ZUSTAND DATA
    // =========================

    const user = useAuthStore(
        (s) => s.user
    );

    // =========================
    // LOADING STATE
    // =========================

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    // =========================
    // FORMAT DATE
    // =========================

    const joinedDate = new Date(
        user.createdAt || ""
    ).toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    return (
        <div className="min-h-screen bg-[#fafafa] p-6">

            <div className="max-w-7xl mx-auto space-y-6">

                {/* ========================= */}
                {/* TOP SECTION */}
                {/* ========================= */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ========================= */}
                    {/* PROFILE CARD */}
                    {/* ========================= */}

                    <Card className="rounded-3xl border shadow-sm">

                        <CardContent className="p-6">

                            {/* TOP */}

                            <div className="flex items-start justify-between">

                                <div className="flex gap-4">

                                    {/* AVATAR */}

                                    <div className="relative h-24 w-24 rounded-full overflow-hidden border bg-gray-200">

                                        <Image
                                            src={
                                                user.avatar ||
                                                "/avatar.png"
                                            }
                                            alt={
                                                user.name
                                            }
                                            fill
                                            className="object-cover"
                                        />

                                    </div>

                                    {/* USER INFO */}

                                    <div>

                                        <h1 className="text-4xl font-bold tracking-tight">
                                            {user.name}
                                        </h1>

                                        <div className="flex items-center gap-2 mt-2 text-muted-foreground">

                                            <p className="text-lg">
                                                Joined {joinedDate}
                                            </p>

                                            <span>•</span>

                                            <p className="text-lg">
                                                @{user.referralCode}
                                            </p>

                                        </div>

                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {user.email}
                                        </p>

                                    </div>

                                </div>

                                {/* ACTIONS */}

                                <div className="flex items-center gap-4 text-muted-foreground">

                                    <button>
                                        <ScanSearch className="h-5 w-5" />
                                    </button>

                                    <button>
                                        <Pencil className="h-5 w-5" />
                                    </button>

                                    <button>
                                        <Share2 className="h-5 w-5" />
                                    </button>

                                </div>

                            </div>

                            {/* ========================= */}
                            {/* STATS */}
                            {/* ========================= */}

                            <div className="grid grid-cols-3 mt-8">

                                {/* POSITION VALUE */}

                                <div>

                                    <h2 className="text-4xl font-semibold">
                                        $0.00
                                    </h2>

                                    <p className="text-muted-foreground mt-2">
                                        Positions Value
                                    </p>

                                </div>

                                {/* BIGGEST WIN */}

                                <div className="border-l pl-6">

                                    <h2 className="text-4xl font-semibold">
                                        —
                                    </h2>

                                    <p className="text-muted-foreground mt-2">
                                        Biggest Win
                                    </p>

                                </div>

                                {/* PREDICTIONS */}

                                <div className="border-l pl-6">

                                    <h2 className="text-4xl font-semibold">
                                        0
                                    </h2>

                                    <p className="text-muted-foreground mt-2">
                                        Predictions
                                    </p>

                                </div>

                            </div>

                            {/* ========================= */}
                            {/* BUTTONS */}
                            {/* ========================= */}

                            <div className="grid grid-cols-2 gap-3 mt-8">

                                <Button className="h-14 rounded-2xl text-base font-semibold">

                                    <ArrowDownToLine className="mr-2 h-5 w-5" />

                                    Deposit

                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-14 rounded-2xl text-base font-semibold"
                                >

                                    <ArrowUpFromLine className="mr-2 h-5 w-5" />

                                    Withdraw

                                </Button>

                            </div>

                        </CardContent>

                    </Card>

                    {/* ========================= */}
                    {/* PROFIT CARD */}
                    {/* ========================= */}

                    <Card className="rounded-3xl border shadow-sm">

                        <CardContent className="p-6 h-full">

                            {/* HEADER */}

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <div className="h-3 w-3 rounded-full bg-gray-500" />

                                    <p className="text-xl text-muted-foreground font-medium">
                                        Profit/Loss
                                    </p>

                                </div>

                                {/* FILTERS */}

                                <div className="flex items-center gap-5">

                                    {[
                                        "1D",
                                        "1W",
                                        "1M",
                                        "1Y",
                                        "YTD",
                                        "ALL",
                                    ].map((item, i) => (

                                        <button
                                            key={item}
                                            className={cn(
                                                "text-sm font-semibold text-muted-foreground",
                                                i === 0 &&
                                                "bg-blue-100 text-blue-600 px-3 py-2 rounded-xl"
                                            )}
                                        >
                                            {item}
                                        </button>

                                    ))}

                                </div>

                            </div>

                            {/* VALUE */}

                            <div className="mt-6">

                                <div className="flex items-center gap-3">

                                    <h2 className="text-5xl font-bold">
                                        $0.00
                                    </h2>

                                    <ArrowUpRight className="h-5 w-5" />

                                </div>

                                <p className="text-muted-foreground mt-2">
                                    Past Day
                                </p>

                            </div>

                            {/* CHART */}

                            <div className="mt-10 h-[180px] rounded-2xl bg-gradient-to-b from-indigo-100 to-transparent relative overflow-hidden">

                                <div className="absolute right-5 top-5 text-3xl font-bold text-gray-300">
                                    PredictX
                                </div>

                            </div>

                        </CardContent>

                    </Card>

                </div>

                {/* ========================= */}
                {/* TABS */}
                {/* ========================= */}

                <div className="flex items-center gap-8">

                    <button className="text-2xl font-bold">
                        Positions
                    </button>

                    <button className="text-2xl font-bold text-muted-foreground">
                        Activity
                    </button>

                </div>

                {/* ========================= */}
                {/* FILTERS */}
                {/* ========================= */}

                <div className="flex flex-col lg:flex-row gap-4">

                    {/* ACTIVE CLOSED */}

                    <div className="flex border rounded-2xl overflow-hidden bg-white w-fit">

                        <button className="px-8 py-4 bg-gray-100 font-semibold">
                            Active
                        </button>

                        <button className="px-8 py-4 text-muted-foreground font-semibold">
                            Closed
                        </button>

                    </div>

                    {/* SEARCH */}

                    <div className="flex-1 relative">

                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />

                        <Input
                            placeholder="Search positions"
                            className="h-14 rounded-2xl pl-12 bg-white"
                        />

                    </div>

                    {/* SORT */}

                    <Button
                        variant="outline"
                        className="h-14 rounded-2xl px-6"
                    >

                        <ArrowDownUp className="mr-2 h-4 w-4" />

                        Value

                    </Button>

                </div>

                {/* ========================= */}
                {/* TABLE HEADER */}
                {/* ========================= */}

                <div className="grid grid-cols-4 text-muted-foreground text-sm font-semibold px-4 pt-4">

                    <div>MARKET</div>

                    <div className="text-center">
                        AVG
                    </div>

                    <div className="text-center">
                        CURRENT
                    </div>

                    <div className="text-right">
                        VALUE
                    </div>

                </div>

            </div>

        </div>
    );
}