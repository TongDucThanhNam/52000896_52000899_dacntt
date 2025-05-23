"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {useRouter} from "next/navigation"
import {Transaction} from "@/types";

interface TransactionTableProps {
    transactions: Transaction[]
}

export default function ManageTransactionTable({transactions}: TransactionTableProps) {
    const router = useRouter()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        select: true,
        id: true,
        userId: true,
        orderStatus: true,
        totalValue: true,
        paymentMethod: true,
        isActive: true,
        createdAt: true,
        actions: true,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const columns: ColumnDef<Transaction>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "Mã giao dịch",
            cell: ({row}) => <div className="font-medium">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "userId",
            header: "Mã người dùng",
            cell: ({row}) => <div>{row.getValue("userId")}</div>,
        },
        {
            accessorKey: "orderStatus",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Trạng thái
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: ({row}) => {
                const status = row.getValue("orderStatus") as string
                return (
                    <div className={`font-medium ${
                        status === "completed" ? "text-green-600" : 
                        status === "pending" ? "text-yellow-600" : 
                        status === "cancelled" ? "text-red-600" : ""
                    }`}>
                        {status === "completed" ? "Hoàn thành" :
                         status === "pending" ? "Đang xử lý" :
                         status === "cancelled" ? "Đã hủy" : status}
                    </div>
                )
            },
        },
        {
            accessorKey: "totalValue",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Tổng giá trị
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: ({row}) => {
                const amount = parseFloat(row.getValue("totalValue"))
                const formatted = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(amount)

                return <div>{formatted}</div>
            },
        },
        {
            accessorKey: "paymentMethod",
            header: "Phương thức thanh toán",
            cell: ({row}) =>
            {
                const method = row.getValue("paymentMethod") as string
                return (
                    <div className={`font-medium`}>
                        {
                            method === "card" ? "Chuyển khoản ngân hàng" :
                            method === "cash" ? "Thanh toán khi nhận hàng" :
                            method
                        }
                    </div>
                )
            }
        },
        {
            accessorKey: "isActive",
            header: "Trạng thái hoạt động",
            cell: ({row}) => (
                <div className={`font-medium ${row.getValue("isActive") ? "text-green-600" : "text-red-600"}`}>
                    {row.getValue("isActive") ? "Hoạt động" : "Không hoạt động"}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Ngày tạo",
            cell: ({row}) => <div>{new Date(row.getValue("createdAt")).toLocaleDateString("vi-VN")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}) => {
                const transaction = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(transaction.id)}>
                                Sao chép mã giao dịch
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => router.push(`/admin/quan-ly-giao-dich/chi-tiet-giao-dich/${transaction.id}`)}>
                                Xem chi tiết giao dịch
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data: transactions,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Tìm theo mã giao dịch..."
                    value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="neutral" className="ml-auto">
                            Hiển thị cột
                            <ChevronDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Không có kết quả.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} giao dịch đã chọn.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="noShadow"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trước
                    </Button>
                    <Button variant="noShadow" size="sm" onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}>
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    )
}
