"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react"

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
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

const data: Product[] = [
    {
        productId: "6765a809c044f8a8dc24ef08",
        productName: "Handcrafted Cotton Keyboard",
        productSlug: "handcrafted-cotton-keyboard",
        productDescription: "Handcrafted Cotton Keyboard",
        productBrand: "Handcrafted Cotton Keyboard",
        imageUrls: ["https://placehold.co/1200x1200"],
        categoryId: "5f5f5f5f5f5f5f5f5f5f5f5f",
        productAvgRating: 4.5,
        productTotalViews: 0,
        isDeleted: false,
        isActive: true,
        createdAt: "2021-11-11T02:46:33.000Z",
        updatedAt: "2021-11-11T02:46:33.000Z",
    },
    {
        productId: "6765a809c044f8a8dc24ef09",
        productName: "Ergonomic Wooden Chair",
        productSlug: "ergonomic-wooden-chair",
        productDescription: "Ergonomic Wooden Chair",
        productBrand: "Ergonomic Wooden Chair",
        imageUrls: [],
        categoryId: "5f5f5f5f5f5f5f5f5f5f5f5f",
        productAvgRating: 4.7,
        productTotalViews: 10,
        isDeleted: false,
        isActive: true,
        createdAt: "2021-11-12T02:46:33.000Z",
        updatedAt: "2021-11-12T02:46:33.000Z",
    },
    {
        productId: "6765a809c044f8a8dc24ef10",
        productName: "Stylish Leather Wallet",
        productSlug: "stylish-leather-wallet",
        productDescription: "Stylish Leather Wallet",
        productBrand: "Stylish Leather Wallet",
        imageUrls: [],
        categoryId: "5f5f5f5f5f5f5f5f5f5f5f5f",
        productAvgRating: 4.8,
        productTotalViews: 20,
        isDeleted: false,
        isActive: true,
        createdAt: "2021-11-13T02:46:33.000Z",
        updatedAt: "2021-11-13T02:46:33.000Z",
    },
    {
        productId: "6765a809c044f8a8dc24ef11",
        productName: "Modern Desk Lamp",
        productSlug: "modern-desk-lamp",
        productDescription: "Modern Desk Lamp",
        productBrand: "Modern Desk Lamp",
        imageUrls: [],
        categoryId: "5f5f5f5f5f5f5f5f5f5f5f5f",
        productAvgRating: 4.6,
        productTotalViews: 30,
        isDeleted: false,
        isActive: true,
        createdAt: "2021-11-14T02:46:33.000Z",
        updatedAt: "2021-11-14T02:46:33.000Z",
    },
    {
        productId: "6765a809c044f8a8dc24ef12",
        productName: "Wireless Bluetooth Speaker",
        productSlug: "wireless-bluetooth-speaker",
        productDescription: "Wireless Bluetooth Speaker",
        productBrand: "Wireless Bluetooth Speaker",
        imageUrls: [],
        categoryId: "5f5f5f5f5f5f5f5f5f5f5f5f",
        productAvgRating: 4.9,
        productTotalViews: 40,
        isDeleted: false,
        isActive: true,
        createdAt: "2021-11-15T02:46:33.000Z",
        updatedAt: "2021-11-15T02:46:33.000Z",
    },
]

export type Product = {
    productId: string
    productName: string
    productSlug: string
    productDescription: string
    productBrand: string
    imageUrls: string[]
    categoryId: string
    productAvgRating: number
    productTotalViews: number
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
}

const columns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
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
        enableSorting: false,
        enableHiding: false,
    },
    // -------------------------
    // ID
    {
        accessorKey: "productId",
        header: "Product ID",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("productId")}</div>
        ),
    },
    {
        accessorKey: "imageUrls",
        header: "Image",
        cell: ({row}) => <div className="capitalize">
            <img className={"h-14 aspect-square"} src={row.getValue("imageUrls") as string[][0]}
                 alt={row.getValue("productName")}
            />
        </div>,
    },
    {
        accessorKey: "productName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("productName")}</div>,
    },
    {
        accessorKey: "productDescription",
        header: () => <div className="text-right">productDescription</div>,
        cell: ({row}) => {
            return <div className="text-right font-medium">{row.getValue("productDescription")}</div>
        },
    },
    {
        accessorKey: "productBrand",
        header: "Brand",
        cell: ({row}) => <div className="capitalize">{row.getValue("productBrand")}</div>,
    },
    {
        accessorKey: "productAvgRating",
        header: "Rating",
        cell: ({row}) => <div>{row.getValue("productAvgRating")}</div>,
    },
    {
        accessorKey: "productTotalViews",
        header: "Views",
        cell: ({row}) => <div>{row.getValue("productTotalViews")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) => <div>{new Date(row.getValue("createdAt")).toLocaleString("vi-VN")}</div>,
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({row}) => <div>{new Date(row.getValue("updatedAt")).toLocaleString("vi-VN")}</div>,
    },
    {
        accessorKey: "isDeleted",
        header: "Deleted",
        cell: ({row}) => <div>{row.getValue("isDeleted") ? "Yes" : "No"}</div>,
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({row}) => <div>{row.getValue("isActive") ? "Yes" : "No"}</div>,
    },
    //--------------------------------
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const Product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(Product.productId)}
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View Product details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
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
            <Button className="bg-primary text-white"
                onClick={() => alert("Add product")}
            >Thêm sản phẩm</Button>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter productName..."
                    value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("productName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown/>
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
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
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
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
