"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { SignupFormData } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./auth.schema";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import PasswordInput from "./PasswordInput";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    onLoginClick?: () => void;
}

export default function SignupDialog({ open, onOpenChange, onSuccess, onLoginClick }: Props) {
    const [step, setStep] = useState<"signup" | "otp">("signup");
    const [otp, setOtp] = useState("");
    const signup = useAuthStore((s) => s.signup);
    const verifyOtp = useAuthStore((s) => s.verifyOtp);
    const resendOtp = useAuthStore((s) => s.resendOtp);
    const pendingEmail = useAuthStore((s) => s.pendingEmail);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);
    const clearError = useAuthStore((s) => s.clearError);



    const inputRef = useRef<HTMLInputElement>(null);
    const [resendTimer, setResendTimer] = useState(0);
    const [resendLoading, setResendLoading] = useState(false);

    // Setup resend timer countdown
    useEffect(() => {
        if (resendTimer <= 0) return;
        const interval = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [resendTimer]);

    // Auto-focus input when step changes to OTP
    useEffect(() => {
        if (step === "otp") {
            inputRef.current?.focus();
        }
    }, [step]);


    // const {
    //     signup,
    //     verifyOtp,
    //     resendOtp,
    //     pendingEmail,
    //     loading,
    //     error,
    //     clearError,
    // } = useAuthStore();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "all"
    })

    // const { register, handleSubmit, formState: { errors }, } = useForm<SignupFormData>({
    //     resolver:
    //         zodResolver(signupSchema),
    //     mode: "all"
    // });

    const onSubmit = async (values: SignupFormData) => {
        try {
            clearError();
            const success = await signup({
                name: values.name,
                email: values.email,
                password: values.password,
                referralCode: values.referralCode
            });
            // let success = true;
            if (success) {
                toast.success(
                    "OTP sent successfully"
                );
                setStep("otp");
            }
        }
        catch (err) {
            console.log(err);
            toast.error(
                "Something went wrong"
            );
        }
    }

    const handleVerifyOtp = async () => {
        try {
            clearError();

            const success = await verifyOtp(
                pendingEmail!,
                otp
            );
            // let success = true;

            if (success) {
                toast.success("OTP verified successfully");
                onSuccess?.();
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }

    // const handleResendOtp = async () => {
    //     if (!pendingEmail) return;

    //     try {
    //         await resendOtp(pendingEmail);
    //         toast.success("OTP resent successfully");
    //     }
    //     catch (err) {
    //         console.log(err);
    //         toast.error("Failed to resend OTP");
    //     }
    // }

    const { register, formState: { errors } } = form;

    const handleClose = (open: boolean) => {
        if (!open) {
            form.reset();

            setOtp("");

            setStep(
                "signup"
            );
            clearError();
        }
        onOpenChange(open);
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[400px] rounded-[28px] p-6">
                {/* SIGNUP STEP */}
                {step === "signup" && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center mb-3">
                                Create Account to predictx
                            </DialogTitle>
                            <DialogDescription className="text-center mb-2">
                                Signup to continue
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-0">
                            <div>
                                <Input
                                    placeholder="Full Name"
                                    {...register("name")}
                                    className="h-[46px] rounded-xl"
                                />

                                <p className="text-red-500 text-sm mt-0.2">
                                    {errors?.name?.message}
                                </p>
                            </div>
                            <div>
                                <Input placeholder="email"
                                    {...register("email")}
                                    onChange={(e) => {
                                        clearError();
                                        register("email")
                                            .onChange(e);
                                    }}
                                    className={cn(
                                        "h-[46px] rounded-xl",
                                        error && "border-red-500"
                                    )}
                                />
                                <p className="text-red-500 text-sm mt-0.2">
                                    {errors?.email?.message}
                                </p>
                            </div>
                            {/* PASSWORD */}
                            <div>
                                <PasswordInput
                                    {...register("password")}
                                />
                                <p className="text-red-500 text-sm mt-0.2">
                                    {errors?.password?.message}
                                </p>
                            </div>
                            {/* REFERRAL */}
                            <>
                                <Input
                                    placeholder="Referral Code"
                                    {...register(
                                        "referralCode"
                                    )}
                                    className="h-[54px] rounded-xl mb-0"
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

                            {/* GLOBAL API ERROR */}

                            {error && (
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-red-500 font-medium">
                                        {error}
                                    </p>
                                    {error === "This email is already registered" && (
                                        <button
                                            type="button"
                                            onClick={() => onLoginClick?.()}
                                            className="text-blue-500 font-semibold hover:underline cursor-pointer"
                                        >Login</button>
                                    )}
                                </div>

                            )}
                            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-md">
                                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-1 border-white mx-auto"></div> : "Submit"}
                            </button>
                        </form>
                    </>
                )}
                {/* OTP STEP */}

                {/* {step === "otp" && (
                    <>
                        <DialogHeader>

                            <DialogTitle>
                                Verify OTP
                            </DialogTitle>

                            <DialogDescription>
                                Enter the OTP sent
                                to{" "}
                                <span className="font-medium">
                                    {pendingEmail}
                                </span>
                            </DialogDescription>

                        </DialogHeader>

                        <div className="space-y-4">

                            <Input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                maxLength={6}
                            />

                            {error && (

                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            <Button
                                className="w-full"

                                onClick={
                                    handleVerifyOtp
                                }

                                disabled={
                                    loading ||
                                    otp.length <
                                    4
                                }
                            >

                                {loading ? (

                                    <>
                                        <Loader2
                                            className="mr-2 h-4 w-4 animate-spin"
                                        />

                                        Verifying...
                                    </>
                                ) : (
                                    "Verify OTP"
                                )}

                            </Button>

                            <Button
                                variant="outline"

                                className="w-full"

                                onClick={() =>
                                    resendOtp(
                                        pendingEmail!
                                    )
                                }

                                disabled={
                                    loading
                                }
                            >
                                Resend OTP
                            </Button>

                        </div>

                    </>
                )} */}

                {step === "otp" && (
                    <>
                        <DialogHeader className="space-y-3">
                            <DialogTitle className="text-2xl font-bold text-center">
                                Verify Your Email
                            </DialogTitle>
                            <DialogDescription className="text-center text-sm">
                                We sent a 6-digit code to
                                <span className="block font-semibold text-foreground mt-1">
                                    {pendingEmail}
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 space-y-5">
                            {/* OTP INPUT BOXES */}
                            <div className="space-y-4">
                                <div className="flex gap-2 justify-center">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <div
                                            key={index}
                                            onClick={() => inputRef.current?.focus()}
                                            className={`w-12 h-14 flex items-center justify-center rounded-lg border-2 transition-all duration-200 cursor-text select-none
                                                ${otp[index]
                                                    ? "border-blue-500 bg-blue-50"
                                                    : error
                                                        ? "border-red-300 bg-red-50"
                                                        : "border-gray-300 bg-white hover:border-gray-400"
                                                }
                                                ${loading ? "opacity-60" : ""}`}
                                        >
                                            <span className="text-xl font-bold text-gray-900">
                                                {otp[index] || ""}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {/* Hidden Input */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    inputMode="numeric"
                                    value={otp}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                                        setOtp(value);
                                        clearError();
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter" && otp.length === 6) {
                                            handleVerifyOtp();
                                        }
                                    }}
                                    maxLength={6}
                                    disabled={loading || resendTimer > 0}
                                    placeholder="Enter OTP"
                                    className="absolute opacity-0 w-0 h-0 pointer-events-none"
                                    aria-label="OTP input"
                                />

                                {/* Error Message */}
                                {error && (
                                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200 mt-2">
                                        <svg
                                            className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                )}

                                {/* Info Message */}
                                {otp.length < 6 && !error && (
                                    <p className="text-xs text-gray-500 text-center mt-2">
                                        {otp.length}/6 digits entered
                                    </p>
                                )}
                            </div>

                            {/* VERIFY BUTTON */}
                            <Button
                                className="w-full h-12 rounded-lg text-base font-semibold transition-all duration-200"
                                onClick={handleVerifyOtp}
                                disabled={loading || otp.length < 6}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify OTP"
                                )}
                            </Button>

                            {/* RESEND SECTION */}
                            <div className="text-center space-y-3 pt-2 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    {resendTimer > 0
                                        ? `Resend code in ${resendTimer}s`
                                        : "Didn't receive the code?"}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setResendLoading(true);
                                        resendOtp(pendingEmail!)
                                            .then((success) => {
                                                if (success) {
                                                    setResendTimer(60);
                                                    setOtp("");
                                                    inputRef.current?.focus();
                                                }
                                            })
                                            .catch((err) => {
                                                console.error(err);
                                                // Fail-safe if the promise rejects rather than returning false
                                                toast.error("Failed to resend OTP");
                                            })
                                            .finally(() => setResendLoading(false));
                                    }}
                                    disabled={resendTimer > 0 || resendLoading || loading}
                                    className={`text-sm font-semibold transition-colors duration-200 ${resendTimer > 0 || resendLoading || loading
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-blue-600 hover:text-blue-700 active:text-blue-800"
                                        }`}
                                >
                                    {resendLoading ? "Resending..." : "Resend OTP"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog >
    );
}