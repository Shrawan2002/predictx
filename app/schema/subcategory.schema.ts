import { z } from "zod";

export const SubCategorySchema = z.object({
    name: z.string()
        .trim()
        .min(1, "Subcategory name is required")
        .min(2, "Subcategory name must be at least 2 characters")
        .max(50, "Subcategory name must be under 50 characters"),

    slug: z.string()
        .trim()
        .min(1, "Subcategory slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Subcategory slug must only contain lowercase letters, numbers and hyphens")
        .max(50, "Subcategory slug must be under 50 characters"),

    icon: z.string()
        .trim()
        .min(1, "Subcategory icon is required")
        .max(50, "Subcategory icon must be under 50 characters"),

    categoryId: z.number()
        .min(1, "category is required")
        .transform((val) => Number(val)),
});

export type SubCategoryFormData = z.infer<typeof SubCategorySchema>;
