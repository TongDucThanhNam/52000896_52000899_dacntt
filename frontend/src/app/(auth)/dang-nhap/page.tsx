"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { login } from "./actions";

export default function DangNhap() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Đăng ký thành công! Vui lòng đăng nhập.");
    }
  }, [searchParams]);

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result.success) {
      router.push("/ecommerce/danh-sach-san-pham");
    } else {
      setError(result.error || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
          {successMessage && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          <form action={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
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
  );
}
