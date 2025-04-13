import { fetchTransactions } from "@/app/actions"
import ManageTransactionTable from "@/components/admin/transactions/ManageTransactionTable"

export const dynamic = 'force-dynamic'

export default async function TransactionPage() {
    const transactions = await fetchTransactions()

    if (!transactions) {
        return (
            <div>
                <h1>Lỗi khi tìm danh sách giao dịch</h1>
            </div>
        )
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Quản lý giao dịch</h1>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm px-4">
                <ManageTransactionTable transactions={transactions} />
            </div>
        </main>
    )
}