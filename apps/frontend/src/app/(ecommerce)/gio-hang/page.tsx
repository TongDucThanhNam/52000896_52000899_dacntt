"use client";

import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import { breadcrumbPages } from "@/config/site";
import PaymentCard from "@/components/cart/PaymentCard";
import TransactionSumartCard from "@/components/cart/TransactionSumaryCard";
import { checkoutCart } from "@/app/actions";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { authClient } from "@/lib/auth-client";

export default function CartPage() {
  // const { isLoaded, isSignedIn, user } = useAuthStore()
  const { items, removeItem, clearCart } = useCartStore();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };
  const subtotal = items.reduce(
    (total, item) => total + item.variantPromotionPrice * item.quantity,
    0,
  );
  const shippingFee = 25000;
  const tax = subtotal * 0.15;
  const discount = 0;
  const total = subtotal + shippingFee + tax - discount;
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const handleConfirmCheckout = async () => {
    try {
      if (!session?.user) {
        toast.warning("Vui lòng đăng nhập để thanh toán");
        return;
      }

      if (!session.session.userId) {
        toast.warning("Không tìm thấy thông tin người dùng");
        return;
      }

      const userId = session.session.userId;

      const result = await checkoutCart(
        items,
        total,
        userId,
        paymentMethod || "cash",
      );

      if (result.success) {
        toast.success("Thanh toán thành công");
        clearCart();
      } else {
        toast.error("Thanh toán thất bại");
      }
    } catch (error) {
      // console.error("Checkout error:", error)
      toast.error("Đã xảy ra lỗi trong quá trình thanh toán");
    } finally {
      setIsCheckoutModalOpen(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <BreadcumbComponent breadcrumbPages={breadcrumbPages} />

        <h1 className="text-3xl font-bold mb-8 mt-4">Giỏ hàng của bạn</h1>

        <div className="min-h-screen bg-background p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Transation Info*/}
                {/*<TransactionForm/>*/}

                {/* Payment Method */}
                <PaymentCard
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </div>

              {/* Transaction Summary */}
              <div className="lg:col-span-1">
                <TransactionSumartCard
                  paymentMethod={paymentMethod}
                  items={items}
                  subtotal={subtotal}
                  shippingFee={shippingFee}
                  tax={tax}
                  discount={discount}
                  total={total}
                  isLoaded={!isPending}
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
  );
}
