import CategoriesClient from "@/components/admin/categories/CategoriesClient";

export const metadata = {
    title: "Category Management | PredictX Admin",
};

export default function CategoriesPage() {
    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex-1 min-h-0">
                <CategoriesClient />
            </div>
        </div>
    );
}