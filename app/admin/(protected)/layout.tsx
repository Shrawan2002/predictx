// "use client";

// import Sidebar from "@/components/admin/layout/Sidebar";
// import Topbar from "@/components/admin/layout/Topbar";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function DashboardLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {

//     const router = useRouter();
//     const adminToken = sessionStorage.getItem("adminToken");

//     useEffect(() => {

//         if (!adminToken) {
//             router.replace(
//                 "/admin/login"
//             );
//         }

//     }, [adminToken, router]);

//     // Prevent flash
//     if (!adminToken) {
//         return null;
//     }

//     return (
//         // ✅ Root: full viewport height, no overflow
//         <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">

//             {/* ✅ Sidebar: fixed height, internal scroll handled inside Sidebar component */}
//             <Sidebar />

//             {/* ✅ Right column: fills remaining width, stacks topbar + main vertically */}
//             <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

//                 {/* ✅ Topbar: sticky at top, never scrolls away */}
//                 <Topbar />

//                 {/* ✅ Main: only this area scrolls */}
//                 <main className="flex-1 overflow-y-auto p-6">
//                     {children}
//                 </main>

//             </div>

//         </div>
//     );
// }


"use client";

import Sidebar from "@/components/admin/layout/Sidebar";
import Topbar from "@/components/admin/layout/Topbar";

import { useRouter } from "next/navigation";

import {
    useEffect,
    useState,
} from "react";
import AdminDarkWrapper from "./adminwraper";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // SAFE:
        // runs only in browser
        const adminToken = sessionStorage.getItem("adminToken");

        if (!adminToken) {
            router.replace("/admin/login");
        } else {
            setIsAuthenticated(true);
        }

        setLoading(false);

    }, [router]);

    // LOADING SCREEN
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#070B14] text-white">
                Loading...
            </div>
        );
    }

    // PREVENT FLASH
    if (!isAuthenticated) {
        return null;
    }

    const onMenuClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        // ROOT
        <AdminDarkWrapper>
            <div className="flex h-screen overflow-hidden bg-[#070B14] text-white">

                {/* SIDEBAR */}
                <Sidebar isSidebarOpen={isSidebarOpen} onMenuClick={onMenuClick} />

                {/* RIGHT SIDE */}
                <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

                    {/* TOPBAR */}
                    <Topbar onMenuClick={onMenuClick} />

                    {/* MAIN CONTENT */}
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>

                </div>

            </div>
        </AdminDarkWrapper>
    );
}