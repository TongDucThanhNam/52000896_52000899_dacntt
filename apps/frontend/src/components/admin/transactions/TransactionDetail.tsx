"use client"

import {useState} from "react"
import {Calendar, Check, ChevronDown, ChevronUp, CreditCard, Loader2, Package, User} from "lucide-react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Skeleton} from "@/components/ui/skeleton"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import TransactionItemTable from "@/components/admin/transactions/TransactionItemTable"
import type {Transaction, TransactionItem} from "@/types"
import useSWR from "swr"
import {fetchTransactionItems, updateTransactionStatus} from "@/app/actions"
import {useToast} from "@/hooks/use-toast";
import {priceVietNamDongFormatter} from "@/lib/utils";
import {useRouter} from "next/navigation"

interface TransactionDetailProps {
    transaction: Transaction
}

export default function TransactionDetail({transaction}: TransactionDetailProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(transaction.orderStatus)
    const [isUpdating, setIsUpdating] = useState(false)

    const {toast} = useToast()
    const router = useRouter()
    const {
        data: transactionItems,
        error,
        isLoading,
    } = useSWR<TransactionItem[]>(isExpanded ? `/api/transactions/${transaction.id}/items` : null, fetchTransactionItems)

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Hoàn thành"
            case "pending":
                return "Đang xử lý"
            case "cancelled":
                return "Đã hủy"
            default:
                return status
        }
    }

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return

        setIsUpdating(true)
        try {
            const result = await updateTransactionStatus(transaction.id, newStatus)

            // console.log("Update transaction status result:", result)

            if (result) {
                setCurrentStatus(newStatus)
                toast({
                    title: "Thành công",
                    description: "Đã cập nhật trạng thái giao dịch",
                    variant: "default",
                })
                router.back()
            } else {
                toast({
                    title: "Lỗi",
                    description: result.message || "Không thể cập nhật trạng thái",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Đã xảy ra lỗi khi cập nhật trạng thái",
                variant: "destructive",
            })
        } finally {
            setIsUpdating(false)
        }
    }

    const statusOptions = [
        {value: "pending", label: "Đang xử lý"},
        {value: "shipping", label: "Đang giao hàng"},
        {value: "done", label: "Đã giao"}
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Giao dịch #{transaction.id}</CardTitle>
                            <CardDescription>Tạo
                                ngày {new Date(transaction.createdAt).toLocaleDateString("vi-VN")}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge>{getStatusText(currentStatus)}</Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="default" size="sm" disabled={isUpdating}>
                                        {isUpdating ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                                        ) : (
                                            <ChevronDown className="h-4 w-4 mr-2"/>
                                        )}
                                        Thay đổi trạng thái
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {statusOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => handleStatusChange(option.value)}
                                            className="flex items-center gap-2"
                                            disabled={option.value === currentStatus}
                                        >
                                            {option.value === currentStatus &&
                                                <Check className="h-4 w-4 text-primary"/>}
                                            <span
                                                className={option.value === currentStatus ? "font-medium" : ""}>{option.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Mã người dùng:</span>
                            <span className="font-medium">{transaction.userId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Ngày cập nhật:</span>
                            <span
                                className="font-medium">{new Date(transaction.updatedAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Phương thức thanh toán:</span>
                            <span className="font-medium">{transaction.paymentMethod}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground"/>
                            <span className="text-sm text-muted-foreground">Trạng thái hoạt động:</span>
                            <Badge variant={transaction.isActive ? "default" : "neutral"}>
                                {transaction.isActive ? "Hoạt động" : "Không hoạt động"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start border-t pt-6">
                    <div className="flex justify-between w-full mb-4">
                        <span className="text-lg font-semibold">Tổng giá trị:</span>
                        <span className="text-lg font-bold">{priceVietNamDongFormatter(transaction.totalValue.toString())}</span>
                    </div>
                    <Button
                        variant="neutral"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="h-4 w-4"/> Ẩn chi tiết sản phẩm
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4"/> Xem chi tiết sản phẩm
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            {isExpanded && (
                <Card>
                    <CardHeader>
                        <CardTitle>Chi tiết sản phẩm</CardTitle>
                        <CardDescription>Danh sách các sản phẩm trong giao dịch này</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-full"/>
                                <Skeleton className="h-20 w-full"/>
                                <Skeleton className="h-20 w-full"/>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                Không thể tải chi tiết sản phẩm. Vui lòng thử lại sau.
                            </div>
                        ) : transactionItems && transactionItems.length > 0 ? (
                            <TransactionItemTable items={transactionItems}/>
                        ) : (
                            <div className="text-center py-6 text-muted-foreground">Không có chi tiết sản phẩm
                                nào.</div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

