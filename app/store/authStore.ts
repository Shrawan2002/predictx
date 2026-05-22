"use client";

import { create } from "zustand";
import { authService } from "@/services/auth.service";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;

    loading: boolean;
    error: string | null;

    isAuthenticated: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<boolean>;

    signup: (
        name: string,
        email: string,
        password: string,
        referralCode?: string
    ) => Promise<boolean>;

    logout: () => Promise<void>;

    clearError: () => void;
}

export const useAuthStore =
    create<AuthState>((set) => ({
        user: { name: "shrawan", email: "shrawan@gmail.com", id: "A" },

        loading: false,
        error: null,

        isAuthenticated: false,

        /* LOGIN */

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

                set({
                    user: data.user,
                    isAuthenticated: true,
                    loading: false,
                });

                return true;
            } catch (error: any) {
                set({
                    error: error.message,
                    loading: false,
                });

                return false;
            }
        },

        /* SIGNUP */

        signup: async (
            name,
            email,
            password,
            referralCode
        ) => {
            try {
                set({
                    loading: true,
                    error: null,
                });

                const data =
                    await authService.signup(
                        name,
                        email,
                        password,
                        referralCode,
                    );

                set({
                    user: data.user,
                    isAuthenticated: true,
                    loading: false,
                });

                return true;
            } catch (error: any) {
                set({
                    error: error.message,
                    loading: false,
                });

                return false;
            }
        },

        /* LOGOUT */

        logout: async () => {
            await authService.logout();

            set({
                user: null,
                isAuthenticated: false,
            });
        },

        clearError: () => {
            set({
                error: null,
            });
        },
    }));