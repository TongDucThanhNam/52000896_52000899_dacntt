"use client"

import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    SliderMainItem,
} from "@/components/ui/carousel"
import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {useAuthStore} from "@/store/useAuthStore"
import {useRouter} from "next/navigation";
import useSWR from "swr"
import {fetchRecommendations} from "@/app/actions";

interface Product {
    productId: string
    productName: string
    mainProductImageURL: string
}

export default function ProductReccomend() {
    const {isLoaded, isSignedIn, user} = useAuthStore()
    const router = useRouter()

    const {data: products, error} = useSWR<Product[]>(
        `/recommendations/${user?._id}`,
        fetchRecommendations,
    )

    if (!isLoaded || !isSignedIn || !user || !products || error) {
        return
    }

    return (
        <Carousel
            plugins={[Autoplay({playOnInit: true, delay: 3000})]}
            carouselOptions={{
                loop: true,
            }}
            className="w-full"
        >
            <CarouselNext className="hidden md:flex"/>
            <CarouselPrevious className="hidden md:flex"/>
            <div className="relative px-4">
                <CarouselMainContainer className="h-fit gap-4">
                    {products.map((product) => (
                        <SliderMainItem key={product.productId}
                                        className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full p-1"
                        >
                            <Card>
                                <CardHeader className="p-4 pb-2">
                                    <h3 className="font-medium text-sm leading-tight line-clamp-2 text-center">{product.productName}</h3>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <AspectRatio ratio={1}>
                                        <Image
                                            src={
                                                product.mainProductImageURL ||
                                                `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.productName) || "/placeholder.svg"}`
                                            }
                                            alt={product.productName}
                                            fill
                                            className="object-cover"
                                            onClick={() => router.push(`/chi-tiet-san-pham/${product.productId}`)}
                                        />
                                    </AspectRatio>
                                </CardContent>
                            </Card>
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
            </div>
        </Carousel>
    )
}