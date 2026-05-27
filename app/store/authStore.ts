"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { authService } from "@/services/auth.service";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

// const demoUser: User = {
//     name: "vigyan",
//     id: "A",
//     email: "shrawankumar@gmail.com",
// }

// const demotoken = "aqewnkn"

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

interface AuthResponse {
    data: {
        user: User;
        access_token: string;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    pendingEmail: string | null;
    count: number;
    increment: () => void;
    decrement: () => void;
    //action

    signup: (payload: SignupPayload) => Promise<boolean>;

    verifyOtp: (
        email: string,
        otp: string
    ) => Promise<boolean>;

    resendOtp: (
        email: string
    ) => Promise<boolean>;


    login: (
        email: string,
        password: string
    ) => Promise<boolean>;

    logout: () => Promise<void>;

    clearError: () => void;
}

export const useAuthStore =
    create<AuthState>()(
        persist(
            (set) => ({
                user: null,
                token: null,
                loading: false,
                error: null,
                pendingEmail: null,
                count: 0,

                increment: () => set((state) => ({
                    count: state.count + 1
                })),

                decrement: () => set((state) => ({
                    count: state.count - 1
                })),

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

                        console.log("data", data);

                        set({
                            user: data.data.user,

                            token:
                                data.data
                                    .access_token,

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
                // VERIFY OTP
                verifyOtp: async (
                    email,
                    otp
                ) => {

                    try {

                        set({
                            loading: true,
                            error: null,
                        });

                        const data:
                            AuthResponse =
                            await authService.verifyOtp(
                                email,
                                otp
                            );

                        set({
                            // user: data.user,
                            // token: data.token,
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

                // logout: async () => {

                //     try {
                //         await authService.logout();
                //     } finally {

                //         set({
                //             user: null,
                //             token: null,
                //             loading: false,
                //             error: null,
                //         });

                //     }
                // },

                logout: async () => {

                    set({
                        user: null,
                        token: null,
                        loading: false,
                        error: null,
                        pendingEmail: null,
                    });
                },

                clearError: () => {
                    set({
                        error: null,
                    });
                },

            }),

            {
                name: "auth-storage",

                storage: createJSONStorage(
                    () => sessionStorage
                ),

                partialize: (state) => ({
                    user: state.user,
                    token: state.token,
                    count: state.count,
                }),
            }
        )
    );