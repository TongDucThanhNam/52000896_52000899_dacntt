"use client"

import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import PaymentCard from "@/components/cart/PaymentCard";
import TransactionSumartCard from "@/components/cart/TransactionSumaryCard";
import {checkoutCart} from "@/app/actions";
import {useState} from "react";
import {useAuthStore} from "@/store/useAuthStore";
import {toast} from "@/hooks/use-toast";
import {useCartStore} from "@/store/useCartStore";
import {useTrackInteraction} from "@/hooks/useTrackInteraction";


export default function CartPage() {
    const {isLoaded, isSignedIn, user} = useAuthStore()
    const {items, removeItem, clearCart} = useCartStore()
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const {trackPurchaseInteraction} = useTrackInteraction()
    const handleCheckout = () => {
        setIsCheckoutModalOpen(true)
    }
    const subtotal = items.reduce((total, item) => total + item.variantPromotionPrice * item.quantity, 0)
    const shippingFee = 25000
    const tax = subtotal * 0.15
    const discount = 0
    const total = subtotal + shippingFee + tax - discount


    const handleConfirmCheckout = async () => {
        try {
            if (!isSignedIn) {
                toast({
                    title: "Vui lòng đăng nhập",
                    description: "Bạn cần đăng nhập để thanh toán",
                    variant: "destructive",
                })
                return
            }

            if (!user?._id) {
                toast({
                    title: "Không lấy được thông tin người dùng",
                    description: "Bạn chờ một lát hoặc đăng nhập lại",
                    variant: "destructive",
                })
                return
            }

            const userId = user?._id

            const result = await checkoutCart(items, total, userId, paymentMethod || "cash")

            if (result.success) {
                // trackInteraction
                items.forEach(item => {
                    console.log("trackPurchaseInteraction", item)
                    trackPurchaseInteraction({
                        productId: item.productId,
                        variantId: item.variantId,
                        interactionScore: 1,
                        interactionContent: "Purchase product",
                    })
                });

                toast({
                    title: "Thanh toán thành công",
                    description: "Cảm ơn bạn đã mua hàng!",
                })
                clearCart()
            } else {
                throw new Error(result.error || "Checkout failed")
            }

        } catch (error) {
            // console.error("Checkout error:", error)
            toast({
                title: "Thanh toán thất bại",
                description: error instanceof Error ? error.message : "Có lỗi xảy ra khi thanh toán",
                variant: "destructive",
            })
        } finally {
            setIsCheckoutModalOpen(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>

                <h1 className="text-3xl font-bold mb-8 mt-4">Giỏ hàng của bạn</h1>


                <div className="min-h-screen bg-background p-4 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Checkout Form */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Transation Info*/}
                                {/*<TransactionForm/>*/}

                                {/* Payment Method */}
                                <PaymentCard paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
                            </div>

                            {/* Transaction Summary */}
                            <div className="lg:col-span-1">
                                <TransactionSumartCard
                                    items={items}
                                    subtotal={subtotal}
                                    shippingFee={shippingFee}
                                    tax={tax}
                                    discount={discount}
                                    total={total}
                                    isLoaded={isLoaded}
                                    removeItem={removeItem}
                                    handleCheckout={handleCheckout}
                                    isCheckoutModalOpen={isCheckoutModalOpen}
                                    setIsCheckoutModalOpen={setIsCheckoutModalOpen}
                                    handleConfirmCheckout={handleConfirmCheckout}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}