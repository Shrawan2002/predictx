import {
    TrendingUp,
    Trophy,
    Globe,
    Bitcoin,
    House,
    LineChart,
    Activity,
    Briefcase,
    Star,
} from "lucide-react";

export const tabs = [
    {
        label: "Trending",
        icon: TrendingUp,
        href: "/home",
    },
    {
        label: "Crypto",
        icon: Bitcoin,
        href: "/crypto",
    },
    {
        label: "Sports",
        icon: Trophy,
        href: "/sports",
    },
    {
        label: "Politics",
        icon: Globe,
        href: "/politics",
    },
];

export const sidebarFilters = [
    {
        label: "Home",
        icon: House,
        href: "/home",
    },
    {
        label: "Markets",
        icon: LineChart,
        href: "/markets",
    },
    {
        label: "Activity",
        icon: Activity,
        href: "/activity",
    },
    {
        label: "Portfolio",
        icon: Briefcase,
        href: "/portfolio",
    },
    {
        label: "Favourites",
        icon: Star,
        href: "/favourites",
    },
];