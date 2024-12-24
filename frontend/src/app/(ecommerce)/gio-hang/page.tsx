'use client'

import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import {breadcrumbPages} from "@/config/site";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

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

export default function GioHang() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const updateQuantity = (id: number, newQuantity: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? {...item, quantity: Math.max(1, newQuantity)} : item
        ));
    };
    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <BreadcumbComponent breadcrumbPages={breadcrumbPages}/>

                <h1 className="text-3xl font-bold mb-8 mt-4">Giỏ hàng của bạn</h1>

                {cartItems.length === 0 ? (
                    <p className="text-xl text-center">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center bg-white p-4 mb-4 rounded-lg shadow">
                                    <img src={item.image} alt={item.name}
                                         className="w-24 h-24 object-cover rounded mr-4"/>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">{item.price.toLocaleString('vi-VN')} ₫</p>
                                        <div className="flex items-center mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value);
                                                    if (!isNaN(newQuantity) && newQuantity > 0) {
                                                        updateQuantity(item.id, newQuantity);
                                                    }
                                                }}
                                                className="w-16 mx-2 text-center border rounded-md"
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="md:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-xl font-semibold mb-4">Tổng cộng</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Tạm tính:</span>
                                    <span>{total.toLocaleString('vi-VN')} ₫</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span>Phí vận chuyển:</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-semibold">
                                        <span>Tổng cộng:</span>
                                        <span>{total.toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-6">Tiến hành thanh toán</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}