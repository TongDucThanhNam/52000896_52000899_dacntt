import type {Transaction} from "@/types"
import {Badge} from "@/components/ui/badge"
import {Calendar, CreditCard, DollarSign} from "lucide-react"
import {format} from "date-fns"
import {priceVietNamDongFormatter} from "@/lib/utils";
import {Card} from "@/components/ui/card";

interface RecentTransactionsProps {
    transactions: Transaction[]
}

export function RecentTransactions({transactions}: RecentTransactionsProps) {
    // sort by lastest and get 7 lastest
    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    transactions = transactions.slice(0, 7)

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <Card
                        key={transaction._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4"
                    >
                        <div className="flex items-center mb-2 sm:mb-0">
                            <DollarSign className="mr-2 h-5 w-5 text-gray-500"/>
                            <span className="font-medium">
                                {priceVietNamDongFormatter(transaction.totalValue.toString())}
                            </span>
                        </div>
                        <div className="flex items-center mb-2 sm:mb-0">
                            <CreditCard className="mr-2 h-5 w-5 text-gray-500"/>
                            <span>{transaction.paymentMethod}</span>
                        </div>
                        <div className="mb-2 sm:mb-0">
                            <Badge>
                                {transaction.orderStatus}
                            </Badge>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-gray-500"/>
                            <span>{format(new Date(transaction.createdAt), "dd/MM/yyyy")}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}