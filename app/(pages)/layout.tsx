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
        <div className="bg-background text-foreground min-h-screen flex flex-col transition-colors duration-300">

            {/* HEADER */}
            <Header onMenuClick={() => setOpen(true)} />

            {/* SIDEBAR */}
            <Sidebar open={open} onClose={() => setOpen(false)} />

            {/* MAIN */}
            <main className="flex-1 pt-[70px] md:ml-[170px] px-12 md:px-20 pb-6">
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