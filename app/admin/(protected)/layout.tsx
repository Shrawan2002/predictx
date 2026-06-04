"use client";

import Sidebar from "@/components/admin/layout/Sidebar";
import Topbar from "@/components/admin/layout/Topbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminDarkWrapper from "./adminwraper";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const onMenuClick = () => setIsSidebarOpen(!isSidebarOpen);
    const [checkingAuth, setCheckingAuth] =
        useState(true);

    // ================= AUTH CHECK =================

    useEffect(() => {

        const token =
            sessionStorage.getItem(
                "adminToken"
            );

        if (!token) {
            router.replace(
                "/admin/login"
            );
        } else {
            setCheckingAuth(false);
        }

    }, [router]);

    // ================= LOADER =================

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050816]">
                <p className="text-white text-sm">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <AdminDarkWrapper>
            <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">

                <Sidebar isSidebarOpen={isSidebarOpen} onMenuClick={onMenuClick} />

                <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

                    {/* Topbar — always fixed at top, never scrolls */}
                    <Topbar onMenuClick={onMenuClick} />

                    {/* ✅ Main content — scrolls BELOW the topbar */}
                    <main className="flex-1 overflow-y-auto min-h-0">
                        {children}
                    </main>

                </div>

            </div>
        </AdminDarkWrapper>
    );
}