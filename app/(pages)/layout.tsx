"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { TabProvider } from "@/context/tabContext";

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-[#15191d] text-white min-h-screen flex flex-col">

            {/* HEADER */}
            <Header onMenuClick={() => setOpen(true)} />

            {/* SIDEBAR */}
            <Sidebar open={open} onClose={() => setOpen(false)} />

            {/* MAIN */}
            <main className="flex-1 pt-[112px] md:ml-[170px]  p-4 md:p-20  ">
                <TabProvider>
                    {children}
                </TabProvider>
            </main>
            <div className="md:ml-[170px]">
                <Footer />
            </div>
        </div>
    );
}