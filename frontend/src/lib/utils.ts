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

const categoryMap = {
    "67947c2be443c89e47753076": "Set đồ",
    "676fc3f2aef26543aa192da3": "Quần",
    "676fc404aef26543aa192da5": "Áo",
    "676fc40baef26543aa192da7": "Giày",
    "676fc413aef26543aa192da9": "Phụ kiện",
    "676fc41aaef26543aa192dab": "Đồ lót",
    "676fc421aef26543aa192dad": "Váy",
}

export function getCategoryName(categoryId: string): string {
    return categoryMap[categoryId as keyof typeof categoryMap] || "Unknown Category"
}