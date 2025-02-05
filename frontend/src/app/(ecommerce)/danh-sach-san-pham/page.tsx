import ProductGridComponent from "@/components/products/ProductGridComponent";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import { CardTitle, Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { priceVietNamDongFormatter } from "@/lib/utils";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import AIRecommendations from "@/components/products/AIRecommendations";

interface Product {
    id: string
    name: string
    price: number | string
    imageUrls?: string[]
    description?: string
  }
  
  async function getProducts(): Promise<Product[]> {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      })
  
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
      }
  
      const data = await res.json()
      console.log("API response:", data);
      if (!Array.isArray(data)) {
        throw new Error("API did not return an array of products")
      }
  
      return data.map((product) => ({
        id: product.id?.toString() ?? "",
        name: product.name || "Chưa có tên",
        price: product.price || 0,
        imageUrls: product.imageUrls || ["/placeholder.svg"],
        description: product.description || "Chưa có mô tả",
      }));
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Failed to load products. Please try again later.")
    }
  }
  
  function ProductCard({ product }: { product: Product }) {
    return (
      <Card className="w-full h-full flex flex-col transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-4 flex-grow">
          <div className="aspect-square relative mb-4">
            <img
              src={product.imageUrls?.[0] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
          <span className="text-lg font-bold text-primary">{priceVietNamDongFormatter(product.price.toString())}</span>
          <Link href={`/chi-tiet-san-pham/id/${product.id}`} passHref>
            <Button variant="outline">Xem chi tiết</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }
  
  function ProductSkeleton() {
    return (
      <Card className="w-full h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <Skeleton className="aspect-square w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-10 w-1/3" />
        </CardFooter>
      </Card>
    )
  }
  
  function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return <p className="text-center text-gray-500">Không có sản phẩm nào được tìm thấy.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }
  
  export default async function ProductListPage() {
    let products: Product[]
  
    try {
      products = await getProducts()
    } catch (error) {
      console.error("Error in ProductListPage:", error)
      notFound()
    }
  
    return (
      <main className="container mx-auto py-8 px-4">
        <BreadcumbComponent breadcrumbPages={breadcrumbPages} />
        <h1 className="text-4xl font-bold mb-8 text-center">Khám phá bộ sưu tập của chúng tôi</h1>
        <AIRecommendations />
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>
          }
        >
          <ProductGrid products={products} />
        </Suspense>
      </main>
    )
}