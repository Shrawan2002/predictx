import { create } from "zustand";
import { toast } from "sonner";
import { categoryService } from "@/services/category.service";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "@/types/category.types";


// const demoCategories: Category[] = [
//     {
//         id: 1,
//         name: "Sports",
//         slug: "sports",
//         icon: "Trophy",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 2,
//         name: "Entertainment",
//         slug: "entertainment",
//         icon: "Star",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 3,
//         name: "Technology",
//         slug: "technology",
//         icon: "Cpu",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 4,
//         name: "Finance",
//         slug: "finance",
//         icon: "Bitcoin",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 5,
//         name: "Trending",
//         slug: "trending",
//         icon: "TrendingUp",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 6,
//         name: "Gaming",
//         slug: "gaming",
//         icon: "Gamepad2",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 7,
//         name: "Travel",
//         slug: "travel",
//         icon: "Plane",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 8,
//         name: "Lifestyle",
//         slug: "lifestyle",
//         icon: "Heart",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 9,
//         name: "Shopping",
//         slug: "shopping",
//         icon: "ShoppingBag",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
//     {
//         id: 10,
//         name: "Global News",
//         slug: "global-news",
//         icon: "Globe",
//         createdAt: "2023-05-22T12:00:00.000Z",
//         updatedAt: "2023-05-22T12:00:00.000Z",
//     },
// ];

interface CategoryState {
    // ── State ──────────────────────────────────────────────
    categories: Category[];
    selectedCategory: Category | null;
    loading: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    search: string;
    error: string | null;

    // ── Actions ────────────────────────────────────────────
    fetchCategories: () => Promise<void>;
    createCategory: (data: CreateCategoryDto) => Promise<boolean>;
    updateCategory: (id: number, data: UpdateCategoryDto) => Promise<boolean>;
    deleteCategory: (id: number) => Promise<boolean>;
    setSelectedCategory: (category: Category | null) => void;
    clearSelectedCategory: () => void;
    setSearch: (value: string) => void;
}

export const useCategoryStore = create<CategoryState>()((set, get) => ({
    // ── Initial State ──────────────────────────────────────
    categories: [],
    selectedCategory: null,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    search: "",
    error: null,

    // ── Fetch ──────────────────────────────────────────────
    fetchCategories: async () => {
        try {
            set({ loading: true });
            const res = await categoryService.getCategories();
            if (res.success && res.data) {
                set({ categories: res.data });
            } else {
                toast.error(res.message || "Failed to fetch categories");
                set({ error: res.message || "Failed to fetch categories" });
            }
        } catch (err: unknown) {
            toast.error("Failed to fetch categories");
            set({ error: err instanceof Error ? err.message : "Failed to fetch categories" });
        } finally {
            set({ loading: false });
        }
    },

    // ── Create ─────────────────────────────────────────────
    createCategory: async (data) => {
        try {
            set({ creating: true });
            await categoryService.createCategory(data);
            toast.success("Category created successfully");
            await get().fetchCategories();
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to create category";
            toast.error(message);
            set({ error: message });
            return false;
        } finally {
            set({ creating: false });
        }
    },

    // ── Update ─────────────────────────────────────────────
    updateCategory: async (id, data) => {
        try {
            set({ updating: true });
            await categoryService.updateCategory(id, data);
            toast.success("Category updated successfully");
            await get().fetchCategories();
            set({ selectedCategory: null });
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to update category";
            toast.error(message);
            return false;
        } finally {
            set({ updating: false });
        }
    },

    // ── Delete ─────────────────────────────────────────────
    deleteCategory: async (id) => {
        try {
            set({ deleting: true });
            await categoryService.deleteCategory(id);
            toast.success("Category deleted successfully");
            await get().fetchCategories();
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to delete category";
            toast.error(message);
            return false;
        } finally {
            set({ deleting: false });
        }
    },

    // ── Selection ──────────────────────────────────────────
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    clearSelectedCategory: () => set({ selectedCategory: null }),

    // ── Search ─────────────────────────────────────────────
    setSearch: (value) => set({ search: value }),
}));