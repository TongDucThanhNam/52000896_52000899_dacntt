import ManageProductTable from "@/components/products/ProductTable";

export const dynamic = 'force-dynamic'

async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
    if (!res.ok) {
        throw new Error('Failed to fetch products')
    }
    return res.json()
}

export default async function ProductManagePage() {
    const products:any = await getProducts()
    // console.log(products)

    if (!products) {
        return (
            <div>
                <h1>Lỗi khi lấy danh sách sản phẩm.</h1>
            </div>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Quản lý sản phẩm</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm px-4"
            >
                <ManageProductTable products={products}/>
            </div>
        </main>
    )
}