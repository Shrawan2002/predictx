import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string({
            message: "Full name is required",
        })
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .regex(
            /^[a-zA-Z\s]+$/,
            "Name can only contain letters and spaces"
        ),

    email: z
        .string({
            message: "Email is required",
        })
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address"),

    password: z
        .string({
            message: "Password is required",
        })
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long")
        .regex(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
        )
        .regex(
            /[a-z]/,
            "Password must contain at least one lowercase letter"
        )
        .regex(
            /[0-9]/,
            "Password must contain at least one number"
        )
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        ),

    referralCode: z
        .string()
        .trim()
        .min(4, "Referral code is too short")
        .max(20, "Referral code is too long")
        .optional()
        .or(z.literal("")),

    termsAccepted: z.literal(true, {
        message: "You must accept terms and conditions",
    }),
});
