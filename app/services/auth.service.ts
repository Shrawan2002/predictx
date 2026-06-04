import { apiFetch } from "@/lib/api";

// ── Payload types ──────────────────────────────────────────
interface SignupPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

// ── Response types ─────────────────────────────────────────
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

// ── Service ────────────────────────────────────────────────
export const authService = {

    // ================= USER LOGIN =================
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await apiFetch.post("/auth/login", { email, password });
        return data;
    },

    // ================= SIGNUP =================
    signup: async (payload: SignupPayload): Promise<{ message: string }> => {
        const { data } = await apiFetch.post("/auth/register", payload);
        return data;
    },

    // ================= VERIFY OTP =================
    verifyOtp: async (email: string, otp: string): Promise<AuthResponse> => {
        const { data } = await apiFetch.post("/auth/verify-register-otp", { email, otp });
        return data;
    },

    // ================= RESEND OTP =================
    resendOtp: async (email: string): Promise<{ message: string }> => {
        const { data } = await apiFetch.post("/auth/resend-otp", { email });
        return data;
    },

    // ================= USER PROFILE =================
    getProfile: async (): Promise<ProfileResponse> => {
        const { data } = await apiFetch.get("/auth/me");
        return data;
    },

    // ================= USER LOGOUT =================
    logout: async (): Promise<{ message: string }> => {
        const { data } = await apiFetch.delete("/auth/logout");
        return data;
    },

    // ================= ADMIN LOGIN =================
    adminLogin: async (email: string, password: string): Promise<AdminAuthResponse> => {
        const { data } = await apiFetch.post("/admin/auth/login", { email, password });
        return data;
    },

    // ================= ADMIN PROFILE =================
    getAdminProfile: async (): Promise<AdminProfileResponse> => {
        const { data } = await apiFetch.get("/admin/auth/me");
        return data;
    },

    // ================= ADMIN LOGOUT =================
    adminLogout: async (): Promise<{ message: string }> => {
        const { data } = await apiFetch.delete("/admin/auth/logout");
        return data;
    },
};