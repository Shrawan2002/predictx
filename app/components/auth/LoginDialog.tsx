"use client"

import { useForm } from "react-hook-form";
import { LoginFormData } from "./auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./auth.schema";
import { useAuthStore } from "@/store/authStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";
import { Input } from "../ui/input";
import PasswordInput from "./PasswordInput";
import { Button } from "../ui/button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export default function LoginDialog({ open, onOpenChange }: Props) {

    const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "all"
    })

    const login = useAuthStore((state) => state.login);
    const error = useAuthStore((state) => state.error);
    const loading = useAuthStore((state) => state.loading);
    const clearError = useAuthStore((state) => state.clearError);

    const onSubmit = async (data: LoginFormData) => {
        try {
            clearError();
            const success = await login(data.email, data.password);
            if (success) {
                toast.success("Logged in successfully");
                onOpenChange(false);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                clearError();
            }
            onOpenChange(open);
        }}>
            <DialogContent className="max-w-[520px] rounded-[28px] p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-4">
                        welcome to PredictX
                    </DialogTitle>
                </DialogHeader >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <Input placeholder="email" {...register("email")} className="h-[46px] rounded-xl" />
                        <p className="text-red-500 text-sm mt-0.2">{errors?.email?.message}</p>
                    </div>
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
                    {/* GLOBAL API ERROR */}

                    {error && (
                        <p className="text-sm text-red-500 font-medium">
                            {error}
                        </p>
                    )}
                    <Button disabled={loading} className="w-full h-[46px] rounded-xl bg-blue-500/80 hover:bg-blue-500/90 mt-4">
                        {loading
                            ? "Loading..."
                            : "Login"
                        }
                    </Button>
                </form>
            </DialogContent >
        </Dialog >
    )

}