import { apiFetch } from "@/lib/api";

interface SignupPayload {
    name: string;
    email: string;
    password: string;
    referralCode?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthResponse {
    data: {
        user: User;
        access_token: string;
    };
}

export const authService = {

    // ======================
    // LOGIN
    // ======================

    login: async (
        email: string,
        password: string
    ): Promise<AuthResponse> => {

        return apiFetch(
            "/auth/login",
            {
                method: "POST",

                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );
    },

    // ======================
    // SIGNUP
    // ======================

    signup: async (
        payload: SignupPayload
    ): Promise<{
        message: string;
    }> => {

        return apiFetch(
            "/auth/register",
            {
                method: "POST",

                body: JSON.stringify(
                    payload
                ),
            }
        );
    },

    // ======================
    // VERIFY OTP
    // ======================

    verifyOtp: async (
        email: string,
        otp: string
    ): Promise<AuthResponse> => {

        return apiFetch(
            "/auth/verify-register-otp",
            {
                method: "POST",

                body: JSON.stringify({
                    email,
                    otp,
                }),
            }
        );
    },

    // ======================
    // RESEND OTP
    // ======================

    resendOtp: async (
        email: string
    ): Promise<{
        message: string;
    }> => {

        return apiFetch(
            "/auth/resend-otp",
            {
                method: "POST",

                body: JSON.stringify({
                    email,
                }),
            }
        );
    },

    // ======================
    // LOGOUT
    // ======================

    // logout: async (): Promise<void> => {

    //     return apiFetch(
    //         "/auth/logout",
    //         {
    //             method: "POST",
    //         }
    //     );
    // },
};