
import type { Category, CreateCategoryDto, UpdateCategoryDto, ApiResponse } from "@/types/category.types";
import { apiFetch } from "@/lib/api";

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
//     headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//     if (typeof window !== "undefined") {
//         const token = sessionStorage.getItem("adminToken");
//         if (token) config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// api.interceptors.response.use(
//     (res) => res,
//     (err) => {
//         const message =
//             err.response?.data?.message ||
//             err.message ||
//             "Something went wrong";
//         return Promise.reject(new Error(message));
//     }
// );


export const categoryService = {
    getCategories: async (): Promise<ApiResponse> => {
        return await apiFetch("/category", {
            method: "GET",
        });
    },

    // createCategory: async (payload: CreateCategoryDto): Promise<Category> => {
    //     const { data } = await api.post<ApiResponse<Category>>("/api/admin/categories", payload);
    //     return data.data;
    // },

    createCategory: async (payload: CreateCategoryDto): Promise<ApiResponse> => {
        return await apiFetch("/category", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        // return data.data;
    },

    updateCategory: async (id: string, payload: UpdateCategoryDto): Promise<ApiResponse> => {
        return await apiFetch(`/category/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        // return data;
    },

    deleteCategory: async (id: string): Promise<ApiResponse> => {
        return await apiFetch(`/category/${id}`, {
            method: "DELETE",
        });
    },
};