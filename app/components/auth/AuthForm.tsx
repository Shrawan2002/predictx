"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    signupSchema,
    LoginFormData,
    SignupFormData,
} from "./auth.schema";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import PasswordInput from "./PasswordInput";

import { toast } from "sonner";

import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

interface Props {
    isLogin: boolean;
    onSignupSuccess?: () => void;
    onOpenChange?: () => void;
}

export default function AuthForm({
    isLogin,
    onSignupSuccess,
    onOpenChange
}: Props) {
    const schema = isLogin
        ? loginSchema
        : signupSchema;

    const {
        login,
        signup,
        loading,
    } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<
        LoginFormData & SignupFormData
    >({
        resolver:
            zodResolver(schema) as any,
        mode: "all"
    });

    const onSubmit = async (
        data:
            LoginFormData & SignupFormData
    ) => {
        let success = false;

        if (isLogin) {
            // success = await login(
            //     data.email,
            //     data.password
            // );
            success = true;
        } else {
            success = await signup(
                data.name,
                data.email,
                data.password,
                data.referralCode
            );
        }

        if (success) {
            /* LOGIN */

            if (isLogin) {
                toast.success(
                    "Login Success"
                );

                onOpenChange?.();

                redirect("/sports")
            }
            /* SIGNUP */

            else {

                toast.success(
                    "Account Created Successfully"
                );

                onSignupSuccess?.();
            }
        } else {
            toast.error(
                "Something went wrong"
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(
                onSubmit
            )}
            className="space-y-3  mt-0"
        >
            {/* NAME */}

            {!isLogin && (
                <div>
                    <Input
                        placeholder="Full Name"
                        {...register(
                            "name"
                        )}
                        className="h-[46px] rounded-xl"
                    />

                    <p className="text-red-500 text-sm mt-0.2">
                        {
                            errors?.name
                                ?.message
                        }
                    </p>
                </div>
            )}

            {/* EMAIL */}

            <div>
                <Input
                    placeholder="Email"
                    {...register(
                        "email"
                    )}
                    className="h-[46px] rounded-xl"
                />

                <p className="text-red-500 text-sm mt-0.2">
                    {
                        errors?.email
                            ?.message
                    }
                </p>
            </div>

            {/* PASSWORD */}

            <div>
                <PasswordInput
                    {...register("password")}
                />

                <p className="text-red-500 text-sm mt-0.2">
                    {
                        errors?.password
                            ?.message
                    }
                </p>
            </div>

            {/* REMEMBER */}

            {isLogin && (
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register(
                                "remember"
                            )}
                        />

                        Remember me
                    </label>

                    <button
                        type="button"
                        className="text-sm text-blue-500"
                    >
                        Forgot Password?
                    </button>
                </div>
            )}

            {/* REFERRAL */}

            {!isLogin && (
                <>
                    <Input
                        placeholder="Referral Code"
                        {...register(
                            "referralCode"
                        )}
                        className="h-[54px] rounded-xl"
                    />

                    <div className="flex flex-col gap-1 my-1">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("termsAccepted")}
                            />
                            <span>
                                I accept the{" "}
                                <span className="text-blue-500 hover:underline font-semibold">
                                    Terms & Conditions
                                </span>
                            </span>
                        </label>
                        {errors.termsAccepted && (
                            <p className="text-red-500 text-xs">
                                {errors.termsAccepted.message}
                            </p>
                        )}
                    </div>
                </>
            )}

            {/* BUTTON */}

            <Button
                disabled={loading}
                className="
                    w-full
                    h-[54px]
                    rounded-xl
                "
            >
                {loading
                    ? "Loading..."
                    : isLogin
                        ? "Login"
                        : "Create Account"}
            </Button>
        </form>
    );
}