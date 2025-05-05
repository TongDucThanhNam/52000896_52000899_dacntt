"use client";

import { useState } from "react";
import useSWR from "swr";
import { Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Transaction } from "@/types";
import { TransactionCard } from "./TransactionCard";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchUserTransactions } from "@/app/actions";
import { authClient } from "@/lib/auth-client";

export default function PurchaseHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  // const { isLoaded, isSignedIn, user } = useAuthStore()
  const {
    data: session,
    isPending, //loading state
    // error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const { data: transactions, error } = useSWR<Transaction[]>(
    !isPending && session?.user
      ? `/api/users/${session.user.id}/transactions`
      : null,
    fetchUserTransactions,
  );

  if (isPending) return <div>Đang tải...</div>;
  if (!session) return <div>Bạn phải đăng nhập.</div>;
  if (error) return <div>Có lỗi</div>;
  if (!transactions) return <div>Đang tải các giao dịch...</div>;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (currentTab === "all") return matchesSearch;
    return transaction.orderStatus === currentTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-3 sm:grid-cols-4 h-auto">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="pending">Chưa thanh toán</TabsTrigger>
          <TabsTrigger value="shipping">Đang giao hàng</TabsTrigger>
          <TabsTrigger value="done">Đã giao</TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab} className="space-y-4 mt-4">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">
                Không có đơn hàng nào ở đây
              </h3>
              <p className="text-muted-foreground">
                Chúng tôi không tìm thấy đơn hàng nào ở đây
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
