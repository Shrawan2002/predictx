import { assetsService } from "@/services/assets.service";
import { AssetsStoreState } from "@/types/assets.type";
import { toast } from "sonner";
import { create } from "zustand";

export const useAssetsStore = create<AssetsStoreState>((set, get) => ({
    assets: [],
    assetsById: null,
    selectedAssets: null,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null,
    search: "",

    // ── Fetch all assets ─────────────────────────────────────────────────
    fetchAllAssets: async () => {
        try {
            set({ loading: true, error: null })
            const resp = await assetsService.fetchAllAssets();
            if (resp.success && resp.data) {
                set({ assets: resp.data })

            } else {
                toast.error(resp.message || "Failed to fetch");
                set({ error: resp.message || "Failed to fetch" })
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
            set({ error: message })
        } finally {
            set({ loading: false })
        }
    },

    fetchAssetsById: async (id) => {
        try {
            set({ loading: true, error: null })
            const resp = await assetsService.fetchAssetsById(id);
            if (resp.success && resp.data) {
                set({ assetsById: resp.data })

            } else {
                toast.error(resp.message || "Failed to fetch");
                set({ error: resp.message || "Failed to fetch" })
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
            set({ error: message })
        } finally {
            set({ loading: false })
        }
    },

    //  create

    createAssets: async (data) => {
        try {
            set({ creating: true, error: null })
            const resp = await assetsService.createAssets(data);
            if (resp.success && resp.data) {
                toast.success(resp.message || "Asset created successfully");
                await get().fetchAllAssets();
                return true;
            } else {
                toast.error(resp.message || "Failed to create asset");
                set({ error: resp.message || "Failed to create asset" })
                return false;
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
            set({ error: message })
            return false;
        } finally {
            set({ creating: false })
        }
    },

    // update

    updateAssets: async (id, data) => {
        try {
            set({ updating: true, error: null })
            const resp = await assetsService.updateAssets(id, data);
            if (resp.success && resp.data) {
                toast.success(resp.message || "Asset updated successfully");
                await get().fetchAllAssets();
                return true;
            } else {
                toast.error(resp.message || "Failed to update asset");
                set({ error: resp.message || "Failed to update asset" })
                return false;
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
            set({ error: message })
            return false;
        } finally {
            set({ updating: false })
        }
    },

    // delete

    deleteAssets: async (id) => {
        try {
            set({ deleting: true, error: null })
            const resp = await assetsService.deleteAssets(id);
            if (resp.success) {
                toast.success(resp.message || "Asset deleted successfully");
                await get().fetchAllAssets();
                return true;
            } else {
                toast.error(resp.message || "Failed to delete asset");
                set({ error: resp.message || "Failed to delete asset" })
                return false;
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            toast.error(message);
            set({ error: message })
            return false;
        } finally {
            set({ deleting: false })
        }
    },

    setSearch: (query: string) => set({ search: query }),
    setSelectedAssets: (assets) => set({ selectedAssets: assets }),
    clearError: () => set({ error: null }),
    clearSelectedAssets: () => set({ selectedAssets: null }),

}))