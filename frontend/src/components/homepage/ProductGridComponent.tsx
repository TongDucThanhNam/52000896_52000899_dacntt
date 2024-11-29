import Image from "next/image"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"

// Mock product data
const products = [
    {id: 1, name: "Product 1", price: 100000, category: "Category", image: "/logo.webp"},
    {id: 2, name: "Product 2", price: 200000, category: "Category", image: "/logo.webp"},
    {id: 3, name: "Product 3", price: 300000, category: "Category", image: "/logo.webp"},
    {id: 4, name: "Product 4", price: 400000, category: "Category", image: "/logo.webp"},
    {id: 5, name: "Product 5", price: 500000, category: "Category", image: "/logo.webp"},
    {id: 6, name: "Product 6", price: 600000, category: "Category", image: "/logo.webp"},
    {id: 7, name: "Product 7", price: 700000, category: "Category", image: "/logo.webp"},
    {id: 8, name: "Product 8", price: 800000, category: "Category", image: "/logo.webp"},
]

export default function ProductGridComponent() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="flex flex-col">
                        <CardHeader className="p-0">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-4">
                            <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
                            <Badge variant="secondary" className="mb-2">
                                {product.category}
                            </Badge>
                            <p className="text-gray-600">${product.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full">Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}