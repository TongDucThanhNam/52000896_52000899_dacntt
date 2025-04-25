import {Suspense} from "react"
import {ArrowLeft} from 'lucide-react'
import Link from "next/link"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"
import TransactionDetails from "@/components/admin/users/TransactionDetails";
import {Transaction} from "@/types";

async function getTranactionOfUser(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/transactions`)
    if (!res.ok) {
        throw new Error('Lỗi khi tìm giao dịch của người dùng')
    }
    return res.json()
}

function TransactionDetailsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2"/>
                <Skeleton className="h-4 w-1/3"/>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-2/3"/>
            </CardContent>
        </Card>
    )
}


export default async function ViewUserTransactionsPage(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const userId = (await params).id
    let transactions
    try {
        transactions = await getTranactionOfUser(userId)
    } catch (error) {
        throw new Error(`Lỗi khi tìm giao dịch của người dùng: ${error}`)
    }

    return (
        <div className="container mx-auto py-8 w-3/4">
            <div className="mb-6">
                <Button asChild variant="ghost">
                    <Link href={"/admin/quan-ly-nguoi-dung/"}>
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Trở về danh sách người dùng
                    </Link>
                </Button>
            </div>
            <h1 className="mb-6 text-3xl font-bold">Lịch sử giao dịch của người dùng </h1>

            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                <Suspense fallback={<TransactionDetailsSkeleton/>}>
                    {transactions.map((transaction: Transaction) => (
                        <TransactionDetails key={transaction.id} transaction={transaction}/>
                    ))}
                </Suspense>
            </div>
        </div>
    )
}