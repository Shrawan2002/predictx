"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService, User, AdminUser } from "@/services/auth.service";

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

interface AuthState {
    user: User | null;
    admin: AdminUser | null;
    adminToken: string | null;
    loading: boolean;
    error: string | null;
    pendingEmail: string | null;

    login: (email: string, password: string) => Promise<boolean>;
    signup: (payload: SignupPayload) => Promise<boolean>;
    verifyOtp: (email: string, otp: string) => Promise<boolean>;
    resendOtp: (email: string) => Promise<boolean>;
    getProfile: () => Promise<boolean>;
    logout: () => Promise<boolean>;
    adminLogin: (email: string, password: string) => Promise<boolean>;
    getAdminProfile: () => Promise<boolean>;
    adminLogout: () => Promise<boolean>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            admin: null,
            adminToken: null,
            loading: false,
            error: null,
            pendingEmail: null,

            // ================= USER LOGIN =================
            login: async (email, password) => {
                try {
                    set({ loading: true, error: null });
                    const response = await authService.login(email, password);
                    const accessToken = response.data.access_token;
                    sessionStorage.setItem("token", accessToken);
                    const profile = await authService.getProfile();
                    set({ user: profile.data, loading: false });
                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Login failed",
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= SIGNUP =================
            signup: async (payload) => {
                try {
                    set({ loading: true, error: null });
                    await authService.signup(payload);
                    set({ pendingEmail: payload.email, loading: false });
                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Signup failed",
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= VERIFY OTP =================
            verifyOtp: async (email, otp) => {
                try {
                    set({ loading: true, error: null });
                    await authService.verifyOtp(email, otp);
                    set({ pendingEmail: null, loading: false });
                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "OTP verification failed",
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= RESEND OTP =================
            resendOtp: async (email) => {
                try {
                    set({ loading: true, error: null });
                    await authService.resendOtp(email);
                    set({ loading: false });
                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to resend OTP",
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= USER PROFILE =================
            getProfile: async () => {
                try {
                    set({ loading: true, error: null });
                    const data = await authService.getProfile();
                    set({ user: data.data, loading: false });
                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch profile",
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= ADMIN LOGIN =================
            adminLogin: async (email, password) => {
                try {
                    set({ loading: true, error: null });

                    const response = await authService.adminLogin(email, password);

                    // ✅ API returns:
                    // { success, message, data: { admin: {...}, access_token: "..." } }
                    // authService returns response.data (the full API body)
                    // so token is at: response.data.access_token
                    const accessToken = response.data.access_token;
                    const adminData = response.data.admin;

                    // ✅ Step 1 — save token to sessionStorage FIRST
                    sessionStorage.setItem("adminToken", accessToken);

                    // ✅ Step 2 — save to Zustand (persisted)
                    set({
                        adminToken: accessToken,
                        admin: adminData,
                        loading: false,
                    });

                    return true;

                } catch (error) {
                    sessionStorage.removeItem("adminToken");
                    set({
                        error: error instanceof Error ? error.message : "Admin login failed",
                        adminToken: null,
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= ADMIN PROFILE =================
            getAdminProfile: async () => {
                try {
                    set({ loading: true, error: null });
                    const data = await authService.getAdminProfile();
                    set({ admin: data.data, loading: false });
                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch admin profile",
                        loading: false,
                    });
                    return false;
                }
            },

            // ================= USER LOGOUT =================
            logout: async () => {
                try {
                    set({ loading: true, error: null });
                    await authService.logout();
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Logout failed",
                        loading: false,
                    });
                    return false;
                }
                sessionStorage.removeItem("token");
                set({
                    user: null,
                    admin: null,
                    loading: false,
                    error: null,
                    pendingEmail: null,
                });
                return true;
            },

            // ================= ADMIN LOGOUT =================
            adminLogout: async () => {
                try {
                    set({ loading: true, error: null });
                    await authService.adminLogout();
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Admin logout failed",
                        loading: false,
                    });
                    return false;
                }
                sessionStorage.removeItem("adminToken");
                set({
                    user: null,
                    admin: null,
                    adminToken: null,
                    loading: false,
                    error: null,
                    pendingEmail: null,
                });
                return true;
            },

            // ================= CLEAR ERROR =================
            clearError: () => set({ error: null }),
        }),

        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                user: state.user,
                admin: state.admin,
                adminToken: state.adminToken,
            }),
        }
    )
);

