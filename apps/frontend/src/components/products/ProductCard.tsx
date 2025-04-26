import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Product } from "@/types"
import { getCategoryName } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-[460px]">
      <CardHeader className="p-0">
        <div className="relative h-52 w-full">
          <img
            src={product.imageUrls[0] || "https://placehold.co/500x500"}
            alt={product.productName}
            // fill={true}
            className="rounded-t-lg object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2 h-14">{product.productName}</CardTitle>
        <Badge variant="neutral" className="mb-2">
          {getCategoryName(product.categoryId)}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/chi-tiet-san-pham/${product.id}`} className="w-full">
          <Button className="w-full font-bold">Chi tiết sản phẩm</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

