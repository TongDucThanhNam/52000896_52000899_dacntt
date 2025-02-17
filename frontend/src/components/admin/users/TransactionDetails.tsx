import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import type {Transaction} from "@/types"
import {Calendar, CreditCard, DollarSign} from "lucide-react"
import {priceVietNamDongFormatter} from "@/lib/utils";

interface TransactionDetailsProps {
    transaction: Transaction
}

export default function TransactionDetails({transaction}: TransactionDetailsProps) {
    const statusColor =
        {
            pending: "bg-yellow-100 text-yellow-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        }[transaction.orderStatus.toLowerCase()] || "bg-gray-100 text-gray-800"

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold">Thông tin đơn hàng</CardTitle>
                        <CardDescription className="text-sm">ID: {transaction._id}</CardDescription>
                    </div>
                    <Badge className={`text-sm px-3 py-1 rounded-full ${statusColor}`}>{transaction.orderStatus}</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400"/>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Cập nhật lúc</p>
                            <p className="text-base font-semibold">{new Date(transaction.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-gray-400"/>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
                            <p className="text-base font-semibold">{priceVietNamDongFormatter(transaction.totalValue.toString())}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-400"/>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Phương thức thanh toán</p>
                            <p className="text-base font-semibold">{transaction.paymentMethod}</p>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}