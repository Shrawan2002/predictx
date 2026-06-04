// components/admin/layout/AdminDarkWrapper.tsx

export default function AdminDarkWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // ✅ data-theme="dark" + class="dark" — both needed:
        // - class="dark" activates Tailwind dark: variants
        // - data-theme="dark" is targeted by CSS to override CSS variables
        // - colorScheme tells browser this is a dark surface
        <div
            className="dark"
            data-theme="dark"
            style={{ colorScheme: "dark" }}
        >
            {children}
        </div>
    );
}