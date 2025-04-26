"use client"

import {useEffect, useState} from "react"
import Image from "next/image"
import {priceVietNamDongformetter} from "@/lib/utils"
import type {Product, TransactionItem} from "@/types"
import {getProduct} from "@/app/actions";

interface TransactionItemProps {
    item: TransactionItem
}

export default function TransactionItemCard({item}: TransactionItemProps) {
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getProduct(item.productId).then((data) => {
            setProduct(data)
            setIsLoading(false)
        })
    }, [item.productId])

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    if (error) {
        return <div>Lỗi hoặc đơn hàng không có sản phẩm: {error}</div>
    }

    return (
        <div className="flex items-center gap-4 py-3 border-t">
            <div className="flex-shrink-0 w-16 h-16 relative">
                {product && product.imageUrls && product.imageUrls.length > 0 ? (
                    <Image
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.productName}
                        fill
                        className="object-cover rounded"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">Không có ảnh</span>
                    </div>
                )}
            </div>
            <div className="flex-1">
                <h3 className="font-medium">{product ? product.productName : item.productId}</h3>
                <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
            </div>
            <div className="text-right">
                <p className="font-medium">{priceVietNamDongformetter((item.purchasePrice * item.quantity).toString())}</p>
            </div>
        </div>
    )
}