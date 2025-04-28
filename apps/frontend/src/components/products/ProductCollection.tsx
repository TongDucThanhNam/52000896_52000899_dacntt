import ProductCard from "@/components/products/ProductCard";

async function getProducts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        })

        if (!res.ok) {
            if (res.status === 500) {
                throw new Error("Lỗi máy chủ nội bộ. Vui lòng thử lại sau.")
            }
            throw new Error(`Lỗi! status: ${res.status}`)
        }

        const products = res.json()
        // console.log(products)
        return products
    } catch (error: any) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error)

        // Handle network connection errors specifically
        if (error.message === "Network connection lost" || 
            error.message === "Failed to fetch" || 
            error.message.includes("network") ||
            !navigator.onLine) {
            throw new Error("Mất kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn và thử lại.")
        }

        throw error
    }
}

export default async function ProductCollection() {
    const products:any = await getProducts()
    // console.log(products)
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product: any, index: any) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}
