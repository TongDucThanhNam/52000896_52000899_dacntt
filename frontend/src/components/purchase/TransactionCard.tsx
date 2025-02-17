"use client"

import {useState} from "react"
import {format} from "date-fns"
import useSWR from "swr"
import {Store, ChevronDown, ChevronUp} from 'lucide-react'
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Transaction, TransactionItem} from "@/types"
import {priceVietNamDongformetter} from "@/lib/utils"
import TransactionItemCard from "@/components/purchase/TransacionItemCard";
import {fetchTransactionItems} from "@/app/actions";

interface TransactionCardProps {
    transaction: Transaction
}

export function TransactionCard({transaction}: TransactionCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const {data: transactionItems, error} = useSWR<TransactionItem[]>(
        isExpanded ? `/api/transactions/${transaction._id}/items` : null,
        fetchTransactionItems
    )

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: "bg-yellow-100 text-yellow-800",
            shipping: "bg-blue-100 text-blue-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            refunded: "bg-gray-100 text-gray-800",
        }
        return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Store className="h-5 w-5"/>
                        <span className="font-semibold">Đơn hàng #{transaction._id}</span>
                    </div>
                    <Badge variant="default" className={getStatusBadge(transaction.orderStatus)}>
                        {transaction.orderStatus.charAt(0).toUpperCase() + transaction.orderStatus.slice(1)}
                    </Badge>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                        {format(new Date(transaction.createdAt), "dd/MM/yyyy")}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          Giá trị đơn hàng:{" "}
                            <span className="font-medium text-foreground">
                            {priceVietNamDongformetter(transaction.totalValue.toString())}
                          </span>
                        </span>
                        {transaction.orderStatus === "delivered" && (
                            <Button variant="outline" size="sm">
                                Mua tiếp
                            </Button>
                        )}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full flex items-center justify-center"
                    onClick={toggleExpand}
                >
                    {isExpanded ? (
                        <>
                            Ẩn <ChevronUp className="ml-2 h-4 w-4"/>
                        </>
                    ) : (
                        <>
                            Xem chi tiết <ChevronDown className="ml-2 h-4 w-4"/>
                        </>
                    )}
                </Button>

                {isExpanded && (
                    <div className="mt-4 space-y-4">
                        {error && <div className="text-red-500">Failed to load transaction items</div>}
                        {!transactionItems && <div>Loading transaction items...</div>}
                        {transactionItems && transactionItems.length === 0 && (
                            <div>Đơn hàng này không có sản phẩm</div>
                        )}
                        {transactionItems &&
                            transactionItems.map((item: TransactionItem) => (
                                <TransactionItemCard key={item._id} item={item}/>
                            ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}