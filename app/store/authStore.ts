"use client";

import { create } from "zustand";

import {
    persist,
    createJSONStorage,
} from "zustand/middleware";

import {
    authService,
    User,
    AdminUser,
} from "@/services/auth.service";

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

interface AuthState {

    // ================= STATE =================

    user: User | null;

    admin: AdminUser | null;

    loading: boolean;

    error: string | null;

    pendingEmail: string | null;

    // ================= USER =================

    login: (
        email: string,
        password: string
    ) => Promise<boolean>;

    signup: (
        payload: SignupPayload
    ) => Promise<boolean>;

    verifyOtp: (
        email: string,
        otp: string
    ) => Promise<boolean>;

    resendOtp: (
        email: string
    ) => Promise<boolean>;

    getProfile: () => Promise<boolean>;

    logout: () => Promise<boolean>;

    // ================= ADMIN =================

    adminLogin: (
        email: string,
        password: string
    ) => Promise<boolean>;

    getAdminProfile: () => Promise<boolean>;

    adminLogout: () => Promise<boolean>;

    // ================= COMMON =================

    clearError: () => void;
}

export const useAuthStore =
    create<AuthState>()(
        persist(

            (set) => ({

                // ================= INITIAL STATE =================

                user: null,

                admin: null,

                loading: false,

                error: null,

                pendingEmail: null,

                // ================= USER LOGIN =================

                login: async (
                    email,
                    password
                ) => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        const data =
                            await authService.login(
                                email,
                                password
                            );

                        // STORE TOKEN
                        sessionStorage.setItem(
                            "token",
                            data.data.access_token
                        );

                        // FETCH PROFILE
                        const profile =
                            await authService.getProfile();

                        set({
                            user: profile.data,
                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Login failed",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= SIGNUP =================

                signup: async (
                    payload
                ) => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        await authService.signup(
                            payload
                        );

                        set({
                            pendingEmail:
                                payload.email,

                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Signup failed",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= VERIFY OTP =================

                verifyOtp: async (
                    email,
                    otp
                ) => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        await authService.verifyOtp(
                            email,
                            otp
                        );

                        set({
                            pendingEmail: null,
                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "OTP verification failed",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= RESEND OTP =================

                resendOtp: async (
                    email
                ) => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        await authService.resendOtp(
                            email
                        );

                        set({
                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Failed to resend OTP",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= USER PROFILE =================

                getProfile: async () => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        const data =
                            await authService.getProfile();

                        set({
                            user: data.data,
                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Failed to fetch profile",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= ADMIN LOGIN =================

                adminLogin: async (
                    email,
                    password
                ) => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        const data =
                            await authService.adminLogin(
                                email,
                                password
                            );

                        // STORE ADMIN TOKEN
                        sessionStorage.setItem(
                            "adminToken",
                            data.data.access_token
                        );

                        // FETCH ADMIN PROFILE
                        const adminProfile =
                            await authService.getAdminProfile();

                        set({
                            admin:
                                adminProfile.data,

                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Admin login failed",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= ADMIN PROFILE =================

                getAdminProfile: async () => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        const data =
                            await authService.getAdminProfile();

                        set({
                            admin:
                                data.data,

                            loading: false,
                        });

                        return true;

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Failed to fetch admin profile",

                            loading: false,
                        });

                        return false;
                    }
                },

                // ================= USER LOGOUT =================

                logout: async () => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        await authService.logout();

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Logout failed",

                            loading: false,
                        });

                        return false;
                    }

                    // REMOVE TOKEN
                    sessionStorage.removeItem(
                        "token"
                    );

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

                        set({
                            loading: true,
                            error: null,
                        });

                        await authService.adminLogout();

                    } catch (error) {

                        set({
                            error:
                                error instanceof Error
                                    ? error.message
                                    : "Admin logout failed",

                            loading: false,
                        });

                        return false;
                    }

                    // REMOVE ADMIN TOKEN
                    sessionStorage.removeItem(
                        "adminToken"
                    );

                    set({
                        user: null,
                        admin: null,
                        loading: false,
                        error: null,
                        pendingEmail: null,
                    });

                    return true;
                },

                // ================= CLEAR ERROR =================

                clearError: () => {

                    set({
                        error: null,
                    });
                },

            }),

            // ================= PERSIST =================

            {
                name: "auth-storage",

                storage: createJSONStorage(
                    () => sessionStorage
                ),

                partialize: (state) => ({

                    user: state.user,

                    admin: state.admin,

                }),
            }
        )
    );