"use client"

import { useMemo, useState, useEffect } from "react"
import useSWR from "swr"
import { getVariantsOfProduct } from "@/app/actions"
import type { Variant } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ProductVariantDetailProps {
    productId: string
    setProductPrice: (price: string) => void
    setVariantChosen: (variant: Variant | null) => void
}

export default function ProductVariantDetail({
                                                 productId,
                                                 setProductPrice,
                                                 setVariantChosen,
                                             }: ProductVariantDetailProps) {
    const {
        data: variants,
        error,
        isLoading,
    } = useSWR<Variant[]>(`/api/products/${productId}/variants`, () => getVariantsOfProduct(productId))

    const [selectedColor, setSelectedColor] = useState<string>("")
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [selectedMaterial, setSelectedMaterial] = useState<string>("")

    // Group variants by their distinguishing attributes
    const variantGroups = useMemo(() => {
        if (!variants) return null

        const hasColorDifference = variants.some((v) => v.variantColor !== variants[0].variantColor)
        const hasSizeDifference = variants.some((v) => v.variantSize !== variants[0].variantSize)
        const hasMaterialDifference = variants.some((v) => v.variantMaterial !== variants[0].variantMaterial)

        const uniqueColors = [...new Set(variants.map((v) => v.variantColor))]
        const uniqueSizes = [...new Set(variants.map((v) => v.variantSize))]
        const uniqueMaterials = [...new Set(variants.map((v) => v.variantMaterial))]

        return {
            colors: hasColorDifference ? uniqueColors : null,
            sizes: hasSizeDifference ? uniqueSizes : null,
            materials: hasMaterialDifference ? uniqueMaterials : null,
        }
    }, [variants])

    // Set initial selections when variants are loaded
    useEffect(() => {
        if (variants && variants.length > 0) {
            if (!selectedColor && variantGroups?.colors) {
                setSelectedColor(variantGroups.colors[0])
            }
            if (!selectedSize && variantGroups?.sizes) {
                setSelectedSize(variantGroups.sizes[0])
            }
            if (!selectedMaterial && variantGroups?.materials) {
                setSelectedMaterial(variantGroups.materials[0])
            }
        }
    }, [variants, variantGroups, selectedColor, selectedSize, selectedMaterial])

    // Update product price and chosen variant when all variant types are selected
    useEffect(() => {
        if (variants && selectedColor && selectedSize && (!variantGroups?.materials || selectedMaterial)) {
            const matchingVariant = variants.find(
                (v) =>
                    v.variantColor === selectedColor && v.variantSize === selectedSize && (!variantGroups?.materials || v.variantMaterial === selectedMaterial),
            )

            if (matchingVariant) {
                setProductPrice(matchingVariant.variantPrice.toString())
                setVariantChosen(matchingVariant)
            }
        }
    }, [variants, selectedColor, selectedSize, selectedMaterial, setProductPrice, setVariantChosen, variantGroups])

    if (isLoading) {
        return <Skeleton className="w-full h-[200px]" />
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Có lỗi</AlertTitle>
                <AlertDescription>Có lỗi khi tìm các biến thể của sản phẩm</AlertDescription>
            </Alert>
        )
    }

    if (!variants || variants.length === 0) {
        return (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Không có biến thể</AlertTitle>
                <AlertDescription>Sản phẩm này chưa cập nhật biến thể hoặc đã hết hàng.</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-6">
            {variantGroups?.colors && (
                <div className="space-y-3">
                    <h3 className="font-medium">Màu sắc</h3>
                    <div className="flex flex-wrap gap-2">
                        {variantGroups.colors.map((color) => (
                            <Button
                                key={color}
                                variant="neutral"
                                className={cn(
                                    "rounded-full px-4 py-2",
                                    selectedColor === color && "bg-primary text-primary-foreground",
                                )}
                                onClick={() => setSelectedColor(color)}
                            >
                                {color}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {variantGroups?.sizes && (
                <div className="space-y-3">
                    <h3 className="font-medium">Kích thước</h3>
                    <div className="flex flex-wrap gap-2">
                        {variantGroups.sizes.map((size) => (
                            <Button
                                key={size}
                                variant="neutral"
                                className={cn("px-4 py-2", selectedSize === size && "bg-primary text-primary-foreground")}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {variantGroups?.materials && (
                <div className="space-y-3">
                    <h3 className="font-medium">Chất liệu</h3>
                    <div className="flex flex-wrap gap-2">
                        {variantGroups.materials.map((material) => (
                            <Button
                                key={material}
                                variant="neutral"
                                className={cn("px-4 py-2", selectedMaterial === material && "bg-primary text-primary-foreground")}
                                onClick={() => setSelectedMaterial(material)}
                            >
                                {material}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}