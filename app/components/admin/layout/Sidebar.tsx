"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
    LayoutDashboard, TrendingUp, BookOpen, Activity,
    Tag, Layers, Users, AlertTriangle, Wallet, Landmark,
    BarChart3, ShieldAlert, Settings, FileText,
    LogOut, ChevronRight, Coins, BadgeDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navSections = [
    {
        title: "Core",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
            { label: "Markets", icon: TrendingUp, href: "/admin/markets", badge: 142, badgeColor: "emerald" },
            { label: "Categories", icon: Tag, href: "/admin/categories" },
            { label: "Subcategories", icon: Layers, href: "/admin/subcategories" },
            { label: "Order Books", icon: BookOpen, href: "/admin/order-books" },
            { label: "Live Trades", icon: Activity, href: "/admin/live-trades" },
            { label: "Assets", icon: Coins, href: "/admin/assets" }
        ],
    },
    {
        title: "Users",
        items: [
            { label: "Users", icon: Users, href: "/admin/users" },
            { label: "Disputes", icon: AlertTriangle, href: "/admin/disputes", badge: 3, badgeColor: "rose" },
        ],
    },
    {
        title: "Finance",
        items: [
            { label: "Withdrawals", icon: Wallet, href: "/admin/withdrawals", badge: 7, badgeColor: "amber" },
            { label: "Treasury", icon: Landmark, href: "/admin/treasury" },
        ],
    },
    {
        title: "Intelligence",
        items: [
            { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
            { label: "Risk Engine", icon: ShieldAlert, href: "/admin/risk" },
        ],
    },
    {
        title: "System",
        items: [
            { label: "Settings", icon: Settings, href: "/admin/settings" },
            { label: "Audit Logs", icon: FileText, href: "/admin/audit" },
        ],
    },
];

// Badge color map
const badgeMap: Record<string, { bg: string; text: string; ring: string }> = {
    emerald: { bg: "rgba(16,185,129,0.12)", text: "#34d399", ring: "rgba(16,185,129,0.25)" },
    rose: { bg: "rgba(244,63,94,0.12)", text: "#fb7185", ring: "rgba(244,63,94,0.25)" },
    amber: { bg: "rgba(245,158,11,0.12)", text: "#fbbf24", ring: "rgba(245,158,11,0.25)" },
    cyan: { bg: "rgba(6,182,212,0.12)", text: "#22d3ee", ring: "rgba(6,182,212,0.25)" },
};

interface SidebarProps {
    isSidebarOpen: boolean;
    onMenuClick: () => void;
}

export default function Sidebar({ isSidebarOpen, onMenuClick }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const admin = useAuthStore(s => s.admin);
    const adminLogout = useAuthStore(s => s.adminLogout);
    const [loggingOut, setLoggingOut] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const initials = admin?.name
        ? admin.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
        : "AD";

    const handleLogout = async () => {
        setLoggingOut(true);
        await adminLogout();
        router.replace("/admin/login");
    };

    const handleNavClick = (href: string) => {
        router.push(href);
        if (!isDesktop) onMenuClick();
    };

    return (
        <>
            {/* Mobile overlay */}
            {!isDesktop && isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 backdrop-blur-sm"
                    style={{ background: "rgba(0,0,0,0.7)" }}
                    onClick={onMenuClick}
                />
            )}

            <aside
                data-sidebar="true"
                style={{
                    position: isDesktop ? "relative" : "fixed",
                    top: isDesktop ? "auto" : 0,
                    left: isDesktop ? "auto" : 0,
                    zIndex: isDesktop ? 1 : 40,
                    transform: isDesktop ? "none" : isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: isDesktop ? "none" : "transform 300ms cubic-bezier(0.4,0,0.2,1)",
                    width: "256px",
                    height: "100vh",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    // ✅ Premium layered dark surface
                    background: "#0d0f14",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                {/* ── Top ambient glow ── */}
                <div style={{
                    position: "absolute",
                    top: -40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 160,
                    height: 160,
                    background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                {/* ── LOGO ── */}
                <div style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "0 18px",
                    height: "64px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    position: "relative",
                }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                        <div style={{
                            width: 34,
                            height: 34,
                            borderRadius: 10,
                            background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: 13,
                            letterSpacing: "0.05em",
                            boxShadow: "0 0 20px rgba(14,165,233,0.3)",
                        }}>
                            PX
                        </div>
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{
                            color: "#f8fafc",
                            fontWeight: 700,
                            fontSize: 15,
                            lineHeight: 1,
                            letterSpacing: "-0.01em",
                        }}>
                            PredictX
                        </p>
                        <p style={{
                            color: "rgba(148,163,184,0.6)",
                            fontSize: 10,
                            marginTop: 4,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                        }}>
                            Admin Console
                        </p>
                    </div>
                </div>

                {/* ── NAV ── */}
                <ScrollArea className="flex-1 overflow-hidden">
                    <style>{`[data-radix-scroll-area-scrollbar]{display:none!important}`}</style>
                    <nav style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: "24px" }}>
                        {navSections.map((section) => (
                            <div key={section.title}>
                                {/* Section label */}
                                <p style={{
                                    padding: "0 10px 6px",
                                    fontSize: 9,
                                    fontWeight: 700,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "rgba(100,116,139,0.7)",
                                }}>
                                    {section.title}
                                </p>

                                <ul style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                        const Icon = item.icon;
                                        const badge = item.badge !== undefined ? badgeMap[item.badgeColor ?? "cyan"] : null;

                                        return (
                                            <li key={item.label}>
                                                <button
                                                    onClick={() => handleNavClick(item.href)}
                                                    style={{
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        padding: "8px 10px",
                                                        borderRadius: "10px",
                                                        cursor: "pointer",
                                                        transition: "all 150ms ease",
                                                        position: "relative",
                                                        // Active: rich tinted bg, inactive: transparent
                                                        background: isActive
                                                            ? "linear-gradient(90deg, rgba(37,99,235,0.20) 0%, rgba(99,102,241,0.15) 100%)"
                                                            : "transparent",
                                                        outline: isActive
                                                            ? "1px solid rgba(14,165,233,0.18)"
                                                            : "1px solid transparent",
                                                    }}
                                                    // Hover via JS since inline style can't do :hover
                                                    onMouseEnter={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                                            e.currentTarget.style.borderColor =
                                                                "rgba(255,255,255,0.08)";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.background = "transparent";
                                                            e.currentTarget.style.outline = "1px solid transparent";
                                                        }
                                                    }}
                                                >
                                                    {/* Active left accent */}
                                                    {isActive && (
                                                        <span style={{
                                                            position: "absolute",
                                                            left: 0,
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                            width: 3,
                                                            height: 18,
                                                            borderRadius: "0 4px 4px 0",
                                                            background: "linear-gradient(180deg,#0ea5e9,#6366f1)",
                                                            boxShadow: "0 0 8px rgba(14,165,233,0.5)",
                                                        }} />
                                                    )}

                                                    {/* Icon container */}
                                                    <span style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 8,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                        background: isActive
                                                            ? "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(99,102,241,0.20))"
                                                            : "rgba(255,255,255,0.04)",
                                                        border: isActive
                                                            ? "1px solid rgba(14,165,233,0.25)"
                                                            : "1px solid rgba(255,255,255,0.06)",
                                                        transition: "all 150ms ease",
                                                    }}>
                                                        <Icon
                                                            size={14}
                                                            strokeWidth={isActive ? 2 : 1.5}
                                                            style={{
                                                                color: isActive ? "#60A5FA" : "#CBD5E1",
                                                                transition: "all 150ms ease",
                                                            }}
                                                        />
                                                    </span>

                                                    {/* Label */}
                                                    <span style={{
                                                        flex: 1,
                                                        textAlign: "left",
                                                        fontSize: 14,
                                                        fontWeight: isActive ? 600 : 500,
                                                        color: isActive
                                                            ? "#FFFFFF"
                                                            : "#E2E8F0",
                                                        letterSpacing: "-0.01em",
                                                        transition: "all 150ms ease",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}>
                                                        {item.label}
                                                    </span>

                                                    {/* Badge */}
                                                    {badge && item.badge !== undefined && (
                                                        <span style={{
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            padding: "2px 6px",
                                                            borderRadius: 6,
                                                            background: badge.bg,
                                                            color: badge.text,
                                                            outline: `1px solid ${badge.ring}`,
                                                            flexShrink: 0,
                                                            lineHeight: 1.4,
                                                        }}>
                                                            {item.badge}
                                                        </span>
                                                    )}

                                                    {/* Active chevron */}
                                                    {isActive && (
                                                        <ChevronRight
                                                            size={12}
                                                            style={{ color: "rgba(56,189,248,0.5)", flexShrink: 0 }}
                                                        />
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

                {/* ── Divider ── */}
                <div style={{
                    height: "1px",
                    margin: "0 16px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }} />

                {/* ── FOOTER ── */}
                <div style={{ flexShrink: 0, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "4px" }}>

                    {/* User card */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        marginBottom: "2px",
                    }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                            <div style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 700,
                                boxShadow: "0 0 12px rgba(99,102,241,0.3)",
                            }}>
                                {initials}
                            </div>
                            {/* Online dot */}
                            <span style={{
                                position: "absolute",
                                bottom: -1,
                                right: -1,
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                background: "#22c55e",
                                border: "2px solid #0d0f14",
                                boxShadow: "0 0 6px rgba(34,197,94,0.5)",
                            }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                                color: "#FFFFFF",
                                fontSize: 13,
                                fontWeight: 600,
                                lineHeight: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>
                                {admin?.name ?? "Admin"}
                            </p>
                            <p style={{
                                color: "#94A3B8",
                                fontSize: 10,
                                marginTop: 3,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                letterSpacing: "0.04em",
                            }}>
                                {admin?.role?.replace("_", " ") ?? "Super Admin"}
                            </p>
                        </div>
                    </div>

                    {/* Sign out */}
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 12px",
                            borderRadius: "10px",
                            border: "1px solid transparent",
                            background: "transparent",
                            cursor: loggingOut ? "not-allowed" : "pointer",
                            transition: "all 150ms ease",
                            opacity: loggingOut ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(244,63,94,0.08)";
                            e.currentTarget.style.borderColor = "rgba(244,63,94,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "transparent";
                        }}
                    >
                        <span style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            background: "rgba(244,63,94,0.08)",
                            border: "1px solid rgba(244,63,94,0.12)",
                        }}>
                            <LogOut size={13} strokeWidth={1.5} style={{ color: "#f87171" }} />
                        </span>
                        <span style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#E2E8F0",
                        }}>
                            {loggingOut ? "Signing out..." : "Sign Out"}
                        </span>
                    </button>
                </div>

            </aside>
        </>
    );
}