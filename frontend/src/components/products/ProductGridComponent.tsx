// Mock product data
import ProductCard from "@/components/products/ProductCard";

const products = [
    {id: 1, name: "Product 1", price: 100000, category: "Category", image: "/productImage.webp"},
    {id: 2, name: "Product 2", price: 200000, category: "Category", image: "/productImage.webp"},
    {id: 3, name: "Product 3", price: 300000, category: "Category", image: "/productImage.webp"},
    {id: 4, name: "Product 4", price: 400000, category: "Category", image: "/productImage.webp"},
    {id: 5, name: "Product 5", price: 500000, category: "Category", image: "/productImage.webp"},
    {id: 6, name: "Product 6", price: 600000, category: "Category", image: "/productImage.webp"},
    {id: 7, name: "Product 7", price: 700000, category: "Category", image: "/productImage.webp"},
    {id: 8, name: "Product 8", price: 800000, category: "Category", image: "/productImage.webp"},
]

export default function ProductGridComponent() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}