'use client';

import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

// Hàm fetch dữ liệu cài đặt từ API
async function fetchSettings() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`);
    return res.json();
}

export default function SettingPage() {
    // Sử dụng React Query để fetch dữ liệu
    const { data, isLoading, error } = useQuery({
        queryKey: ['settings'],
        queryFn: fetchSettings
    });

    if (isLoading) {
        return (
            <div className="space-y-4 p-6">
                <Skeleton className="h-10 w-1/3" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error loading settings</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>

            {/* Section Thông tin cá nhân */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
                {/* Form thông tin cá nhân sẽ được thêm vào đây */}
            </div>

            {/* Section Cài đặt tài khoản */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Cài đặt tài khoản</h2>
                {/* Form cài đặt tài khoản sẽ được thêm vào đây */}
            </div>

            {/* Section Bảo mật */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Bảo mật</h2>
                {/* Form bảo mật sẽ được thêm vào đây */}
            </div>

            {/* Section Tùy chọn hệ thống */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Tùy chọn hệ thống</h2>
                {/* Form tùy chọn hệ thống sẽ được thêm vào đây */}
            </div>
        </div>
    );
}