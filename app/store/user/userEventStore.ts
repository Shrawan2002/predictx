import { create } from "zustand";
import { toast } from "sonner";
import { userEventService } from "@/services/user/userEvent.service";
import { categoryService } from "@/services/category.service";
import type { UserEvent, UserEventStoreState } from "@/types/user/userEvent.types";

export const useUserEventStore = create<UserEventStoreState>((set, get) => ({

    // ── Initial state ──────────────────────────────────────
    userEvents: [],
    subCategories: [],
    categories: [],
    loading: false,
    error: null,
    search: "",
    selectedCategoryId: 0,
    selectedSubCategoryId: 0,
    selectedEventType: "",

    // ── Fetch all events ───────────────────────────────────
    getAllUserEvents: async () => {
        try {
            set({ loading: true, error: null });

            const res = await userEventService.getAllEvents({
                categoryId: get().selectedCategoryId || undefined,
                subcategoryId: get().selectedSubCategoryId || undefined,
            });

            if (res.success && res.data) {
                set({ userEvents: res.data });
            } else {
                set({ error: res.message || "Failed to fetch events" });
                toast.error(res.message || "Failed to fetch events");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to fetch events";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    },

    // ── Fetch all categories ───────────────────────────────────
    fetchCategories: async () => {
        try {
            set({ loading: true, error: null });

            const res = await categoryService.getCategories();

            if (res.success && res.data) {
                set({ categories: res.data });
            } else {
                set({ error: res.message || "Failed to fetch categories" });
                toast.error(res.message || "Failed to fetch categories");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to fetch categories";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    },

    // ── Fetch subcategories by category id ─────────────────
    getAllSubCategories: async () => {
        try {
            set({ loading: true, error: null });

            const categoryId = get().selectedCategoryId;

            if (!categoryId) {
                set({ subCategories: [], loading: false });
                return;
            }
            const res = await userEventService.getAllSubCategories(categoryId);

            if (res.success && res.data) {
                set({ subCategories: res.data.subCategories ?? [] });
            } else {
                set({ error: res.message || "Failed to fetch subcategories" });
                toast.error(res.message || "Failed to fetch subcategories");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to fetch subcategories";
            set({ error: message });
            toast.error(message);
        } finally {
            set({ loading: false });
        }
    },

    // ── Setters ────────────────────────────────────────────
    setSearch: (query) => set({ search: query }),
    setSelectedEventType: (type) => set({ selectedEventType: type }),

    setSelectedCategoryId: (categoryId) => set({
        selectedCategoryId: categoryId,
        selectedSubCategoryId: 0,
    }),

    setSelectedSubCategoryId: (subcategoryId) => set({ selectedSubCategoryId: subcategoryId ?? 0 }),
    clearError: () => set({ error: null }),
}));

// ── Client-side filter helper ──────────────────────────────
export function selectFilteredEvents(
    events: UserEvent[],
    search: string,
    selectedEvent?: string | null,
    categoryId?: number | null,
    subcategoryId?: number | null,
): UserEvent[] {
    return events.filter((e) => {
        const matchesSearch =
            search === "" ||
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.description?.toLowerCase().includes(search.toLowerCase()) ||
            e.asset?.name.toLowerCase().includes(search.toLowerCase()) ||
            e.asset?.symbol.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            !selectedEvent ||
            selectedEvent === "all" ||
            selectedEvent === "" ||
            e.eventType === selectedEvent;

        // ✅ 0 means "not selected" — treat same as undefined
        // const matchesCategory =
        //     !categoryId || categoryId === 0 ||
        //     e.categoryId === categoryId;

        // const matchesSubcategory =
        //     !subcategoryId || subcategoryId === 0 ||
        //     e.subcategoryId === subcategoryId;

        return matchesSearch && matchesType; //&& matchesCategory && matchesSubcategory;
    });
}