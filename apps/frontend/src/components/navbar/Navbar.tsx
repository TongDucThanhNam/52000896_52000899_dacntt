import Image from "next/image";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon, Search} from "lucide-react";
import {siteConfig} from "@/config/site";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import AvatarDropdown from "@/components/navbar/AvatarDropdown";
import CartDropdown from "@/components/navbar/CartDropdown";
// import logo from "/public/logo.webp";

export default function Navbar() {
    return (
        <nav className="w-full border-b bg-blue-300 backdrop-blur supports-[backdrop-filter]:bg-blue-200">
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


                            <span className="font-bold text-lg font-san">fasionAI</span>
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
                        {/* Cart dropdown*/}
                        <CartDropdown/>

                        {/*Avatar dropdown*/}
                        <div className="absolute right-8">
                            <AvatarDropdown/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}