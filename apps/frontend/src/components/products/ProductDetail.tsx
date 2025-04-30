"use client";

import { useEffect, useState } from "react";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

import ProductImageCarousel from "@/components/products/ProductImageCarousel";
import type { CartItem, Product, Variant } from "@/types";
import ProductVariantDetail from "@/components/products/ProductVariantDetail";
import { priceVietNamDongformetter } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Card } from "@/components/ui/card";
import { useTrackInteraction } from "@/hooks/useTrackInteraction";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productPrice, setProductPrice] = useState<string>("0");
  const [variantChosen, setVariantChosen] = useState<Variant | null>(null);
  const { trackViewInteraction, trackCartInteraction } = useTrackInteraction();
  const { addItem, items } = useCartStore();

  useEffect(() => {
    if (!product.id) {
      console.warn("Product not found, can't track interactions");
      return;
    }
    trackViewInteraction({
      productId: product.id,
      interactionContent: "View product",
      interactionScore: 1,
      variantId: "",
    }).then((r) => console.log("Track view success", r));
  }, [product]);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const isInCart =
    variantChosen &&
    items.some(
      (item) =>
        item.productId === product.id && item.variantId === variantChosen.id,
    );

  useEffect(() => {
    if (variantChosen) {
      console.log("variantChosen", variantChosen);
      setProductPrice(variantChosen.variantPromotionPrice.toString());
    }
  }, [variantChosen]);

  const handleAddToCart = () => {
    if (!variantChosen || !variantChosen.id || !product.id) {
      toast.error("Vui lòng chọn biến thể sản phẩm");
      return;
    }

    const newItem: CartItem = {
      productId: product.id,
      variantId: variantChosen.id,
      productName: product.productName,
      variantPromotionPrice: variantChosen.variantPromotionPrice,
      quantity,
      imageUrl:
        variantChosen.variantImageUrl &&
        variantChosen.variantImageUrl !== "https://placehold.co/50"
          ? variantChosen.variantImageUrl
          : product.imageUrls[0],
      variants: [variantChosen],
    };

    addItem(newItem);

    // track cart interaction
    trackCartInteraction({
      productId: product.id,
      variantId: variantChosen.id,
      interactionContent: "Add to cart",
      interactionScore: 1,
    }).then((r) => console.log("Track cart success", r));
    toast.success("Thêm vào giỏ hàng thành công");
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  if (!product.id) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex items-start justify-center">
          <ProductImageCarousel imageUrls={product.imageUrls} />
        </div>

        {/* Product Details */}
        <Card className="space-y-8 px-6 py-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {product.productName}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700">
              Hãng: {product.productBrand}
            </h2>
            <p className="text-3xl font-bold text-red-600">
              {priceVietNamDongformetter(productPrice)}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Số lượt xem: {product.productTotalViews}</span>
              <span>|</span>
              <span>
                Đánh giá: {product.productAvgRating?.toFixed(1) ?? "N/A"} ⭐
              </span>
            </div>
          </div>

          {/* Variant chosen Image */}
          {variantChosen && (
            <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <img
                src={variantChosen.variantImageUrl || "/placeholder.svg"}
                alt={variantChosen.variantName}
                className="h-16 w-16 object-cover rounded-md shadow"
              />
              <p className="text-lg font-medium text-gray-800">
                {variantChosen.variantName}
              </p>
            </div>
          )}

          {/* Variants Parts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ProductVariantDetail
              productId={product.id}
              setProductPrice={setProductPrice}
              setVariantChosen={setVariantChosen}
            />
          </div>

          {/* Quantity Control */}
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-700">Số lượng:</span>
            <div className="flex items-center">
              <Button
                variant="noShadow"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                className="rounded-l-md"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number.parseInt(e.target.value) || 1)
                }
                className="w-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Button
                variant="noShadow"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="rounded-r-md"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isInCart ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
            </Button>
            <Button
              disabled={true}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
            >
              Mua ngay
            </Button>
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="icon"
              onClick={handleFavoriteToggle}
              className=""
            >
              <Heart
                className={`h-6 w-6 ${isFavorite ? "fill-current text-red-500" : "text-gray-500"}`}
              />
            </Button>
          </div>

          {/* Accordion */}
          <Accordion type="multiple" className="space-y-4">
            <AccordionItem value="delivery" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                Thời gian giao hàng ?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-gray-50">
                <p className="text-gray-700">
                  Thời gian giao hàng dự kiến từ 3-5 ngày.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="return" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                Tôi có được trả hàng không ?
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-gray-50">
                <p className="text-gray-700">
                  Bạn có thể trả hàng trong vòng 7 ngày.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
