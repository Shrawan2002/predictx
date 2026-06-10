export interface AssetsType {
    id: number;
    name: string;
    icon: string | null;
    symbol: string;
    createdAt: string;
    updatedAt: string;
    iconUrl?: string | null;
}

export interface PostAssetsDataType {
    name: string;
    symbol: string;
    icon?: File | null;
}

export interface PatchAssetsDataType {
    name?: string;
    symbol?: string;
    icon?: File | null;
}

export interface ApiResponseAssetsType<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface AssetsStoreState {
    assets: AssetsType[];
    assetsById: AssetsType | null;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    loading: boolean;
    error: string | null;
    selectedAssets: AssetsType | null;
    search: string;

    //action
    fetchAllAssets: () => Promise<void>;
    fetchAssetsById: (id: number) => Promise<void>;
    createAssets: (payload: PostAssetsDataType) => Promise<boolean>;
    updateAssets: (id: number, payload: PatchAssetsDataType) => Promise<boolean>;
    deleteAssets: (id: number) => Promise<boolean>;
    setSearch: (query: string) => void;
    clearError: () => void;
    setSelectedAssets: (assets: AssetsType | null) => void;
    clearSelectedAssets: () => void;
}


