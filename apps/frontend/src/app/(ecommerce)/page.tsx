import CarouselComponent from "@/components/homepage/CaroselComponent";
// import ProductReccomend from "@/components/homepage/ProductRecommend";
import ProductCollection from "@/components/products/ProductCollection";
import ProductCollectionErrorBoundary from "@/components/products/ProductCollectionErrorBoundary";

export const dynamic = 'force-dynamic'


export default function Home() {
    return (
        <main className={"flex flex-col items-center"}>
            {/* Carousel Banner*/}
            <div className={"w-3/4"}>
                <h2 className={"text-2xl font-bold"}>Bộ sưu tập</h2>
                <CarouselComponent/>
            </div>

            {/* Recommend product*/}
            <div className={"w-3/4"}>
                <h2 className={"text-2xl font-bold"}>Có thể bạn thích</h2>
                {/*<ProductReccomend/>*/}
            </div>

            {/* Product grid */}
            <div className={"w-3/4"}>
                <ProductCollectionErrorBoundary>
                    <ProductCollection/>
                </ProductCollectionErrorBoundary>
            </div>
        </main>
    );
}
