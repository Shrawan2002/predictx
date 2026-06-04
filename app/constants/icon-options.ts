import {
    Trophy,
    TrendingUp,
    Globe,
    Bitcoin,
    BarChart3,
    Flame,
    Zap,
    Star,
    Target,
    Rocket,
    Shield,
    Heart,
    Music,
    Camera,
    Coffee,
    Gamepad2,
    Plane,
    Home,
    ShoppingBag,
    Cpu,
    type LucideIcon,
} from "lucide-react";

export interface IconOption {
    value: string;
    label: string;
    icon: LucideIcon;
}

export const ICON_OPTIONS: IconOption[] = [
    { value: "Trophy", label: "Trophy", icon: Trophy },
    { value: "TrendingUp", label: "Trending Up", icon: TrendingUp },
    { value: "Globe", label: "Globe", icon: Globe },
    { value: "Bitcoin", label: "Bitcoin", icon: Bitcoin },
    { value: "BarChart3", label: "Bar Chart", icon: BarChart3 },
    { value: "Flame", label: "Flame", icon: Flame },
    { value: "Zap", label: "Zap", icon: Zap },
    { value: "Star", label: "Star", icon: Star },
    { value: "Target", label: "Target", icon: Target },
    { value: "Rocket", label: "Rocket", icon: Rocket },
    { value: "Shield", label: "Shield", icon: Shield },
    { value: "Heart", label: "Heart", icon: Heart },
    { value: "Music", label: "Music", icon: Music },
    { value: "Camera", label: "Camera", icon: Camera },
    { value: "Coffee", label: "Coffee", icon: Coffee },
    { value: "Gamepad2", label: "Gaming", icon: Gamepad2 },
    { value: "Plane", label: "Travel", icon: Plane },
    { value: "Home", label: "Home", icon: Home },
    { value: "ShoppingBag", label: "Shopping", icon: ShoppingBag },
    { value: "Cpu", label: "Technology", icon: Cpu },
];

// O(1) lookup map — memoized at module level
export const ICON_MAP = new Map<string, IconOption>(
    ICON_OPTIONS.map((opt) => [opt.value, opt])
);

export function getIconOption(value: string): IconOption | undefined {
    return ICON_MAP.get(value);
}