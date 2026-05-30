import KpiCards from "@/components/admin/dashboard/KpiCards";
import RevenueChart from "@/components/admin/charts/RevenueChart";

export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-white tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Welcome back, here's what's happening today.
                    </p>
                </div>
            </div>

            {/* KPI Cards */}
            <KpiCards />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Chart — takes 2/3 width on large screens */}
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>

                {/* Treasury Balance — takes 1/3 width */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col gap-3">
                    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                        Treasury Balance
                    </p>
                    <p className="text-3xl font-bold text-white tracking-tight">
                        $0.00
                    </p>
                    <p className="text-xs text-gray-600 mt-auto">
                        Updated just now
                    </p>
                </div>

            </div>

        </div>
    );
}