"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/extension/carousel"

interface ProductImageCarouselProps {
  imageUrls: string[]
  productId: string
  onImageClick?: (imageUrl: string) => void
}

export default function ProductImageCarousel({ imageUrls, productId, onImageClick }: ProductImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(imageUrls[index])
    }
  }

  return (
    <Carousel className="w-3/4">
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="aspect-square">
        {imageUrls.map((url, index) => (
          <SliderMainItem key={`main-${productId}-${index}`} className="bg-transparent">
            <Image
              fill={true}
              unoptimized={true}
              loading={"eager"}
              src={url || "/placeholder.svg"}
              alt={`Products thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-xl border-2 cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer className="w-full mt-4 gap-2">
        {imageUrls.map((url, index) => (
          <SliderThumbItem
            key={`thumb-${productId}-${index}`}
            index={index}
            className="relative aspect-square overflow-hidden rounded-xl border-2"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              width={200}
              height={200}
              src={url || "/placeholder.svg"}
              unoptimized={true}
              alt={`Product image ${index + 1}`}
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 20vw"
              priority={index === 0}
            />
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  )
}

