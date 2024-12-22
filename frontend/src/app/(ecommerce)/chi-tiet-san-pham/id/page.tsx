"use client";

import BreadcumbComponent from "@/components/products/BreadcumbComponent";
import { breadcrumbPages } from "@/config/site";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: 1,
    name: "Áo Thun Nam Cổ Tròn",
    price: 250000,
    sold: 120,
    rating: 4.5,
    description:
      "Áo thun nam cổ tròn chất liệu cotton 100%, thoáng mát, thích hợp cho mọi hoạt động.",
    image: "/placeholder.svg?height=300&width=300",
  };

  const updateQuantity = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", product.id, "Quantity:", quantity);
  };

  const handleBuyNow = () => {
    console.log("Buying now:", product.id, "Quantity:", quantity);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <BreadcumbComponent breadcrumbPages={breadcrumbPages} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-red-500 mb-4">
              {product.price.toLocaleString("vi-VN")} ₫
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Số lượt bán: {product.sold}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Đánh giá: {product.rating} ⭐
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* Quantity Control */}
            <div className="flex items-center mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(quantity - 1)}
              >
                -
              </Button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  if (!isNaN(newQuantity) && newQuantity > 0) {
                    updateQuantity(newQuantity);
                  }
                }}
                className="w-16 mx-2 text-center border rounded-md"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ hàng
              </Button>
              <Button
                className="flex-1 bg-red-500 text-white"
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
