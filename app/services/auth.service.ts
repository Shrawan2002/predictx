import { apiFetch } from "@/lib/api";

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    referralCode?: string;
    referredBy?: string;
    createdAt?: string;
}

export interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    data: {
        user: User;
        access_token: string;
    };
}

export interface AdminAuthResponse {
    success: boolean;
    message: string;

    data: {
        admin: AdminUser;
        access_token: string;
    };
}

interface ProfileResponse {
    data: User;
    message: string;
}

interface AdminProfileResponse {
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: string;
    };
}

export const authService = {
    // ================= LOGIN =================

    login: async (
        email: string,
        password: string
    ): Promise<AuthResponse> => {
        return apiFetch("/auth/login", {
            method: "POST",

            body: JSON.stringify({
                email,
                password,
            }),
        });
    },

    // ================= SIGNUP =================

    signup: async (
        payload: SignupPayload
    ): Promise<{ message: string }> => {
        return apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    // ================= VERIFY OTP =================

    verifyOtp: async (
        email: string,
        otp: string
    ): Promise<AuthResponse> => {
        return apiFetch("/auth/verify-register-otp", {
            method: "POST",

            body: JSON.stringify({
                email,
                otp,
            }),
        });
    },

    // ================= RESEND OTP =================

    resendOtp: async (
        email: string
    ): Promise<{ message: string }> => {
        return apiFetch("/auth/resend-otp", {
            method: "POST",

            body: JSON.stringify({
                email,
            }),
        });
    },

    // ================= PROFILE =================

    getProfile: async (): Promise<ProfileResponse> => {
        return apiFetch("/auth/me", {
            method: "GET",
        });
    },

    // ================= USER LOGOUT =================

    logout: async (): Promise<{ message: string }> => {
        return apiFetch("/auth/logout", {
            method: "DELETE",
        });
    },

    // ================= ADMIN LOGIN =================

    adminLogin: async (email: string, password: string): Promise<AdminAuthResponse> => {
        return apiFetch("/admin/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        });
    },

    // ================= ADMIN PROFILE =================

    getAdminProfile: async (): Promise<AdminProfileResponse> => {
        return apiFetch("/admin/auth/me", {
            method: "GET",
        });
    },

    // ================= ADMIN LOGOUT =================

    adminLogout: async (): Promise<{ message: string }> => {
        return apiFetch("/admin/auth/logout", {
            method: "DELETE",
        });
    },


};




