"use client";

interface MenuLinkProps {
    label: string;
}

export default function MenuLink({
    label,
}: MenuLinkProps) {
    return (
        <button
            className="
                w-full text-left px-3 py-2 rounded-2xl
                text-[#6B7280]
                hover:text-[#18181B]
                hover:bg-black/5

                dark:text-[#94A3B8]
                dark:hover:text-white
                dark:hover:bg-white/5

                transition-all
            "
        >
            {label}
        </button>
    );
}