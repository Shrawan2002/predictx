
import type { Category, CreateCategoryDto, UpdateCategoryDto, } from "@/types/category.types";
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


// export const categoryService = {
//     getCategories: async (): Promise<ApiResponse> => {
//         return await apiFetch.get("/category");
//     },

//     // createCategory: async (payload: CreateCategoryDto): Promise<Category> => {
//     //     const { data } = await api.post<ApiResponse<Category>>("/api/admin/categories", payload);
//     //     return data.data;
//     // },

//     createCategory: async (payload: CreateCategoryDto): Promise<ApiResponse> => {
//         return await apiFetch.post("/category", payload);

//         // return data.data;
//     },

//     updateCategory: async (id: number, payload: UpdateCategoryDto): Promise<ApiResponse> => {
//         return await apiFetch.patch(`/category/${id}`, payload);

//         // return data;
//     },

//     deleteCategory: async (id: number): Promise<ApiResponse> => {
//         return await apiFetch.delete(`/category/${id}`);
//     },
// };



interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data: T;
}

export const categoryService = {

    getCategories: async (): Promise<ApiResponse<Category[]>> => {
        const { data } = await apiFetch.get("/category");
        // console.log("apiFetch", data);
        return data;
    },

    createCategory: async (payload: CreateCategoryDto): Promise<ApiResponse<Category>> => {
        const { data } = await apiFetch.post("/category", payload);
        return data;
    },

    updateCategory: async (id: number, payload: UpdateCategoryDto): Promise<ApiResponse<Category>> => {
        const { data } = await apiFetch.patch(`/category/${id}`, payload);
        return data;
    },

    deleteCategory: async (id: number): Promise<ApiResponse<void>> => {
        const { data } = await apiFetch.delete(`/category/${id}`);
        return data;
    },
};