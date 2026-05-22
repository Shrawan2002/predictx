"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

export default function GoogleButton() {
    const handleGoogleLogin =
        () => {
            console.log(
                "Google Login"
            );
        };

    return (
        <Button
            onClick={
                handleGoogleLogin
            }
            variant="outline"
            className="
                w-full
                h-[56px]
                rounded-xl
                text-base
                font-semibold
            "
        >
            <FcGoogle className="mr-3 text-xl" />

            Continue with Google
        </Button>
    );
}