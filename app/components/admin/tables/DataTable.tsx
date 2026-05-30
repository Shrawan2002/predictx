"use client";

interface Props<T> {
    data: T[];

    columns: {
        key: keyof T;
        label: string;
    }[];
}

export default function DataTable<T>({
    data,
    columns,
}: Props<T>) {

    return (
        <div
            className="
                rounded-3xl
                border
                border-white/10
                overflow-hidden
            "
        >

            <table className="w-full">

                <thead
                    className="
                        bg-white/5
                    "
                >
                    <tr>

                        {columns.map((column) => (

                            <th
                                key={String(
                                    column.key
                                )}
                                className="
                                    text-left
                                    p-4
                                    text-zinc-400
                                "
                            >
                                {column.label}
                            </th>
                        ))}

                    </tr>
                </thead>

                <tbody>

                    {data.map(
                        (item, index) => (

                            <tr
                                key={index}
                                className="
                                    border-t
                                    border-white/5
                                "
                            >

                                {columns.map(
                                    (column) => (

                                        <td
                                            key={String(
                                                column.key
                                            )}
                                            className="p-4"
                                        >
                                            {
                                                item[
                                                column
                                                    .key
                                                ] as string
                                            }
                                        </td>
                                    )
                                )}

                            </tr>
                        )
                    )}

                </tbody>
            </table>
        </div>
    );
}