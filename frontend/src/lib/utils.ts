import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function priceVietNamDongformetter(price: string) {
    //if contains - (price1-price2)
    if (String(price).includes("-")) {
        const prices = price.split("-");

        return `${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(parseInt(prices[0]))} - ${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(parseInt(prices[1]))}`;
    }

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(parseInt(price));
}

export function priceVietNamDongFormatter(price: string): string {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return "0₫";
    return parsedPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
}