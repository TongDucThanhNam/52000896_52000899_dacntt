import DataTableDemo from "@/components/products/ProductTable";

export default function QuanLySanPham() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Quản lý sản phẩm</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm px-4"
            >
                <DataTableDemo/>
            </div>
        </main>
    )
}