import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const assetSchema = z.object({
    symbol: z
        .string()
        .trim()
        .min(1, "Symbol is required")
        .max(20, "Symbol must be under 20 characters")
        .transform((val) => val.toUpperCase()),

    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name must be under 100 characters"),

    icon: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Image size must be less than 2MB"
        )
        .refine(
            (file) => !file || ACCEPTED_TYPES.includes(file.type),
            "Only JPG, PNG and WebP files are allowed"
        ),
});

export type AssetFormData = z.infer<typeof assetSchema>;