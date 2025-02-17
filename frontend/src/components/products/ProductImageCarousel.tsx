"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/ui/carousel"

interface ProductImageCarouselProps {
  imageUrls: string[]
}

export default function ProductImageCarousel({ imageUrls }: ProductImageCarouselProps) {
  // const handleImageClick = (index: number) => {
  // }

  return (
    <Carousel className="w-3/4">
      <CarouselNext className="top-1/3 -translate-y-1/3" />
      <CarouselPrevious className="top-1/3 -translate-y-1/3" />
      <CarouselMainContainer className="aspect-square">
        {imageUrls.map((_, index) => (
          <SliderMainItem key={`main-${index}`} className="bg-transparent">
            <img
              // fill={true}
              // unoptimized={true}
              loading={"eager"}
              src={imageUrls[index] || "/placeholder.svg"}
              alt={`Products thumbnail ${index + 1}`}
              // className="w-full h-full object-cover rounded-xl border-2 cursor-pointer"
              // onClick={() => handleImageClick(index)}
            />
          </SliderMainItem >
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer className="w-full mt-4 gap-2">
        {imageUrls.map((url, index) => (
          <SliderThumbItem
            key={`thumb-${index}`}
            index={index}
            className="relative aspect-square overflow-hidden rounded-xl border-2"
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

