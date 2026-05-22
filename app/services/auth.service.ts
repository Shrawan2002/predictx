import { apiFetch } from "@/lib/api";

export const authService = {
    login: async (email: string, password: string) => {
        return apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })
    },

    signup: async (name: string, email: string, password: string, referralCode?: string) => {
        return apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password, referralCode })
        })
    },

    logout: async () => {
        return apiFetch("/auth/logout", {
            method: "POST"
        })
    }
}