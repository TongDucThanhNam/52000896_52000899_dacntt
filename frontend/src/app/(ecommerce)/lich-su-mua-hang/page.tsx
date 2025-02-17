import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import PurchaseHistory from "@/components/purchase/PurchaseHistory";

export default function TransactionHistoryPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Lịch sử mua hàng</h1>
            <Suspense fallback={<PurchaseSkeleton />}>
                <PurchaseHistory />
            </Suspense>
        </div>
    )
}

function PurchaseSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-12 w-1/2" />
        </div>
    )
}