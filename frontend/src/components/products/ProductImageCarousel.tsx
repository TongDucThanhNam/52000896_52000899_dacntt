import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
} from "@/components/extension/carousel";
import Image from "next/image";

interface ProductImageCarouselProps {
    imageUrls: string[];
    productId: string;
}

export default function ProductImageCarousel({
                                                 imageUrls,
                                             }: ProductImageCarouselProps) {
    return (
        <Carousel className="w-3/4">
            <CarouselNext className="top-1/3 -translate-y-1/3"/>
            <CarouselPrevious className="top-1/3 -translate-y-1/3"/>
            <CarouselMainContainer className="aspect-square">
                {imageUrls.map((_, index) => (
                    <SliderMainItem key={index} className="bg-transparent">
                        <Image
                            fill={true}
                            unoptimized={true}
                            loading={"eager"}
                            src={`${imageUrls[index]}`}
                            alt={`Products thumbnail ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl border-2"
                        />
                    </SliderMainItem>
                ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer
                className="w-full mt-4 gap-2">
                {imageUrls.map((url, index) => (
                    <SliderThumbItem
                        key={index}
                        index={index}
                        className="relative aspect-square overflow-hidden rounded-xl border-2">
                        <Image
                            width={200}
                            height={200}
                            src={url}
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
    );
};