"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";

export default function DangNhap() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {toast} = useToast();

    async function handleSubmit(formData: FormData) {
        toast({
            title: "Đăng nhập",
            description: "Đang xử lý...",
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-96">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input id="email" name="email" type="email" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Mật khẩu
                            </Label>
                            <Input id="password" name="password" type="password" required/>
                        </div>
                        <Button type="submit" className="w-full">
                            Đăng nhập
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                    <div className="mt-6">
                        <Separator/>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Chưa có tài khoản?{" "}
                            <Link href="/dang-ky" className="text-primary hover:underline">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}