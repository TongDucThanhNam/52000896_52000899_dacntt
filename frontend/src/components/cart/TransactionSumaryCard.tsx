import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {Input} from "@/components/ui/input";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

const initialCartItems: CartItem[] = [
    {id: 1, name: "Áo thun nam", price: 250000, quantity: 2, image: "/placeholder.svg?height=100&width=100"},
    {id: 2, name: "Quần jean nữ", price: 450000, quantity: 1, image: "/placeholder.svg?height=100&width=100"},
];

export default function TransactionSumartCard() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-6">
                    {/* Sản phẩm trong giỏ hàng */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-lg bg-muted">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Giày thể thao"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">Giày thể thao</h3>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Màu: Đỏ · Size: 42
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-semibold">$29.99</p>
                                    <p className="text-sm text-muted-foreground">x 1</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-lg bg-muted">
                                <Image
                                    src="/placeholder.svg"
                                    alt="Giày chạy bộ"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">Giày chạy bộ</h3>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Màu: Xanh · Size: 42
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-semibold">$39.99</p>
                                    <p className="text-sm text-muted-foreground">x 2</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mã giảm giá */}
                    <div className="flex gap-2">
                        <Input placeholder="Nhập mã giảm giá" className="bg-muted"/>
                        <Button variant="secondary">Áp dụng</Button>
                    </div>

                    {/* Tóm tắt */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Tạm tính</p>
                            <p className="font-semibold">$159.96</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Phí giao hàng</p>
                            <p className="font-semibold">$0.00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Thuế</p>
                            <p className="font-semibold">$23.99</p>
                        </div>
                        <div className="flex justify-between text-green-500">
                            <p>Giảm giá</p>
                            <p>- $10.99</p>
                        </div>
                        <div className="flex justify-between border-t pt-4">
                            <p className="font-semibold">Tổng cộng</p>
                            <p className="font-semibold">$172.96</p>
                        </div>
                    </div>

                    <Button className="w-full" size="lg">
                        Thanh toán
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}