"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Tạo instance QueryClient mới
const queryClient = new QueryClient();

/**
 * Provider component để cung cấp QueryClient cho toàn bộ ứng dụng
 * @param children - Các component con
 */
export default function Providers({
    children,
}: {
    children: ReactNode
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
