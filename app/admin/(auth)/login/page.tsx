"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
    AdminLoginData,
    adminLoginSchema,
} from "@/components/admin/admin.schema";

import { useAuthStore } from "@/store/authStore";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] =
        useState(false);

    const [checkingAuth, setCheckingAuth] =
        useState(true);

    // ================= AUTH CHECK =================

    useEffect(() => {

        const token =
            sessionStorage.getItem(
                "adminToken"
            );

        if (token) {
            router.replace(
                "/admin/dashboard"
            );
        } else {
            setCheckingAuth(false);
        }

    }, [router]);

    // ================= STORE =================

    const clearError =
        useAuthStore(
            (s) => s.clearError
        );

    const loading =
        useAuthStore(
            (s) => s.loading
        );

    const error =
        useAuthStore(
            (s) => s.error
        );

    const adminLogin =
        useAuthStore(
            (s) => s.adminLogin
        );

    // ================= FORM =================

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AdminLoginData>({
        resolver: zodResolver(
            adminLoginSchema
        ),
        mode: "all",
    });

    // ================= SUBMIT =================

    const onSubmit = async (
        data: AdminLoginData
    ) => {

        clearError();

        const success =
            await adminLogin(
                data.email,
                data.password
            );

        if (success) {

            toast.success(
                "Admin logged in successfully"
            );

            router.replace(
                "/admin/dashboard"
            );
        }
    };

    // ================= LOADER =================

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050816]">
                <p className="text-white text-sm">
                    Checking session...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050816] flex items-center justify-center px-4">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full" />

            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">

                        <ShieldCheck className="text-white w-8 h-8" />

                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white">
                        PredictX Admin
                    </h1>

                    <p className="text-gray-400 text-sm mt-2 text-center">
                        Secure access to the admin dashboard
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>

                        <Input
                            placeholder="Enter your email"
                            {...register("email")}
                            className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {
                                errors?.email
                                    ?.message
                            }
                        </p>

                    </div>

                    {/* Password */}
                    <div>

                        <div className="relative">

                            <Input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                {...register("password")}
                                className="
                                    h-12
                                    rounded-2xl
                                    border-white/10
                                    bg-white/5
                                    text-white
                                    caret-white
                                    placeholder:text-gray-400
                                    pr-12
                                    focus-visible:ring-2
                                    focus-visible:ring-blue-500
                                "
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    hover:text-white
                                    transition-colors
                                "
                            >

                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}

                            </button>

                        </div>

                        <p className="text-red-500 text-sm mt-1">
                            {
                                errors?.password
                                    ?.message
                            }
                        </p>

                    </div>

                    {/* Remember */}
                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-2 text-sm text-gray-300">

                            <input
                                type="checkbox"
                                {...register(
                                    "remember"
                                )}
                                className="rounded border-white/20 bg-transparent"
                            />

                            Remember me

                        </label>

                    </div>

                    {/* API Error */}
                    {error && (

                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                            <p className="text-sm text-red-400 font-medium">
                                {error}
                            </p>

                        </div>

                    )}

                    {/* Button */}
                    <Button
                        disabled={loading}
                        className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all duration-300"
                    >

                        {loading
                            ? "Signing in..."
                            : "Login to Dashboard"}

                    </Button>

                </form>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">

                    <p className="text-xs text-gray-500">
                        Protected by enterprise-grade security
                    </p>

                </div>

            </div>

        </div>
    );
}