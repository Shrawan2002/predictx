import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Category name is required")
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name must be under 50 characters"),

    slug: z
        .string()
        .trim()
        .min(1, "Category slug is required")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Category slug must only contain lowercase letters, numbers and hyphens"
        ),

    icon: z
        .string()
        .trim()
        .min(1, "Category icon name is required")
        .max(10, "Category icon name must be under 10 characters"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;