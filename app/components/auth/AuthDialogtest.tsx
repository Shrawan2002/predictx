"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

import AuthForm from "./AuthForm";

import GoogleButton from "./GoogleButton";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Props {
    type: "login" | "signup";

    open: boolean;

    onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ type, open, onOpenChange }: Props) {

    const [currentType, setCurrentType] = useState(type);

    useEffect(() => {
        setCurrentType(type);
    }, [type]);

    const isLogin = currentType === "login";

    const [signupSuccess, setSignupSuccess] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-[520px] rounded-[28px] p-6">
                <DialogTitle className="hidden">
                    Auth
                </DialogTitle>

                <h1 className="text-2xl font-bold text-center">
                    Welcome to PredictX
                </h1>

                {!signupSuccess && (
                    <>
                        <div className="mt-4">
                            <GoogleButton />
                        </div>

                        <div className="flex items-center gap-4 my-1">
                            <div className="h-px flex-1 bg-border" />

                            <span className="text-sm text-muted-foreground">
                                OR
                            </span>

                            <div className="h-px flex-1 bg-border" />
                        </div>
                    </>
                )}

                {signupSuccess && !isLogin ? (

                    <div className="py-10 text-center">

                        <div
                            className="
                                w-20
                                h-20
                                mx-auto
                                rounded-full
                                bg-green-500/10
                                flex
                                items-center
                                justify-center
                                mb-5
                            "
                        >
                            <span className="text-4xl">
                                ✅
                            </span>
                        </div>

                        <h2
                            className="
                                text-2xl
                                font-bold
                            "
                        >
                            Account Created Successfully
                        </h2>

                        <p
                            className="
                                text-muted-foreground
                                mt-2
                                text-sm
                            "
                        >
                            Please login to continue.
                        </p>

                        <Button
                            onClick={() => {

                                setSignupSuccess(false);
                                setCurrentType("login")
                            }}
                            className="
                                mt-6
                                h-[50px]
                                px-8
                                rounded-xl
                            "
                        >
                            Continue
                        </Button>
                    </div>

                ) : (

                    <AuthForm
                        isLogin={isLogin}
                        onSignupSuccess={() => setSignupSuccess(true)}
                        onOpenChange={() => onOpenChange(false)}
                    />

                )}
            </DialogContent>
        </Dialog>
    );
}