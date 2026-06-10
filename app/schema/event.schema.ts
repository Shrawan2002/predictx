import { number, z } from "zod";

export const eventSchema = z.object({
    categoryId: z.number()
        .min(1, "Category is required")
        .transform((val) => Number(val)),
    subcategoryId: z.number()
        .min(1, "Subcategory is required")
        .transform((val) => Number(val)),
    question: z.string()
        .trim()
        .min(3, "Question must be at least 3 characters long")
        .max(300, "Question must not exceed 100 characters"),
    betPrice: z.number({ message: "Bet price is required" })
        .min(1, "Bet price must be at least 1")
        .transform((val) => Number(val)),
    startTime: z.string({ message: "Start time is required" })
        .trim()
        .min(1, "Start time is required"),
    endTime: z.string({ message: "End time is required" })
        .trim()
        .min(1, "End time is required"),
    image: z.any().optional()
})
    .refine((data) => {
        if (!data.startTime || !data.endTime) return true;
        return new Date(data.endTime) > new Date(data.startTime);
    }, {
        message: "End time must be after start time",
        path: ["endTime"],
    })
    .refine((data) => {
        if (!data.image) return true;
        return data.image.size <= 5 * 1024 * 1024;
    }, {
        message: "Image size must be less than 5MB",
        path: ["image"],
    });

export type EventFormData = z.infer<typeof eventSchema>;