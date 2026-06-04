import { create } from "zustand";
import { SubCategoryStoreState } from "@/types/subcategory.types"
import { subcategoryService } from "@/services/subcategory.service"
import { toast } from "sonner";

export const useSubCategoryStore = create<(SubCategoryStoreState)>((set, get) => ({
    categoryWithSubCategories: null,
    selectedSubCategory: null,
    selectedCategoryFilter: null,
    loading: false,
    error: null,
    creating: false,
    updating: false,
    deleting: false,
    search: "",

    // ── Fetch ─────────────────────────────────────────────
    fetchSubCategories: async (categoryId?: number) => {
        try {
            set({
                loading: true,
                error: null
            })

            const response = await subcategoryService.getSubCategories(categoryId);
            set({ categoryWithSubCategories: response.data })
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to fetch subcategories";
            toast.error(message);
            set({
                error: message
            })
        } finally {
            set({
                loading: false,
            })
        }
    },

    // ── Create ─────────────────────────────────────────────
    createSubCategory: async (payload) => {
        try {
            set({
                error: null,
                creating: true
            })

            await subcategoryService.createSubCategory(payload);
            toast.success("Subcategory created successfully");
            // Refresh with current filter applied
            await get().fetchSubCategories(get().selectedCategoryFilter ?? undefined);
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to create subcategory";
            toast.error(message);
            set({
                error: message
            })
            return false;
        } finally {
            set({
                creating: false,
            })
        }
    },

    // ── Update ─────────────────────────────────────────────
    updateSubCategory: async (id, payload) => {
        try {
            set({
                updating: true,
                error: null,
            })
            await subcategoryService.updateSubCategory(id, payload);
            toast.success("Subcategory updated successfully");
            // Refresh with current filter applied
            await get().fetchSubCategories(get().selectedCategoryFilter ?? undefined);
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to update subcategory";
            toast.error(message);
            set({
                error: message
            })
            return false;
        } finally {
            set({
                updating: false,
            })
        }
    },

    // ── Delete ─────────────────────────────────────────────
    deleteSubCategory: async (id) => {
        try {
            set({
                deleting: true,
                error: null,
            })
            await subcategoryService.deleteSubCategory(id);
            toast.success("Subcategory deleted successfully");
            // Refresh with current filter applied
            await get().fetchSubCategories(get().selectedCategoryFilter ?? undefined);
            return true;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to delete subcategory";
            toast.error(message);
            set({
                error: message
            })
            return false;
        } finally {
            set({
                deleting: false,
            })
        }
    },


    // ── Selection ──────────────────────────────────────────
    setSelectedSubCategory: (sub) => set({ selectedSubCategory: sub }),
    clearSelectedSubCategory: () => set({ selectedSubCategory: null }),

    // ── Category filter ────────────────────────────────────
    setSelectedCategoryFilter: (categoryId) => {
        set({ selectedCategoryFilter: categoryId });
        // Auto-refetch with new filter
        get().fetchSubCategories(categoryId ?? undefined);
    },
    // ── Search ─────────────────────────────────────────────
    setSearch: (value) => set({ search: value }),
    // ── Reset ──────────────────────────────────────────────
    // reset: () => set({
    //     subcategories: [],
    //     selectedSubCategory: null,
    //     selectedCategoryFilter: null,
    //     loading: false,
    //     error: null,
    //     creating: false,
    //     updating: false,
    //     deleting: false,
    //     search: "",
    // }),

    clearError: () => set({ error: null })
}))
