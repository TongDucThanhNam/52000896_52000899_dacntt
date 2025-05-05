'use client';

import { SignUpForm } from '@/components/auth/SignUpForm';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@heroui/skeleton';
import { Suspense } from 'react';

/**
 * Component xử lý hiển thị modal đăng ký khi intercept route
 */
export default function RegisterModal() {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <Dialog open={true} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Đăng ký</DialogTitle>
                    <DialogDescription>Tạo tài khoản mới</DialogDescription>
                </DialogHeader>
                <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                    <SignUpForm />
                </Suspense>
            </DialogContent>
        </Dialog>
    );
}