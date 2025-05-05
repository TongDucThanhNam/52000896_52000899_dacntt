"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


import { SignInForm } from "@/components/auth/SignInForm"

export default function LoginPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-96">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
                    <SignInForm onSuccess={() => router.push("/")} />
                    <div className="mt-6">
                        <Separator />
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
    )
}