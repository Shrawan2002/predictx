"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";

const data = [
    { day: "Mon", revenue: 12000 },
    { day: "Tue", revenue: 18000 },
    { day: "Wed", revenue: 15000 },
    { day: "Thu", revenue: 24000 },
    { day: "Fri", revenue: 21000 },
];

export default function RevenueChart() {

    return (
        <div
            className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                h-[400px]
            "
        >

            <h2 className="text-xl font-semibold mb-6">
                Revenue Overview
            </h2>

            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <AreaChart data={data}>

                    <XAxis dataKey="day" />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563eb"
                        fill="#2563eb"
                    />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}