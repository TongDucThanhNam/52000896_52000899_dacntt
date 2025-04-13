"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TransactionItem } from "@/types"

interface TransactionItemTableProps {
    items: TransactionItem[]
}

export default function TransactionItemTable({ items }: TransactionItemTableProps) {
    const columns: ColumnDef<TransactionItem>[] = [
        {
            accessorKey: "_id",
            header: "Mã chi tiết",
            cell: ({ row }) => <div className="font-medium">{row.getValue("_id")}</div>,
        },
        {
            accessorKey: "productId",
            header: "Mã sản phẩm",
            cell: ({ row }) => <div>{row.getValue("productId")}</div>,
        },
        {
            accessorKey: "variantId",
            header: "Mã biến thể",
            cell: ({ row }) => <div>{row.getValue("variantId")}</div>,
        },
        {
            accessorKey: "quantity",
            header: "Số lượng",
            cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
        },
        {
            accessorKey: "purchasePrice",
            header: "Giá mua",
            cell: ({ row }) => {
                const amount = Number.parseFloat(row.getValue("purchasePrice"))
                const formatted = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(amount)

                return <div>{formatted}</div>
            },
        },
        {
            accessorKey: "createdAt",
            header: "Ngày tạo",
            cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN")}</div>,
        },
    ]

    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Không có chi tiết giao dịch.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

