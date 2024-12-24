"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {Label} from "@/components/ui/label";

export default function DangKy() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {toast} = useToast();

    async function handleSubmit(formData: FormData) {
        toast({
            title: "Đăng ký",
            description: "Đang xử lý...",
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-96">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Tên
                            </Label>
                            <Input id="name" name="name" type="text" required/>
                        </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                Xác nhận mật khẩu
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Đăng ký
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                    <div className="mt-6">
                        <Separator/>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Đã có tài khoản?{" "}
                            <Link href="/dang-nhap" className="text-primary hover:underline">
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
