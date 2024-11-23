import Image from "next/image";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon, Search, ShoppingCart, CircleX} from "lucide-react";
import {siteConfig} from "@/config/site";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {priceVietNamDongformetter} from "@/lib/utils";
import Link from "next/link";

interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    variants?: string[];
}

// Sample cart items
const cartItems: CartItem[] = [
    {
        id: 1,
        name: "Sản phẩm 1",
        imageUrl: "https://via.placeholder.com/150",
        price: 100000,
        quantity: 1,
        variants: ["Size: M", "Màu : Đỏ"],
    },
    {
        id: 2,
        name: "Sản phẩm 2",
        imageUrl: "https://via.placeholder.com/150",
        price: 200000,
        quantity: 2,
        variants: ["Size: L", "Màu: Xanh"],
    },
];

// import logo from "/public/logo.webp";

export default function Navbar() {
    return (
        <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20">
                <div className="flex items-center justify-between md:justify-around h-16">
                    <div className="flex items-center">
                        <div className="sm:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <MenuIcon className="h-5 w-5"/>
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <nav className="flex flex-col gap-4">
                                        <div className={"mt-5"}>
                                            <form
                                                className="flex w-full items-center space-x-2"
                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Tìm kiếm..."
                                                    className="flex-grow"
                                                />
                                                <Button
                                                    className={"w-12"}
                                                    type="submit"
                                                    size={"icon"}
                                                    aria-label="Search"
                                                >
                                                    <Search className=""/>
                                                </Button>
                                            </form>
                                        </div>
                                        {siteConfig.navItems.map((item) => (
                                            <a key={item.href} href={item.href}>
                                                {item.label}
                                            </a>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <Link href="/" className="flex items-center">
                            <div
                                className="h-[32px] w-[32px] mr-2"
                            >
                                <Image
                                    className="rounded-full"
                                    loading={"eager"}
                                    role={"img"}
                                    alt={"Brand Logo"}
                                    height={48}
                                    width={48}
                                    src={"/logo.webp"}
                                />
                            </div>


                            <span className="font-bold text-lg">fasionAI</span>
                        </Link>
                        <nav className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            {siteConfig.navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href} className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block">
                            <form
                                className="flex w-full items-center space-x-2"
                            >
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="flex-grow"
                                />
                                <Button
                                    className={"w-12"}
                                    type="submit"
                                    size={"icon"}
                                    aria-label="Search"
                                >
                                    <Search className=""/>
                                </Button>
                            </form>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <ShoppingCart className="h-4 w-4"/>
                                    <span className="sr-only">Giỏ hàng</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Giỏ hàng của bạn</h4>
                                    </div>
                                    <div className="grid gap-2">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className={
                                                    "flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
                                                }
                                            >
                                                <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                                                    <Image
                                                        alt={`${item.name} image`}
                                                        className="rounded-md object-cover"
                                                        height={60}
                                                        src={item.imageUrl}
                                                        width={60}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 w-full sm:w-fit">
                                                    <div className="flex items-start justify-between">
                                                        <h4 className="text-base sm:text-lg font-semibold text-foreground truncate pr-2 sm:max-w-sm md:max-w-xs">
                                                            {item.name}
                                                        </h4>
                                                        <Button
                                                            aria-label="Remove item"
                                                            className="h-7 w-7 sm:h-8 sm:w-8"
                                                            color={"danger"}
                                                            // onClick={() => removeFromCart(product)}
                                                        >
                                                            <CircleX className="h-3 w-3 sm:h-4 sm:w-4"/>
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-sm font-medium text-foreground">
                                                          {priceVietNamDongformetter(item.price.toString())}
                                                        </span>
                                                        <span className="text-xs sm:text-sm text-muted-foreground">
                                                          x {item.quantity}
                                                       </span>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                                                        {item.variants?.map((variant) => (
                                                            <div key={variant}>{variant}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="grid grid-cols-3 items-center gap-4 pt-4 border-t">
                                            <span className="font-medium">Tổng cộng</span>
                                            <span className="col-span-2 text-right font-medium">
                                                {
                                                    priceVietNamDongformetter(
                                                        cartItems.reduce(
                                                            (acc, item) => acc + item.price * item.quantity,
                                                            0
                                                        ).toString()
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="w-full">Đến giỏ hàng</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </nav>
    )
}