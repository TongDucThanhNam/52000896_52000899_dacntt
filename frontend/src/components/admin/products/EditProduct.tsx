"use client"

import {Button} from "@/components/ui/button";
import {ArrowUpIcon, ChevronLeft} from "lucide-react";
import ProductDetailsForm from "@/components/admin/products/ProductDetailsForm";
import VariantsForm from "@/components/admin/products/VariantsForm";
import React, {useCallback, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {ProductAttributes, Variant} from "@/types";
import {updateProduct} from "@/app/actions";
import {useRouter} from "next/navigation";

interface EditProductProps {
    product: any,
    myVariants: any
}

export default function EditProduct(
    {
        product,
        myVariants
    }: EditProductProps
) {
    const {toast} = useToast()
    const router = useRouter()

    const scrollToTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

    // product's attributes
    const [productAttributes, setProductAttributes] = useState<ProductAttributes>(product)

    // variants
    const [variants, setVariants] = useState<Variant[]>(myVariants)


    // Submit create product
    const handleSubmit = async () => {
        // Update product and variants detail:

        try {
            const result = await updateProduct({
                productId: product._id,
                productName: productAttributes.productName,
                productDescription: productAttributes.productDescription,
                productBrand: productAttributes.productBrand,
                imageUrls: productAttributes.imageUrls,
                categoryId: productAttributes.categoryId,
                productTag: productAttributes.productTag || [],
                variants: variants,
            });

            if (result.success) {
                toast(
                    {
                        title: 'Cập nhật sản phẩm thành công',
                        description: 'Sản phẩm đã được cập nhật',
                        variant: "default",
                    }
                )
            } else {
                toast(
                    {
                        title: 'Cập nhật sản phẩm thất bại',
                        description: 'Sản phẩm chưa được cập nhật',
                        variant: "destructive",
                    }
                )
            }
        } catch (error) {
            toast(
                {
                    title: 'Có lỗi xảy ra',
                    description: `Lỗi: ${error}`,
                    variant: "destructive",
                }
            )
        }
    }

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-3/4 max-w-3/4 flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => router.back()}
                        variant="neutral" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4"/>
                        <span className="sr-only">Trở về</span> </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Sửa sản phẩm
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="neutral" size="sm">
                            Hủy
                        </Button>
                        <Button size="sm"
                                onClick={handleSubmit}
                        >Lưu sản phẩm</Button>
                    </div>
                </div>
                <div className="grid gap-4 ">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <ProductDetailsForm productAttributes={productAttributes}
                                            setProductAttributes={setProductAttributes}/>

                        <VariantsForm variants={variants} setVariants={setVariants}/>

                        <div>
                            <Button
                                className="fixed bottom-4 right-4"
                                onClick={scrollToTop}
                                aria-label="Scroll to top"
                            >
                                <ArrowUpIcon className="h-4 w-4"/>
                                <span className="ml-2">Lưu sản phẩm</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Hủy
                    </Button>

                    <Button
                        size="sm"
                        onClick={handleSubmit}
                    >
                        Lưu sản phẩm
                    </Button>
                </div>
            </div>
        </main>
    )
}