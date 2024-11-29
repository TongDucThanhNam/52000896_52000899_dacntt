"use client"

import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    SliderMainItem
} from "@/components/extension/carousel";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";


export default function ProductReccomend() {
    return (
        <Carousel
            plugins={[
                Autoplay({playOnInit: true, delay: 3000})
            ]}
            carouselOptions={{
                loop: true,
            }}
        >
            <CarouselNext/>
            <CarouselPrevious/>
            <div className="relative">
                <CarouselMainContainer className="h-fit gap-2">
                    {Array.from({length: 10}).map((_, index) => (
                        <SliderMainItem key={index} className="bg-transparent lg:basis-1/5 md:basis-1/3 sm:basis-1/2">
                            <AspectRatio ratio={8 / 11}>
                                <Card className={"h-full w-full"}>
                                    <CardHeader>
                                        <CardTitle>
                                            Our choice
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        Content
                                    </CardContent>
                                    <CardFooter className={"absolute bottom-0 w-full"}>
                                        123
                                    </CardFooter>
                                </Card>
                            </AspectRatio>
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
            </div>
        </Carousel>
    )
}