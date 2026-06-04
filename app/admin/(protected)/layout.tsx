"use client";

import Sidebar from "@/components/admin/layout/Sidebar";
import Topbar from "@/components/admin/layout/Topbar";
import AdminDarkWrapper from "./adminwraper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("adminToken");
        if (!token) {
            router.replace("/admin/login");
        } else {
            setCheckingAuth(false);
        }
    }, [router]);

    const onMenuClick = () => setIsSidebarOpen((prev) => !prev);

    if (checkingAuth) {
        return (
            <div className="dark" style={{ colorScheme: "dark" }}>
                <div className="min-h-screen flex items-center justify-center bg-[#070B14]">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                        <p className="text-zinc-500 text-sm">Verifying session...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AdminDarkWrapper>
            <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">

                {/*
                 * SIDEBAR
                 * On desktop: always occupies 260px in the flex row
                 * On mobile: fixed/drawer (handled inside Sidebar component)
                 * lg:w-[260px] + lg:shrink-0 = reserves space in layout
                 * w-0 on mobile = takes no space in flex row (drawer is fixed)
                 */}
                <div className="w-0 lg:w-[260px] lg:shrink-0">
                    <Sidebar isSidebarOpen={isSidebarOpen} onMenuClick={onMenuClick} />
                </div>

                {/* CONTENT COLUMN */}
                <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                    <Topbar onMenuClick={onMenuClick} />
                    <main className="flex-1 overflow-y-auto min-h-0 bg-[#070B14]">
                        {children}
                    </main>
                </div>

            </div>
        </AdminDarkWrapper>
    );
}