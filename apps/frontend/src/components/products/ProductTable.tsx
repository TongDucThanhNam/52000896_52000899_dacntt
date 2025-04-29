"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import NextImage from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export type Product = {
  id: string;
  productName: string;
  productSlug: string;
  productDescription: string;
  productBrand: string;
  imageUrls: string[];
  categoryId: string;
  productAvgRating: number;
  productTotalViews: number;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

interface ProductTableProps {
  products: Product[];
}

export default function ManageProductTable({ products }: ProductTableProps) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      select: true,
      productName: true,
      productDescription: true,
      productBrand: true,
      productAvgRating: true,
      productTotalViews: true,
      createdAt: true,
      updatedAt: true,
      isDeleted: false,
      isActive: false,
      actions: true,
    });
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: true,
      enableHiding: false,
    },
    // -------------------------
    // // ID
    // {
    //     accessorKey: "id:",
    //     header: "Product ID",
    //     cell: ({row}) => (
    //         <div className="capitalize">{row.getValue("id:")}</div>
    //     ),
    // },
    {
      accessorKey: "imageUrls",
      header: "Ảnh",
      cell: ({ row }) => {
        const imageUrl = (row.getValue("imageUrls") as string[])[0];

        if (!imageUrl) {
          return <div className="w-full h-14 aspect-square bg-gray-200" />;
        }

        return (
          <div className="capitalize lg:w-[56px]">
            <NextImage
              unoptimized={true}
              width={56}
              height={56}
              className={"h-14 aspect-square"}
              src={imageUrl}
              alt={row.getValue("productName")}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên sản phẩm
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">
          <p className="line-clamp-2 text-sm">{row.getValue("productName")}</p>
        </div>
      ),
    },
    {
      accessorKey: "productDescription",
      header: () => <div className="text-right">Mô tả sản phẩm</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium max-w-xs">
            <p className="line-clamp-2 text-sm">
              {row.getValue("productDescription")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "productBrand",
      header: "Brand",
      cell: ({ row }) => (
        <div className="capitalize">
          <p className={"line-clamp-2 text-sm"}>
            {row.getValue("productBrand")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "productAvgRating",
      header: "Rating",
      cell: ({ row }) => <div>{row.getValue("productAvgRating")}</div>,
    },
    {
      accessorKey: "productTotalViews",
      header: "Views",
      cell: ({ row }) => <div>{row.getValue("productTotalViews")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div>{new Date(row.getValue("createdAt")).toLocaleString("vi-VN")}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => (
        <div>{new Date(row.getValue("updatedAt")).toLocaleString("vi-VN")}</div>
      ),
    },
    {
      accessorKey: "isDeleted",
      header: "Deleted",
      cell: ({ row }) => <div>{row.getValue("isDeleted") ? "Yes" : "No"}</div>,
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => <div>{row.getValue("isActive") ? "Yes" : "No"}</div>,
    },
    //--------------------------------
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const Product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                // onClick={() => navigator.clipboard.writeText(Product.id)}
                onSelect={() => navigator.clipboard.writeText(Product.id)}
              >
                Sao chép ID sản phẩm
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={() => {
                //     const editUrl = `/admin/quan-ly-san-pham/sua-san-pham/${Product.id}`;
                //     router.prefetch(editUrl);
                //     window.open(editUrl, '_blank', 'noopener,noreferrer');
                // }}
                onSelect={() => {
                  router.push(
                    `/admin/quan-ly-san-pham/sua-san-pham/${Product.id}`,
                  );
                }}
              >
                Sửa sản phẩm
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => alert("Chưa hỗ trợ xóa sản phẩm")}
              >
                Xoá sản phẩm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
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
  });

  return (
    <div className="w-full font-base text-main-foreground">
      <Button
        variant={"default"}
        onClick={() => router.push("/admin/quan-ly-san-pham/them-san-pham")}
      >
        Thêm sản phẩm
      </Button>
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm theo tên sản phẩm ..."
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Filter, select, ... */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="neutral" className="ml-auto">
              Hiển thị cột <ChevronDown />
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="font-heading">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="bg-secondary-background text-foreground"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="bg-secondary-background text-foreground data-[state=selected]:bg-main data-[state=selected]:text-main-foreground"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
          {table.getFilteredSelectedRowModel().rows.length} trên{" "}
          {table.getFilteredRowModel().rows.length} sản phâm đã chọn.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
