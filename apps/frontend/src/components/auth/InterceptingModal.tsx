'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
// import { SignInForm } from './SignInForm';
// import { SignUpForm } from './SignUpForm';
import { Skeleton } from '@heroui/skeleton';
import { Suspense } from 'react';

/**
 * Component xử lý hiển thị modal cho Intercepting Routes
 * Sử dụng pathname để xác định route hiện tại
 */
export function InterceptingModal() {
    const pathname = usePathname();
    // const searchParams = useSearchParams();
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <Dialog open={pathname.includes('dang-nhap') || pathname.includes('dang-ky')} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{pathname.includes('dang-nhap') ? 'Đăng nhập' : 'Đăng ký'}</DialogTitle>
                    <DialogDescription>
                        {pathname.includes('dang-nhap') ? 'Vui lòng đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
                    </DialogDescription>
                </DialogHeader>
                <Suspense fallback={<Skeleton className="h-64 w-96" />}>
                    {/* {pathname.includes('dang-nhap') ? <SignInForm /> : null} */}
                    {/* {pathname.includes('dang-ky') ? <SignUpForm /> : null} */}
                </Suspense>
            </DialogContent>
        </Dialog>
    );
}