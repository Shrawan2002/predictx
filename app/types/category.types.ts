export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    subCategories?: SubCategory[];
}

export interface CreateCategoryDto {
    name: string;
    slug: string;
    icon: string
}

export interface UpdateCategoryDto {
    name?: string;
    slug?: string;
    icon?: string;
}
export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: Category | Category[];
    statusCode?: number;
    path?: string;
    timestamp?: string;
}


