"use client";

import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { getVariantsOfProduct } from "@/app/actions";
import type { Variant } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProductVariantDetailProps {
  productId: string;
  setProductPrice: (price: string) => void;
  setVariantChosen: (variant: Variant | null) => void;
}

export default function ProductVariantDetail({
  productId,
  setProductPrice,
  setVariantChosen,
}: ProductVariantDetailProps) {
  const {
    data: variants,
    error,
    isLoading,
  } = useSWR<Variant[]>(`/api/products/${productId}/variants`, () =>
    getVariantsOfProduct(productId),
  );

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");

  // Group variants
  const variantGroups = useMemo(() => {
    if (!variants) return null;

    const uniqueColors = [...new Set(variants.map((v) => v.variantColor))];
    const uniqueSizes = [...new Set(variants.map((v) => v.variantSize))];
    const uniqueMaterials = [
      ...new Set(variants.map((v) => v.variantMaterial)),
    ];

    return {
      colors: uniqueColors.length > 1 ? uniqueColors : null,
      sizes: uniqueSizes.length > 1 ? uniqueSizes : null,
      materials: uniqueMaterials.length > 1 ? uniqueMaterials : null,
    };
  }, [variants]);

  // Set initial selections
  useEffect(() => {
    if (variants && variants.length > 0) {
      // Set init value
      const uniqueColors = [...new Set(variants.map((v) => v.variantColor))];
      const uniqueSizes = [...new Set(variants.map((v) => v.variantSize))];
      const uniqueMaterials = [
        ...new Set(variants.map((v) => v.variantMaterial)),
      ];

      setSelectedColor(uniqueColors[0]);
      setSelectedSize(uniqueSizes[0]);
      setSelectedMaterial(uniqueMaterials[0]);
    }
  }, [variants]);

  // Update product price and chosen variant when selections change
  useEffect(() => {
    if (variants && selectedColor && selectedSize && selectedMaterial) {
      const matchingVariant = variants.find(
        (v) =>
          v.variantColor === selectedColor &&
          v.variantSize === selectedSize &&
          v.variantMaterial === selectedMaterial,
      );

      if (matchingVariant) {
        setProductPrice(matchingVariant.variantPrice.toString());
        setVariantChosen(matchingVariant);
      }
    }
  }, [
    variants,
    selectedColor,
    selectedSize,
    selectedMaterial,
    setProductPrice,
    setVariantChosen,
  ]);

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Có lỗi</AlertTitle>
        <AlertDescription>
          Có lỗi khi tìm các biến thể của sản phẩm
        </AlertDescription>
      </Alert>
    );
  }

  if (!variants || variants.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Không có biến thể</AlertTitle>
        <AlertDescription>
          Sản phẩm này chưa cập nhật biến thể hoặc đã hết hàng.
        </AlertDescription>
      </Alert>
    );
  }

  // If there's only one variant
  if (variants.length === 1) {
    if (
      selectedColor !== variants[0].variantColor ||
      selectedSize !== variants[0].variantSize ||
      selectedMaterial !== variants[0].variantMaterial
    ) {
      setSelectedColor(variants[0].variantColor);
      setSelectedSize(variants[0].variantSize);
      setSelectedMaterial(variants[0].variantMaterial);
    }
    return null;
  }

  return (
    <div className="space-y-6">
      {variantGroups?.colors && (
        <div className="space-y-3">
          <h3 className="font-medium">Màu sắc</h3>
          <div className="flex flex-wrap gap-2">
            {variantGroups.colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "default" : "outline"}
                className={cn("rounded-full px-4 py-2")}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}

      {variantGroups?.sizes && (
        <div className="space-y-3">
          <h3 className="font-medium">Kích thước</h3>
          <div className="flex flex-wrap gap-2">
            {variantGroups.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                // className={cn(
                //   "px-4 py-2",
                //   selectedSize === size && "bg-primary text-primary-foreground",
                // )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {variantGroups?.materials && (
        <div className="space-y-3">
          <h3 className="font-medium">Chất liệu</h3>
          <div className="flex flex-wrap gap-2">
            {variantGroups.materials.map((material) => (
              <Button
                key={material}
                variant={selectedMaterial === material ? "default" : "outline"}
                className={cn("px-4 py-2")}
                onClick={() => setSelectedMaterial(material)}
              >
                {material}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
