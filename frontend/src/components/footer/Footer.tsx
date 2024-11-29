import {Facebook, Instagram, Mail, Phone, Twitter} from "lucide-react";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">fashionAI</h3>
                        <p className="text-sm">
                            Liên hệ trên mạng xã hội
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="">
                                <Facebook size={20}/>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="">
                                <Twitter size={20}/>
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="">
                                <Instagram size={20}/>
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/danh-sach-san-pham" className="">
                                    Danh sách sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link href="/gioi-thieu" className="">
                                    Giới thiệu
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <Mail size={16}/>
                                <a href="mailto:info@fashionai.com" className="">
                                    info@fashionai.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone size={16}/>
                                <a href="tel:+84123456789" className="">
                                    +84 123 456 789
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
                        <form className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Địa chỉ email của bạn"
                                className=""
                            />
                            <Button type="submit" className="w-full">
                                Đăng ký
                            </Button>
                        </form>
                    </div>
                </div>
                <Separator className="my-8 bg-gray-700"/>
                <div className="text-center text-sm">
                    © {new Date().getFullYear()} fashionAI. Transforming ideas into innovative solutions.
                </div>
            </div>
        </footer>
    )
}