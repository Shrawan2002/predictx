// components/admin/layout/AdminDarkWrapper.tsx
// ✅ Forces dark mode only for admin pages — doesn't affect the rest of the app

export default function AdminDarkWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="dark"
            style={{ colorScheme: "dark" }}
        >
            <div className="bg-[#070B14] text-white min-h-screen">
                {children}
            </div>
        </div>
    );
}