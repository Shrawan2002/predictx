"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { TabProvider } from "@/context/tabContext";
import { useUserEventStore } from "@/store/user/userEventStore";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const fetchCategories = useUserEventStore((state) => state.fetchCategories);
    const fetchUserEvents = useUserEventStore((state) => state.getAllUserEvents);
    useEffect(() => {
        fetchCategories()
        fetchUserEvents()
    }, [fetchCategories, fetchUserEvents])
    return (
        <div className="bg-background text-foreground flex flex-col transition-colors duration-300">
            {/* HEADER */}
            <Header onMenuClick={() => setOpen(true)} />
            {/* SIDEBAR */}
            {/* <Sidebar open={open} onClose={() => setOpen(false)} /> */}

            {/* MAIN */}
            {/* <main className="flex-1 pt-[40px] md:ml-[170px] px-12 md:px-20 pb-6 bg-white"> */}
            <main className="flex-1 pt-[30px]  px-12 md:px-20 pb-6 bg-white">
                <TabProvider>
                    {children}
                </TabProvider>
            </main>
            {/* <div className="md:ml-[170px]"> */}
            <div className="">
                <Footer />
            </div>
        </div>
    );
}