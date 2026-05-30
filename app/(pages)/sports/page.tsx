"use client";
import { useAuthStore } from "@/store/authStore";
export default function SportPage() {
    const profile = useAuthStore((s) => s.user);
    return (
        <div>
            <h1>Sport Page</h1>
            <p>{profile?.name}</p>
            <p>{profile?.email}</p>
            <p>{profile?.id}</p>
            <p>{profile?.avatar}</p>
            <p>{profile?.referralCode}</p>
            <p>{profile?.referredBy}</p>
            <p>{profile?.createdAt}</p>
        </div>
    )
}
