"use client"

import {Button} from "@/components/ui/button";
import {ArrowUpIcon, ChevronLeft} from "lucide-react";
import React, {useCallback, useState} from "react";
import {ProductAttributes, Variant} from "@/types";
import ProductDetailsForm from "@/components/admin/products/ProductDetailsForm";
import VariantsForm from "@/components/admin/products/VariantsForm";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

export default function AddProductPage() {
    const {toast} = useToast()
    const router = useRouter()


    const scrollToTop = useCallback(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

    // product's attributes
    const [productAttributes, setProductAttributes] = useState<ProductAttributes>({
        productName: '',
        productSlug: '',
        productDescription: '',
        productBrand: '',
        imageUrls: [],
        categoryId: '675ef491210adaed736cea7e',
        productAvgRating: 0,
        productTotalViews: 0,
    })

    // variants
    const [variants, setVariants] = useState<Variant[]>([])

    // Submit create product
    const handleSubmit = async () => {
        const productData = {
            ...productAttributes,
            variants: variants
        };

        // console.log('Product Data:', JSON.stringify(productData, null, 2));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/variants`, {  // Changed this line
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.status}`);
            }

            toast({
                variant: "default",
                title: "Thêm sản phẩm thành công",
                description: `Sản phẩm ${productAttributes.productName} đã được thêm thành công`,
            })
        } catch (error) {
            toast(
                {
                    variant: "destructive",
                    title: "Thêm sản phẩm thất bại",
                    description: `Sản phẩm ${productAttributes.productName} đã được thêm thất bại, ${error}`,
                }
            )
        }
    }

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-3/4 flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="neutral" size="icon" className="h-7 w-7"
                            onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        <span className="sr-only">Trở về</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Thêm sản phẩm
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="neutral" size="sm">
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