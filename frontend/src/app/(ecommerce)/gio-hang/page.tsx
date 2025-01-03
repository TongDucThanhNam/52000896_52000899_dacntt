import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import PaymentCard from "@/components/cart/PaymentCard";
import TransactionForm from "@/components/cart/TransactionForm";
import TransactionSumartCard from "@/components/cart/TransactionSumaryCard";


export default function GioHang() {
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
                                <TransactionForm/>


                                {/* Payment Method */}
                                <PaymentCard/>
                            </div>

                            {/* Transaction Summary */}
                            <div className="lg:col-span-1">
                                <TransactionSumartCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}