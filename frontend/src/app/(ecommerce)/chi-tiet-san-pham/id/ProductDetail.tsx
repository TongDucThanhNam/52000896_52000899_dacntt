"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ProductImageCarousel from "@/components/products/ProductImageCarousel"

interface ProductDetailProps {
  product: {
    id: string
    name: string
    price: number
    imageUrls: string[]
    description: string
    sizes: string[]
    rating: number
    sold: number
  }
  formattedPrice: string
}

export default function ProductDetail({ product, formattedPrice }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isFavorite, setIsFavorite] = useState(false)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart`)
    // Implement actual cart functionality here
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  const handleImageZoom = (imageUrl: string) => {
    setZoomedImage(imageUrl)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Product Image */}
      <div className="relative">
        <ProductImageCarousel productId={product.id} imageUrls={product.imageUrls} onImageClick={handleImageZoom} />
        {zoomedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setZoomedImage(null)}
          >
            <div className="relative w-full h-full max-w-4xl max-h-4xl">
              <Image src={zoomedImage || "/placeholder.svg"} alt={product.name} layout="fill" objectFit="contain" />
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold text-red-500 mb-4 font-sans">{formattedPrice}</p>
        <p className="text-sm text-gray-600 mb-2">Số lượt bán: {product.sold}</p>
        <p className="text-sm text-gray-600 mb-4">Đánh giá: {product.rating.toFixed(1)} ⭐</p>

        {/* Size selection */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mb-2 block">Size:</span>
          <ToggleGroup
            type="single"
            value={selectedSize}
            onValueChange={(value) => value && setSelectedSize(value)}
            className="flex space-x-2"
          >
            {product.sizes.map((size) => (
              <ToggleGroupItem
                key={size}
                value={size}
                aria-label={`Size ${size}`}
                className="w-10 h-10 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            className="w-24 mx-2 text-center"
          />
          <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Accordion type="multiple" className="mb-6">
          <AccordionItem value="delivery">
            <AccordionTrigger>Thời gian giao hàng ?</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-600">Thời gian giao hàng dự kiến từ 3-5 ngày.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="return">
            <AccordionTrigger>Tôi có được trả hàng không ?</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-600">Bạn có thể trả hàng trong vòng 7 ngày.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ hàng
          </Button>
          <Button className="flex-1 bg-red-500 text-white">Mua ngay</Button>
          <Button variant={isFavorite ? "default" : "outline"} size="icon" onClick={handleFavoriteToggle}>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}

