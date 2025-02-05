import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import {Button} from "@/components/ui/button";
import {Heart, ShoppingCart} from "lucide-react";
import {Input} from "@/components/ui/input";
import ProductImageCarousel from "@/components/products/ProductImageCarousel";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {priceVietNamDongformetter} from "@/lib/utils";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ProductCard from "@/components/products/ProductCard";
import ProductReccomend from "@/components/homepage/ProductRecommend";
import { notFound } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import ProductDetail from "./ProductDetail";


interface Product {
    id: string
    name: string
    price: number
    imageUrls: string[]
    description: string
    sizes: string[]
    rating: number
    sold: number
  }
  async function getProduct(id: string): Promise<Product> {
    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      })
  
      if (!res.ok) {
        if (res.status === 500) {
          throw new Error("Lỗi máy chủ nội bộ. Vui lòng thử lại sau.")
        }
        throw new Error(`HTTP error! status: ${res.status}`)
      }
  
      const product = await res.json()
  
      if (!product || typeof product !== "object") {
        throw new Error("Dữ liệu sản phẩm không hợp lệ")
      }
  
      return {
        id: product.id?.toString() ?? "",
        name: product.name || "Chưa có tên",
        price: product.price || 0,
        imageUrls: product.imageUrls || ["/placeholder.svg"],
        description: product.description || "Chưa có mô tả",
        sizes: product.sizes || ["S", "M", "L"],
        rating: product.rating || 0,
        sold: product.sold || 0,
      }
    } catch (error) {
      console.error("Lỗi khi tải thông tin sản phẩm:", error)
      throw error
    }
  }
  
  export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    try {
      const product = await getProduct(params.id)
      return (
        <main className="min-h-screen">
          <div className="container mx-auto py-8">
            <BreadcumbComponent breadcrumbPages={breadcrumbPages} />
            <ProductDetail product={product} formattedPrice={priceVietNamDongformetter(product.price.toString())} />
            {/* Product Description Card */}
            <div className="bg-white p-6 rounded-lg shadow mt-8">
              <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
  
            {/* Related Products */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
              <ProductReccomend length={5} />
            </div>
          </div>
        </main>
      )
    } catch (error) {
      console.error("Error in ProductDetailPage:", error)
      return (
        <main className="min-h-screen">
          <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Lỗi</h1>
            <p>Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</p>
            <p>Chi tiết lỗi: {(error as Error).message}</p>
          </div>
        </main>
      )
    }
}
