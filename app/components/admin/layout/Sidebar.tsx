"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
    LayoutDashboard, TrendingUp, BookOpen, Activity,
    Users, AlertTriangle, Wallet, Landmark,
    BarChart3, ShieldAlert, Settings, FileText,
    LogOut, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navSections = [
    {
        title: "CORE",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
            { label: "Markets", icon: TrendingUp, badge: 142, badgeColor: "emerald", href: "/admin/markets" },
            { label: "Categories", icon: TrendingUp, badge: 142, badgeColor: "emerald", href: "/admin/categories" },
            { label: "Order Books", icon: BookOpen, href: "/admin/order-books" },
            { label: "Live Trades", icon: Activity, href: "/admin/live-trades" },
        ],
    },
    {
        title: "USERS",
        items: [
            { label: "Users", icon: Users, href: "/admin/users" },
            { label: "Disputes", icon: AlertTriangle, badge: 3, badgeColor: "rose", href: "/admin/disputes" },
        ],
    },
    {
        title: "FINANCE",
        items: [
            { label: "Withdrawals", icon: Wallet, badge: 7, badgeColor: "amber", href: "/admin/withdrawals" },
            { label: "Treasury", icon: Landmark, href: "/admin/treasury" },
        ],
    },
    {
        title: "INTELLIGENCE",
        items: [
            { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
            { label: "Risk Engine", icon: ShieldAlert, href: "/admin/risk" },
        ],
    },
    {
        title: "SYSTEM",
        items: [
            { label: "Settings", icon: Settings, href: "/admin/settings" },
            { label: "Audit Logs", icon: FileText, href: "/admin/audit" },
        ],
    },
];

const badgeStyles: Record<string, string> = {
    emerald: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30",
    rose: "bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30",
    amber: "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30",
};

export default function Sidebar({ isSidebarOpen, onMenuClick }: { isSidebarOpen: boolean; onMenuClick: () => void }) {
    const pathname = usePathname();
    const [loggingOut, setLoggingOut] = useState(false);
    const router = useRouter();
    const admin = useAuthStore(s => s.admin);
    const adminLogout = useAuthStore(s => s.adminLogout);

    const handleLogout = async () => {
        setLoggingOut(true);
        await adminLogout();
        if (window.innerWidth < 768) {
            onMenuClick();
        }
        router.replace("/admin/login");

    };

    // Initials from admin name
    const initials = admin?.name
        ? admin.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
        : "AD";

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={onMenuClick}
                />
            )}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-[240px] flex flex-col shrink-0 overflow-hidden transition-transform duration-300",
                    isSidebarOpen ? "translate-x-0 z-900 backdrop-blur-2xl" : "-translate-x-full",
                    "md:translate-x-0 md:static"
                )}
                style={{
                    background: "linear-gradient(180deg, #0a0d14 0%, #080b11 100%)",
                }}
            >
                {/* Subtle left accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-cyan-500/30 to-transparent" />

                {/* Right border */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/5 to-transparent" />

                {/* Ambient glow top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* ── LOGO ── */}
                <div className="shrink-0 flex items-center gap-3 px-5 pt-6 pb-5">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-wider"
                            style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}
                        >
                            PX
                        </div>
                        {/* Glow behind logo */}
                        <div className="absolute inset-0 rounded-lg bg-cyan-500/30 blur-md -z-10" />
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm tracking-tight leading-none">PredictX</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 tracking-widest uppercase">Admin Console</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-linear-to-r from-transparent via-white/8 to-transparent mb-3 shrink-0" />
                {/* ── NAV ── */}
                <ScrollArea className="flex-1 overflow-hidden">
                    <style>{`[data-radix-scroll-area-scrollbar]{display:none!important}`}</style>
                    <nav className="px-3 pb-4 space-y-5">
                        {navSections.map((section) => (
                            <div key={section.title}>
                                <p className="px-3 mb-2 text-[9px] font-bold tracking-[0.15em] text-slate-600 uppercase">
                                    {section.title}
                                </p>
                                <ul className="space-y-0.5">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.label}>
                                                <button
                                                    onClick={() => {
                                                        router.push(item.href);
                                                        if (window.innerWidth < 768) {
                                                            onMenuClick();
                                                        }
                                                    }}
                                                    className={cn(
                                                        "group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative",
                                                        isActive
                                                            ? "text-white"
                                                            : "text-slate-500 hover:text-slate-200"
                                                    )}
                                                >
                                                    {/* Active background */}
                                                    {isActive && (
                                                        <span
                                                            className="absolute inset-0 rounded-xl"
                                                            style={{
                                                                background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.1))",
                                                                border: "1px solid rgba(6,182,212,0.15)",
                                                            }}
                                                        />
                                                    )}

                                                    {/* Hover background */}
                                                    {!isActive && (
                                                        <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-200" />
                                                    )}

                                                    {/* Active left indicator */}
                                                    {isActive && (
                                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
                                                    )}

                                                    {/* Icon */}
                                                    <span className={cn(
                                                        "relative z-10 flex items-center justify-center w-[18px] h-[18px] shrink-0 transition-colors duration-200",
                                                        isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                                                    )}>
                                                        <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
                                                    </span>

                                                    {/* Label */}
                                                    <span className="relative z-10 flex-1 text-left font-medium text-[13px] tracking-tight">
                                                        {item.label}
                                                    </span>

                                                    {/* Badge */}
                                                    {item.badge !== undefined && (
                                                        <span className={cn(
                                                            "relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-md tabular-nums",
                                                            badgeStyles[item.badgeColor ?? "emerald"]
                                                        )}>
                                                            {item.badge}
                                                        </span>
                                                    )}

                                                    {/* Chevron on active */}
                                                    {isActive && (
                                                        <ChevronRight size={12} className="relative z-10 text-cyan-500/60 shrink-0" />
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </ScrollArea>

                {/* Divider */}
                <div className="mx-4 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent shrink-0" />

                {/* ── FOOTER ── */}
                <div className="shrink-0 p-3">
                    {/* User card */}
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                            >
                                {initials}
                            </div>
                            {/* Online dot */}
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0d14]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-white text-[13px] font-medium leading-none truncate">
                                {admin?.name ?? "Admin"}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-1 truncate tracking-wide">
                                {admin?.role?.replace("_", " ") ?? "Super Admin"}
                            </p>
                        </div>
                    </div>

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-rose-400 transition-all duration-200 relative"
                    >
                        <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-rose-500/[0.06] transition-colors duration-200" />
                        <LogOut size={14} className="relative z-10 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={1.5} />
                        <span className="relative z-10 text-[13px] font-medium tracking-tight">
                            {loggingOut ? "Signing out..." : "Sign Out"}
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}