import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import ProductReccomend from "@/components/homepage/ProductRecommend";
import ProductDetail from "../../../../components/products/ProductDetail";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {getProduct} from "@/app/actions";


export default async function ProductDetailPage(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const productId = (await params).id

    try {
        const product = await getProduct(productId)
        return (
            <main className="min-h-screen">
                <div className="container mx-auto py-8">
                    <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>
                    <ProductDetail product={product}/>

                    {/* Product Description Card */}
                    <Card>
                        <CardHeader>Chi tiết sản phẩm</CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">{product.productDescription}</p>
                        </CardContent>
                    </Card>


                    {/* Related Products */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
                        <ProductReccomend/>
                    </div>
                </div>
            </main>
        )
    } catch (error) {
        console.error("Error in ProductDetailPage:", error)
        return (
            <main className="min-h-screen">
                <div className="container mx-auto py-8">
                    <h1 className="text-2xl font-bold mb-4">Lỗi</h1>
                    <p>Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</p>
                    <p>Chi tiết lỗi: {(error as Error).message}</p>
                </div>
            </main>
        )
    }
}