"use client";

import { useEffect } from "react";
import { Coins, RefreshCw } from "lucide-react";
import { useAssetsStore } from "@/store/assetsStore";
import AssetForm from "./AssetForm";
import AssetList from "./AssetList";

export default function AssetsClient() {
    const { fetchAllAssets, loading, assets } = useAssetsStore();

    useEffect(() => {
        fetchAllAssets();
    }, [fetchAllAssets]);

    return (
        <div
            className="flex flex-col overflow-hidden"
            style={{ height: "calc(100vh - 64px)" }}
        >
            {/* ── Page Header ── */}
            <div
                className="shrink-0 flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(10,13,20,0.95)" }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.22)" }}
                    >
                        <Coins size={16} className="text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-white font-semibold text-sm leading-none">Asset Management</h1>
                        <p className="text-zinc-500 text-[11px] mt-0.5">Manage tradeable assets</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <span>Total</span>
                        <span
                            className="min-w-[24px] h-5 px-1.5 rounded-full text-white text-[11px] font-bold flex items-center justify-center"
                            style={{ background: "#6366f1" }}
                        >
                            {assets.length}
                        </span>
                    </div>
                    <button
                        onClick={() => fetchAllAssets()}
                        disabled={loading}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-700/60 transition-all text-xs disabled:opacity-50"
                    >
                        <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* ── Split panels ── */}
            <div className="flex flex-1 min-h-0 overflow-hidden">

                {/* Form panel */}
                <div
                    className="w-[340px] shrink-0 border-r"
                    style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0a0d14" }}
                >
                    <AssetForm />
                </div>

                {/* List panel */}
                <div
                    className="flex-1 min-w-0 flex flex-col overflow-hidden"
                    style={{ background: "#080b12" }}
                >
                    <AssetList />
                </div>
            </div>
        </div>
    );
}