import { notFound } from "next/navigation"
import TransactionDetail from "@/components/admin/transactions/TransactionDetail"
import fetchTransactionById from "@/app/actions";

export default async function TransactionDetailPage(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const transactionId = (await params).id

    try {
        const transaction = await fetchTransactionById(transactionId)
        // console.log(transaction)

        if (!transaction) {
            return notFound()
        }

        return (
            <div className="container mx-auto py-8 w-3/4">
                <h1 className="text-2xl font-bold mb-6">Chi Tiết Giao Dịch</h1>
                <TransactionDetail transaction={transaction} />
            </div>
        )
    } catch (error) {
        console.error("Lỗi khi tải thông tin giao dịch:", error)
        return (
            <div className="container mx-auto py-8 ">
                <h1 className="text-2xl font-bold mb-6">Chi Tiết Giao Dịch</h1>
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Không thể tải thông tin giao dịch. Vui lòng thử lại sau.
                </div>
            </div>
        )
    }
}

