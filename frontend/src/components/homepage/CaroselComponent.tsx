import {
    Carousel,
    CarouselIndicator,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
} from "@/components/ui/carousel";

const CarouselComponent = () => {
    return (
        <Carousel
            carouselOptions={{
                    loop: true,
                }}
        >
            <CarouselNext/>
            <CarouselPrevious/>
            <div className="relative ">
                <CarouselMainContainer className="h-60">
                    {Array.from({length: 3}).map((_, index) => (
                        <SliderMainItem key={index} className="bg-transparent">
                            <img
                                src={`/banner_${index}.png`}

                                className="border-2 size-full flex items-center justify-center rounded-xl bg-background"/>

                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <CarouselThumbsContainer className="gap-x-1 ">
                        {Array.from({length: 3}).map((_, index) => (
                            <CarouselIndicator key={index} index={index}/>
                        ))}
                    </CarouselThumbsContainer>
                </div>
            </div>
        </Carousel>
    );
};

export default CarouselComponent;
