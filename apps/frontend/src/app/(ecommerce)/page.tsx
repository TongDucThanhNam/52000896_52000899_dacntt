import CarouselComponent from "@/components/homepage/CaroselComponent";
// import ProductReccomend from "@/components/homepage/ProductRecommend";
import ProductCollection from "@/components/products/ProductCollection";
import ProductCollectionErrorBoundary from "@/components/products/ProductCollectionErrorBoundary";
import { Fragment } from "react";

export const dynamic = 'force-dynamic'


export default function Home() {
    return (
        <Fragment>
            {/* Carousel Banner*/}
            <div className={""}>
                <h2 className={"text-2xl font-bold"}>Bộ sưu tập</h2>
                <CarouselComponent />
            </div>

            {/* Recommend product*/}
            <div className={""}>
                <h2 className={"text-2xl font-bold"}>Có thể bạn thích</h2>
                {/*<ProductReccomend/>*/}
            </div>

            {/* Product grid */}
            <div className={""}>
                <ProductCollectionErrorBoundary>
                    <ProductCollection />
                </ProductCollectionErrorBoundary>
            </div>
        </Fragment>
    );
}
