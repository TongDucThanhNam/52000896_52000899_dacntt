"use client";

import { Fragment } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CircleX, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { priceVietNamDongformetter } from "@/lib/utils";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartDropdown() {
  const { items, removeItem } = useCartStore();
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"neutral"} size="icon">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Giỏ hàng</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Giỏ hàng của bạn</h4>
            </div>
            <div className="grid gap-2">
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
                  >
                    <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                      <Image
                        alt={`${item.productName} image`}
                        className="rounded-md object-cover"
                        height={60}
                        src={item.imageUrl || "/placeholder.svg"}
                        width={60}
                      />
                    </div>
                    <div className="flex-1 min-w-0 w-full sm:w-fit">
                      <div className="flex items-start justify-between">
                        <h4 className="text-base sm:text-lg font-semibold text-foreground truncate pr-2 w-60">
                          {item.productName}
                        </h4>
                        <Button
                          aria-label="Remove item"
                          className="h-7 w-7 sm:h-8 sm:w-8"
                          variant="ghost"
                          onClick={() =>
                            removeItem(item.productId, item.variantId)
                          }
                        >
                          <CircleX className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-foreground">
                          {priceVietNamDongformetter(
                            item.variantPromotionPrice.toString(),
                          )}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          x {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                        {item.variants?.map((variant) => (
                          <div
                            key={variant.id}
                            className="text-xs bg-gray-100 rounded px-1 py-0.5"
                          >
                            {variant.variantColor} - {variant.variantSize} -{" "}
                            {variant.variantMaterial}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              <div className="grid grid-cols-3 items-center gap-4 pt-4 border-t">
                <span className="font-medium">Tổng cộng</span>
                <span className="col-span-2 text-right font-medium">
                  {priceVietNamDongformetter(
                    items
                      .reduce(
                        (acc, item) =>
                          acc + item.variantPromotionPrice * item.quantity,
                        0,
                      )
                      .toString(),
                  )}
                </span>
              </div>
            </div>
            <Link href="/gio-hang">
              <Button className="w-full">Đến giỏ hàng</Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
}
