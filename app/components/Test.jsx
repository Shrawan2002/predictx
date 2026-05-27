"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";


export default function Test() {

    const user =
        useAuthStore((s) => s.user);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return null;
}