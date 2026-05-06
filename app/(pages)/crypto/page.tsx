
import FilterTabs from "@/components/FilterTabs";


export default function CryptoPage() {
    return (
        <div className="w-full ">

            {/* 🔵 PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

                <div>
                    <h1 className="text-2xl font-semibold">Crypto</h1>
                    <p className="text-sm text-gray-400">
                        Trade predictions on crypto markets
                    </p>
                </div>

                {/* FILTER BUTTONS */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    <FilterTabs />
                </div>
            </div>

            {/* 🟢 MARKET GRID */}

        </div>
    );
}