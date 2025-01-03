"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {Label} from "@/components/ui/label";
import {DatePickerDemo} from "@/components/ui/date-picker";
import * as React from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

export default function DangKy() {
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
            <Card className="w-full max-w-4xl">
                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Đăng ký</h1>
                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">
                                    Số điện thoại
                                </Label>
                                <Input id="phone" name="phone" type="tel" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium">
                                    Địa chỉ
                                </Label>
                                <Input id="address" name="address" type="text" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium">
                                    Thành phố
                                </Label>
                                <Input id="city" name="city" type="text" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="birthday" className="text-sm font-medium">
                                    Ngày sinh
                                </Label>
                                <br/>
                                <DatePickerDemo/>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Giới tính</Label>
                                <RadioGroup defaultValue="Male">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Male" id="r1"/>
                                            <Label htmlFor="r1">Nam</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Female" id="r2"/>
                                            <Label htmlFor="r2">Nữ</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Other" id="r3"/>
                                            <Label htmlFor="r3">Khác</Label>
                                        </div>


                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="job" className="text-sm font-medium">
                                    Nghề nghiệp
                                </Label>
                                <Input id="job" name="job" type="text" required/>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Đăng ký
                        </Button>


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