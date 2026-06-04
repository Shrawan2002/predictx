import KpiCards from "@/components/admin/dashboard/KpiCards";
import RevenueChart from "@/components/admin/charts/RevenueChart";

export default function DashboardPage() {
    return (
        /*
         * Dashboard page owns its own padding + scroll
         * main in layout has overflow-y-auto — this div just adds spacing
         */
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

            {/* ── Page Header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-white tracking-tight leading-none">
                        Dashboard
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1.5">
                        Welcome back — here's what's happening today.
                    </p>
                </div>
            </div>

            {/* ── KPI Cards ── */}
            <KpiCards />

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>

                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-6 flex flex-col gap-3">
                    <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                        Treasury Balance
                    </p>
                    <p className="text-3xl font-bold text-white tracking-tight">
                        $0.00
                    </p>
                    <p className="text-xs text-zinc-600 mt-auto">
                        Updated just now
                    </p>
                </div>

            </div>
        </div>
    );
}