'use client';

import { SignInForm } from '@/components/auth/SignInForm';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

/**
 * Component xử lý hiển thị modal đăng nhập khi intercept route
 */
export default function LoginModal() {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <Dialog open={true} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Đăng nhập</DialogTitle>
                    <DialogDescription>Vui lòng đăng nhập để tiếp tục</DialogDescription>
                </DialogHeader>
                <SignInForm onSuccess={handleClose} />
            </DialogContent>
        </Dialog>
    );
}