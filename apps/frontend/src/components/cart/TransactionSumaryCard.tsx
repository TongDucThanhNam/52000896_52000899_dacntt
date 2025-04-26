"use client"

import {Card, CardContent} from "@/components/ui/card"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {X} from "lucide-react"
import {Input} from "@/components/ui/input"
import {priceVietNamDongformetter} from "@/lib/utils"
import {CheckoutModal} from "@/components/cart/CheckoutModal"
import {Fragment} from "react";

interface TransactionSumaryCardProps {
    paymentMethod:string
    items: any[]
    removeItem: (variantId: string, productId: string) => void
    subtotal: number
    shippingFee: number
    tax: number
    discount: number
    total: number
    handleCheckout: () => void
    isLoaded: boolean
    isCheckoutModalOpen: boolean
    setIsCheckoutModalOpen: (isOpen: boolean) => void
    handleConfirmCheckout: () => void
}

export default function TransactionSumaryCard(
    {
        paymentMethod,
        items,
        removeItem,
        subtotal,
        shippingFee,
        tax,
        discount,
        total,
        handleCheckout,
        isLoaded,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        handleConfirmCheckout,
    }: TransactionSumaryCardProps
) {
    return (
        <Fragment>
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        {/* Sản phẩm trong giỏ hàng */}
                        <div className="space-y-4">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <div key={item.variantId} className="flex gap-4">
                                        <div className="relative h-20 w-20 rounded-lg bg-muted">
                                            <Image
                                                src={item.imageUrl || "/placeholder.svg"}
                                                alt={item.productName}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-semibold">{item.productName}</h3>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => removeItem(item.variantId, item.productId)}
                                                >
                                                    <X className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="font-semibold">
                                                    {priceVietNamDongformetter(item.variantPromotionPrice.toString())}
                                                </p>
                                                <p className="text-sm text-muted-foreground">x {item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">Giỏ hàng của bạn đang trống.</p>
                            )}
                        </div>

                        {/* Mã giảm giá */}
                        <div className="flex gap-2">
                            <Input placeholder="Nhập mã giảm giá" className="bg-muted"/>
                            <Button variant="secondary">Áp dụng</Button>
                        </div>

                        {/* Tóm tắt */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Tạm tính</p>
                                <p className="font-semibold">{priceVietNamDongformetter(subtotal.toString())}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Phí giao hàng</p>
                                <p className="font-semibold">{priceVietNamDongformetter(shippingFee.toString())}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Thuế (15%)</p>
                                <p className="font-semibold">{priceVietNamDongformetter(tax.toFixed(2))}</p>
                            </div>
                            <div className="flex justify-between text-green-500">
                                <p>Giảm giá</p>
                                <p>-{priceVietNamDongformetter(discount.toString())}</p>
                            </div>
                            <div className="flex justify-between border-t pt-4">
                                <p className="font-semibold">Tổng cộng</p>
                                <p className="font-semibold">{priceVietNamDongformetter(total.toString())}</p>
                            </div>
                        </div>

                        <Button
                            disabled={!isLoaded}
                            className="w-full" size="lg" onClick={handleCheckout}>
                            Thanh toán
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <CheckoutModal
                paymentMethod={paymentMethod}
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onConfirm={handleConfirmCheckout}
                items={items}
                total={total}
            />
        </Fragment>
    )
}