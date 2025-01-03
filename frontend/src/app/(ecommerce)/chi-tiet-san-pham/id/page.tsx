import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import {Button} from "@/components/ui/button";
import {Heart, ShoppingCart} from "lucide-react";
import {Input} from "@/components/ui/input";
import ProductImageCarousel from "@/components/products/ProductImageCarousel";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {priceVietNamDongformetter} from "@/lib/utils";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import ProductCard from "@/components/products/ProductCard";
import ProductReccomend from "@/components/homepage/ProductRecommend";

const relatedProducts = [
    {
        id: 1,
        name: "Áo Thun Nam Cổ Tròn",
        price: 250000,
        category: "Áo thun",
        image: "https://placehold.co/400x400"
    },
    {
        id: 2,
        name: "Áo Polo Nam",
        price: 350000,
        category: "Áo polo",
        image: "https://placehold.co/400x400"
    },
    {
        id: 3,
        name: "Quần Jean Nam",
        price: 450000,
        category: "Quần jean",
        image: "https://placehold.co/400x400"
    },
    {
        id: 4,
        name: "Áo Sơ Mi Nam",
        price: 400000,
        category: "Áo sơ mi",
        image: "https://placehold.co/400x400"
    }
];

export default function ProductDetail() {
    const product = {
        id: "1",
        name: "Áo Thun Nam Cổ Tròn",
        price: 250000,
        sold: 120,
        rating: 4.5,
        description:
            "Áo thun nam cổ tròn chất liệu cotton 100%, thoáng mát, thích hợp cho mọi hoạt động.",
        imageUrls: [
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
            "https://placehold.co/400x400",
        ]
    };

    return (
        <main className="min-h-screen ">
            <div className="container mx-auto py-8">
                <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>

                <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
                    {/* Product Image */}
                    <div className="lg:ml-5">
                        <ProductImageCarousel productId={product.id} imageUrls={product.imageUrls}/>
                    </div>
                    {/* Product Details */}
                    <Card className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-2xl font-semibold text-red-500 mb-4 font-sans">
                            {priceVietNamDongformetter(product.price.toString())}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            Số lượt bán: {product.sold}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            Đánh giá: {product.rating} ⭐
                        </p>

                        {/* Variants choice */}
                        <div className="space-y-4 mb-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-700">Size:</span>
                                <ToggleGroup type="single" variant="neutral" defaultValue="1"
                                             className="flex space-x-2">
                                    {["1", "2", "3"].map((size) => (
                                        <ToggleGroupItem
                                            key={size}
                                            value={size}
                                            aria-label={`Size ${size}`}
                                            className="w-10 h-10 rounded-full data-[state=on]:bg-primary data-[state=on]:bg-main"
                                        >
                                            {size}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center mb-6">
                            <Button
                                variant="neutral"
                                size="icon"
                            >
                                -
                            </Button>
                            <Input
                                type="number"
                                min="1"
                                className="w-24 mx-2 text-center"
                            />
                            <Button
                                variant="neutral"
                                size="icon"
                            >
                                +
                            </Button>
                        </div>

                        {/*  */}
                        <Accordion className={"mb-4"} type="multiple">
                            <AccordionItem className={"mb-2 "} value="item-1">
                                <AccordionTrigger className={"bg-blue-400"}>Thời gian giao hàng ?</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-600">
                                        Thời gian giao hàng dự kiến từ 3-5 ngày.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className={"mb-2"} value="item-2">
                                <AccordionTrigger className={"bg-yellow-200"}>Tôi có được trả hàng không
                                    ?</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-600">
                                        Bạn có thể trả hàng trong vòng 7 ngày.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>


                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button className="flex-1">
                                <ShoppingCart className="mr-2 h-5 w-5"/> Thêm vào giỏ hàng
                            </Button>
                            <Button
                                className="flex-1 bg-red-500 text-white"
                            >
                                Mua ngay
                            </Button>
                            <Button variant="neutral" size="icon">
                                <Heart className="h-5 w-5 text-red-500"/>
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Product Description Card */}
                <Card className="bg-white p-6 rounded-lg shadow mt-8">
                    <CardHeader>
                        <CardTitle className={"text-2xl font-bold mb-4"}>
                            Mô tả sản phẩm
                        </CardTitle>
                    </CardHeader>
                    <p className="text-gray-700">{product.description}</p>
                </Card>

                {/* Related Products */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
                    {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">*/}
                    {/*    {relatedProducts.map((product) => (*/}
                    {/*        <ProductCard key={product.id} product={product}/>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <ProductReccomend length={5}/>
                </div>

            </div>
        </main>
    );
}
