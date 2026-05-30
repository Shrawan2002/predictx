import DataTable from "@/components/admin/tables/DataTable";

const data = [
    {
        market: "BTC > 120k",
        status: "Open",
        volume: "$1.2M",
    },
    {
        market: "ETH ETF Approved",
        status: "Locked",
        volume: "$820K",
    },
];

export default function MarketsPage() {

    return (
        <div className="space-y-6">

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Markets
                </h1>

            </div>

            <DataTable
                data={data}
                columns={[
                    {
                        key: "market",
                        label: "Market",
                    },
                    {
                        key: "status",
                        label: "Status",
                    },
                    {
                        key: "volume",
                        label: "Volume",
                    },
                ]}
            />

        </div>
    );
}