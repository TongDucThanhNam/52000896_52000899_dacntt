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
import {ArrowUpDown, ChevronDown, MoreHorizontal} from 'lucide-react'
import NextImage from "next/image"

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
import {UserProfile} from "@/types";

interface UserTableProps {
    users: UserProfile[]
}

export default function ManageUserTable({users}: UserTableProps) {
    const router = useRouter()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        select: true,
        userImageUrl: true,
        userName: true,
        userEmail: true,
        userPhone: true,
        userDateOfBirth: true,
        userGender: true,
        userJob: true,
        userCity: true,
        userRole: true,
        actions: true,
    })
    const [rowSelection, setRowSelection] = React.useState({})

    const columns: ColumnDef<UserProfile>[] = [
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
            accessorKey: "userImageUrl",
            header: "Avatar",
            cell: ({row}) => {
                const imageUrl = row.getValue("userImageUrl") as string

                if (!imageUrl) {
                    return <div className="w-10 h-10 rounded-full bg-gray-200"/>
                }

                return (
                    <NextImage
                        unoptimized={true}
                        width={40}
                        height={40}
                        className="rounded-full"
                        src={imageUrl}
                        alt={row.getValue("userName")}
                    />
                )
            },
        },
        {
            accessorKey: "userName",
            header: ({column}) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Tên
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            cell: ({row}) => <div className="font-medium">{row.getValue("userName")}</div>,
        },
        {
            accessorKey: "userEmail",
            header: "Email",
            cell: ({row}) => <div>{row.getValue("userEmail")}</div>,
        },
        {
            accessorKey: "userPhone",
            header: "Số điện thoại",
            cell: ({row}) => <div>{row.getValue("userPhone")}</div>,
        },
        {
            accessorKey: "userDateOfBirth",
            header: "Ngày tháng năm sinh.",
            cell: ({row}) => <div>{new Date(row.getValue("userDateOfBirth")).toLocaleDateString("vi-VN")}</div>,
        },
        {
            accessorKey: "userGender",
            header: "Giới tính",
            cell: ({row}) => <div>{row.getValue("userGender")}</div>,
        },
        {
            accessorKey: "userJob",
            header: "Nghề nghiệp",
            cell: ({row}) => <div>{row.getValue("userJob")}</div>,
        },
        {
            accessorKey: "userCity",
            header: "Thành phô",
            cell: ({row}) => <div>{row.getValue("userCity")}</div>,
        },
        {
            accessorKey: "userRole",
            header: "Role",
            cell: ({row}) => <div>{row.getValue("userRole")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({row}) => {
                const user = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(user._id)}>Sao chép
                                UserId</DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => router.push(`/admin/quan-ly-nguoi-dung/xem-giao-dich/${user._id}`)}>
                                Xem giao dịch của người dùng
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                onSelect={() => router.push(`/admin/quan-ly-nguoi-dung/sua-nguoi-dung/${user._id}`)}>
                                Sửa thông tin người dùng
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => router.push(`/admin/quan-ly-nguoi-dung/xoa-nguoi-dung/${user._id}`)}>
                                Xóa người dùng
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data: users,
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
            <Button
                className="bg-primary text-white mb-4"
                onClick={() => router.push("/admin/quan-ly-nguoi-dung/them-nguoi-dung")}
            >
                Thêm người dùng
            </Button>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Tìm theo tên..."
                    value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("userName")?.setFilterValue(event.target.value)}
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} người dùng đã chọn.
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