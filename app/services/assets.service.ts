import { apiFetch } from "@/lib/api";
import { AssetsType, ApiResponseAssetsType, PostAssetsDataType, PatchAssetsDataType } from "@/types/assets.type";

export const assetsService = {
    fetchAllAssets: async (): Promise<ApiResponseAssetsType<AssetsType[]>> => {
        const { data } = await apiFetch.get("/admin/assets");
        return data;
    },

    fetchAssetsById: async (id: number): Promise<ApiResponseAssetsType<AssetsType>> => {
        const { data } = await apiFetch.get(`/admin/assets/${id}`);
        return data;
    },

    // ✅ multipart/form-data — because icon is a File
    createAssets: async (payload: PostAssetsDataType): Promise<ApiResponseAssetsType<AssetsType>> => {
        const form = new FormData();
        form.append("symbol", payload.symbol);
        form.append("name", payload.name);
        if (payload.icon instanceof File) {
            form.append("icon", payload.icon);
        }
        const { data } = await apiFetch.post("/admin/assets", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },

    updateAssets: async (id: number, payload: PatchAssetsDataType): Promise<ApiResponseAssetsType<AssetsType>> => {
        const form = new FormData();
        if (payload.symbol) form.append("symbol", payload.symbol);
        if (payload.name) form.append("name", payload.name);
        if (payload.icon instanceof File) form.append("icon", payload.icon);
        const { data } = await apiFetch.patch(`/admin/assets/${id}`, form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },

    deleteAssets: async (id: number): Promise<ApiResponseAssetsType<void>> => {
        const { data } = await apiFetch.delete(`/admin/assets/${id}`)
        return data;
    }


}