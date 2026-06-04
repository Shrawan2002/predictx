import type { LucideIcon } from "lucide-react";

// ── Core data shape ──────────────────────────────────────────
export interface IconOption {
    value: string;
    label: string;
    icon: LucideIcon;
}

// ── Component props ──────────────────────────────────────────
export interface IconSelectProps {
    /** Controlled value — the string key e.g. "Trophy" */
    value: string;
    /** Called when selection changes */
    onChange: (value: string) => void;
    /** Placeholder shown when nothing is selected */
    placeholder?: string;
    /** Disable the entire select */
    disabled?: boolean;
    /** Additional class on the trigger button */
    className?: string;
}

// ── Internal state ───────────────────────────────────────────
export interface IconSelectState {
    open: boolean;
    query: string;
}