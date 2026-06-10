"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAssetsStore } from "@/store/assetsStore";
import AssetCard from "@/components/admin/assets/AssetCard";
import DeleteAssetDialog from "@/components/admin/assets/DeleteAssetDialog";
import type { AssetsType } from "@/types/assets.type";

function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-16 bg-zinc-800 rounded" />
                    <div className="h-3 w-24 bg-zinc-800/60 rounded" />
                </div>
            </div>
            <div className="h-px bg-zinc-800/60 mb-3" />
            <div className="h-3 w-28 bg-zinc-800/60 rounded" />
        </div>
    );
}

export default function AssetList() {
    const {
        assets, loading, deleting, selectedAssets,
        search, setSearch, setSelectedAssets,
    } = useAssetsStore();

    const [deleteTarget, setDeleteTarget] = useState<AssetsType | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const filtered = assets.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (asset: AssetsType) => setSelectedAssets(asset);

    const handleDeleteClick = (asset: AssetsType) => {
        setDeleteTarget(asset);
        setDialogOpen(true);
    };

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

                {/* ── List header ── */}
                <div className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/60 bg-zinc-900/40">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-semibold">All Assets</span>
                        <span className="text-[11px] text-zinc-500">
                            {loading ? "..." : `${assets.length} total`}
                        </span>
                    </div>
                    <div className="relative w-52">
                        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                        <Input
                            placeholder="Search assets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-8 pl-8 bg-zinc-800/40 border-zinc-700/60 text-white placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-indigo-500/40 rounded-lg text-xs"
                        />
                    </div>
                </div>

                {/* ── Card grid ── */}
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden p-5">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-800/40 border border-dashed border-zinc-700/60 flex items-center justify-center text-2xl mb-4">
                                {search ? "🔍" : "📦"}
                            </div>
                            <p className="text-zinc-400 text-sm font-medium">
                                {search ? "No results found" : "No assets yet"}
                            </p>
                            <p className="text-zinc-600 text-xs mt-1 max-w-[200px] leading-relaxed">
                                {search ? `Nothing matches "${search}"` : "Create your first asset using the form"}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filtered.map((asset) => (
                                <AssetCard
                                    key={asset.id}
                                    asset={asset}
                                    onEdit={() => handleEditClick(asset)}
                                    onDelete={() => handleDeleteClick(asset)}
                                    isDeleting={deleting && deleteTarget?.id === asset.id}
                                    isSelected={selectedAssets?.id === asset.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <DeleteAssetDialog
                asset={deleteTarget}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </>
    );
}