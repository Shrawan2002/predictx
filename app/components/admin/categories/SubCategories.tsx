import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

export default function SubCategories() {
    return (
        <>
            <h1 className="text-white font-semibold text-sm tracking-tight leading-none">Add Category</h1>
            <form>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input type="text" id="categoryName" />
                <Label htmlFor="categorySlug">Category Slug</Label>
                <Input type="text" id="categorySlug" />
                <Label htmlFor="categoryDescription">Category Description</Label>
                <Input type="text" id="categoryDescription" />
                {/* <Checkbox id="categoryStatus" /> */}
                <Label htmlFor="categoryStatus">Category Status</Label>
                <Button type="submit">Submit</Button>
            </form>
        </>
    )
}