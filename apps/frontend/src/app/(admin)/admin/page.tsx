"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Overview} from "@/components/admin/Overview"
import {RecentTransactions} from "@/components/admin/RecentTransaction"
import {CreditCard, DollarSign, Users} from "lucide-react"
import useSWR from "swr"
import {fetchProducts, fetchTransactions, fetchUsers} from "@/app/actions"
import {priceVietNamDongformetter} from "@/lib/utils";

export default function DashboardPage() {
    const {data: users, error: usersError, isLoading: isUserLoading} = useSWR("users", fetchUsers)
    const {data: products, error: productsError, isLoading: isProductLoading} = useSWR("products", fetchProducts)
    const {
        data: transactions,
        error: transactionsError,
        isLoading: isTransactionLoading
    } = useSWR("transactions", fetchTransactions)

    if (usersError || productsError || transactionsError) {
        return <div>Lỗi khi tải trang dashboard thống kê</div>
    }

    const totalRevenue = transactions ? transactions.reduce((sum, transaction) => sum + transaction.totalValue, 0) : 0;

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-8">
                <div className="flex flex-col space-y-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {
                            users ? (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tổng số người dùng</CardTitle>
                                        <Users/>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{users.length}</div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tổng số người dùng</CardTitle>
                                        <Users/>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">...</div>
                                    </CardContent>
                                </Card>
                            )
                        }

                        {
                            products ? (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tổng số sản phẩm</CardTitle>
                                        <CreditCard/>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{products.length}</div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tổng số sản phẩm</CardTitle>
                                        <CreditCard/>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">...</div>
                                    </CardContent>
                                </Card>
                            )
                        }

                        {
                            transactions ? (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                                        <DollarSign/>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="text-2xl font-bold">{priceVietNamDongformetter(totalRevenue.toString())}</div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                                        <DollarSign/>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">...</div>
                                    </CardContent>
                                </Card>
                            )
                        }


                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Tổng quát</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                {
                                    transactions ? (
                                        <Overview data={transactions}/>
                                    ) : (
                                        <div>Loading...</div>
                                    )
                                }
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Các giao dịch mới nhất</CardTitle>
                                <CardDescription>Dưới đây là các giao dịch mới</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {
                                    transactions ? (
                                        <RecentTransactions transactions={transactions}/>
                                    ) : (
                                        <div>Loading...</div>
                                    )
                                }
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}