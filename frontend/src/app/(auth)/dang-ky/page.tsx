"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "./actions";

export default function DangKy() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(formData: FormData) {
    const result = await register(formData);
    if (result.success) {
      router.push("/auth/dang-nhap?registered=true");
    } else {
      setError(result.error || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Họ và tên
              </label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mật khẩu
              </label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Xác nhận mật khẩu
              </label>
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
            <Separator />
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
