import { apiFetch } from "@/lib/api";
import { ApiResponse, Category, UserEvent } from "@/types/user/userEvent.types";

interface EventFilters {
    categoryId?: number;
    subcategoryId?: number;
}
export const userEventService = {
    getAllEvents: async (filters?: EventFilters): Promise<ApiResponse<UserEvent[]>> => {
        const { data } = await apiFetch.get("/events", { params: filters ?? {} });
        return data;
    },

    getAllSubCategories: async (id: number): Promise<ApiResponse<Category>> => {
        const { data } = await apiFetch(`/category/${id}`);
        return data;
    }
}