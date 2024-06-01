import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import DropdownMenuOptions from "../Dropdown/index";
import style from "./servicetable.module.scss";

const columnHelper = createColumnHelper();

function ServiceListTable({ data, handleDropdownClick, handleDataHover }) {
    console.log(data, "data");

    const columns = [
        columnHelper.accessor("user", {
            header: "Username",
            cell: (info) => info.getValue().firstName,
        }),
        columnHelper.accessor("vehicle.licensePlate", {
            header: "License Plate",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("serviceScheduledDate", {
            header: "Scheduled Date",
            cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        }),
        columnHelper.accessor("user.phoneNumber", {
            header: "User Phone",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("garage.name", {
            header: "Garage Name",
            cell: (info) => info.getValue(),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-2">
            <table className={style.table}>
                <thead className={style.thead}>
                    {table?.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className={style.tbody}>
                    {table?.getRowModel()?.rows.map((row) => {
                        const isActive = row.original.active; // Get the 'active' value for the current row
                        console.log(isActive);
                        const rowClassName = isActive ? style.activeRow : ''; // Conditional class for active row
                        return (
                            <tr key={row.id} className={rowClassName}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    );
}

export default ServiceListTable;
