import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Product } from "@/types";
import { getCategoryName } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get the lowest price from variants if available
  const getLowestPrice = () => {
    if (!product.variants || product.variants.length === 0) {
      return null;
    }

    const prices = product.variants.map(
      (v) => v.variantPromotionPrice || v.variantPrice,
    );
    return Math.min(...prices);
  };

  // Get the original price (before promotion) if available
  const getOriginalPrice = () => {
    if (!product.variants || product.variants.length === 0) {
      return null;
    }

    const variant = product.variants.find((v) => v.variantPromotionPrice);
    return variant ? variant.variantPrice : null;
  };

  const lowestPrice = getLowestPrice();
  const originalPrice = getOriginalPrice();
  const hasDiscount =
    originalPrice && lowestPrice && originalPrice > lowestPrice;

  return (
    <Card className="group flex h-[460px] overflow-hidden transition-all duration-300 hover:shadow-lg rounded-lg">
      {/* Remove any potential border radius at the top to make image flush with card edge */}
      <div className="w-full h-full relative overflow-hidden rounded-t-lg">
        <Image
          src={product.imageUrls[0] || "/placeholder.svg?height=500&width=500"}
          alt={product.productName}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
          style={{
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          }}
        />

        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Quick add to cart</span>
          </Button>
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {Math.round(((originalPrice - lowestPrice) / originalPrice) * 100)}%
            OFF
          </Badge>
        )}
      </div>

      <CardContent className="flex-grow p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="neutral" className="text-xs font-normal">
            {getCategoryName(product.categoryId)}
          </Badge>
          {product.productBrand && (
            <span className="text-xs text-muted-foreground">
              {product.productBrand}
            </span>
          )}
        </div>

        <h3 className="text-lg font-medium mb-2 line-clamp-2 h-14 group-hover:text-primary transition-colors">
          {product.productName}
        </h3>

        {lowestPrice && (
          <div className="mt-auto flex items-center gap-2">
            <span className="font-bold text-lg">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(lowestPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(originalPrice)}
              </span>
            )}
          </div>
        )}
      </CardContent>

      {/* Button at the very bottom */}
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link
          href={`/chi-tiet-san-pham/${product.id || product.productId}`}
          className="w-full"
        >
          <Button className="w-full font-medium transition-all hover:shadow-md">
            Chi tiết sản phẩm
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
