

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    categoryId: number;
    createdAt?: string;
    updatedAt?: string;
    // ✅ optional joined field — present only when API includes it
    category?: {
        id: number;
        name: string;
        icon: string;
        slug: string;
    };
}

export interface CategoryWithSubCategories {
    id: number;
    name: string;
    slug: string;
    icon: string;
    createdAt?: string;
    updatedAt?: string;
    subCategories: SubCategory[];  // ✅ nested array
}

export interface CreateSubCategoryDto {
    name: string;
    slug: string;
    icon: string | null;
    categoryId: number;
}

export interface UpdateSubCategoryDto extends CreateSubCategoryDto { }


export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data: T;
}



export interface SubCategoryStoreState {
    loading: boolean;
    categoryWithSubCategories: CategoryWithSubCategories | null;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    error: string | null;
    search: string;
    selectedSubCategory: SubCategory | null;
    selectedCategoryFilter: number | null; // filter list by parent categoryId

    //Actions-------------
    fetchSubCategories: (categoryId?: number) => Promise<void>;
    createSubCategory: (payload: CreateSubCategoryDto) => Promise<boolean>;
    updateSubCategory: (id: number, payload: UpdateSubCategoryDto) => Promise<boolean>;
    deleteSubCategory: (id: number) => Promise<boolean>;
    clearError: () => void;
    setSelectedSubCategory: (sub: SubCategory | null) => void;
    clearSelectedSubCategory: () => void;
    setSelectedCategoryFilter: (categoryId: number | null) => void;
    setSearch: (value: string) => void;

}