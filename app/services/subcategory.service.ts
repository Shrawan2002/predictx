import { apiFetch } from "@/lib/api"

import type {
    ApiResponse,
    SubCategory,
    CreateSubCategoryDto,
    UpdateSubCategoryDto,
    CategoryWithSubCategories
} from "@/types/subcategory.types";

export const subcategoryService = {

    getSubCategories: async (categoryId?: number): Promise<ApiResponse<CategoryWithSubCategories>> => {
        const url = categoryId ? `/category/${categoryId}` : "/category";
        const { data } = await apiFetch.get(url);
        return data;
    },

    getSubCategoryById: async (id: number): Promise<ApiResponse<SubCategory>> => {
        const { data } = await apiFetch.get(`/subcategories/${id}`);
        return data;
    },

    createSubCategory: async (payload: CreateSubCategoryDto): Promise<ApiResponse<SubCategory>> => {
        const { data } = await apiFetch.post("category/sub-category", payload);
        return data;
    },

    updateSubCategory: async (id: number, payload: UpdateSubCategoryDto): Promise<ApiResponse<SubCategory>> => {
        const { data } = await apiFetch.patch(`category/sub-category/${id}`, payload);
        return data;
    },

    deleteSubCategory: async (id: number): Promise<ApiResponse<void>> => {
        const { data } = await apiFetch.delete(`category/sub-category/${id}`);
        return data;
    }

}
