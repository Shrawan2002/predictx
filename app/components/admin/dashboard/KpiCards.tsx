"use client";

import { motion } from "framer-motion";

const stats = [
    {
        title: "24h Volume",
        value: "$12.8M",
    },
    {
        title: "Revenue",
        value: "$182K",
    },
    {
        title: "Active Users",
        value: "48,221",
    },
    {
        title: "Open Markets",
        value: "842",
    },
];

export default function KpiCards() {

    return (
        <div className="grid grid-cols-4 gap-5">

            {stats.map((item) => (

                <motion.div
                    whileHover={{
                        y: -5,
                    }}
                    key={item.title}
                    className="
                        rounded-3xl
                        bg-white/5
                        border
                        border-white/10
                        p-6
                        backdrop-blur-xl
                    "
                >

                    <p className="text-zinc-400">
                        {item.title}
                    </p>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            mt-3
                        "
                    >
                        {item.value}
                    </h2>

                </motion.div>
            ))}

        </div>
    );
}