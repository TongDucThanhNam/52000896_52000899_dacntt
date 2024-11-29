import CarouselComponent from "@/components/homepage/CaroselComponent";
import ProductReccomend from "@/components/homepage/ProductRecommend";
import ProductGridComponent from "@/components/homepage/ProductGridComponent";

export default function Home() {
    return (
        <main className={"flex flex-col items-center"}>
            {/* Carousel Banner*/}
            <div className={"w-3/4"}>
                <h2 className={"text-2xl font-bold"}>New collection</h2>
                <CarouselComponent/>
            </div>

            {/* Recommend product*/}
            <div className={"w-3/4"}>
                <h2 className={"text-2xl font-bold"}>Recommend for you</h2>
                <ProductReccomend/>
            </div>

            {/* Product grid */}
            <div className={"w-3/4"}>
                <ProductGridComponent/>
            </div>
        </main>
    );
}
