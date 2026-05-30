import {
    LayoutDashboard,
    ChartCandlestick,
    Wallet,
    Users,
    BarChart3,
    Bell,
    ShieldAlert,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Markets",
        href: "/markets",
        icon: ChartCandlestick,
    },
    {
        label: "Withdrawals",
        href: "/withdrawals",
        icon: Wallet,
    },
    {
        label: "Users",
        href: "/users",
        icon: Users,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: BarChart3,
    },
    {
        label: "Risk Engine",
        href: "/risk-engine",
        icon: ShieldAlert,
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
];