"use client"

import {Button} from "@/components/ui/button";
import {ChevronLeft, PlusCircle, Upload} from "lucide-react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FileUpload} from "@/components/ui/file-upload";

export default function ThemSanPham() {


    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-3/4 flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4"/>
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Sửa sản phẩm
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm">
                            Hủy
                        </Button>
                        <Button size="sm">Lưu sản phẩm</Button>
                    </div>
                </div>
                <div className="grid gap-4 ">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        {/* Image Upload */}
                        <FileUpload/>

                        <Card x-chunk="A card with a form to edit the product details">
                            <CardHeader>
                                <CardTitle>Thông tin sản phẩm</CardTitle>
                                <CardDescription>
                                    Nhập các thông tin sản phẩm ở bên dưới
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Tên sản phẩm</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue="Nhập tên sản phẩm"
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Slug sản phẩm</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue="slug-san-pham"
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="description">Mô tả sản phẩm</Label>
                                        <Textarea
                                            id="description"
                                            defaultValue="Nhập mô tả sản phẩm"
                                            className="min-h-32"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Thêm biến thể</CardTitle>
                                <CardDescription>
                                    Nhập để thêm các biến thể sản phẩm
                                </CardDescription>

                                {/* Toggle Atribute */}
                                <ToggleGroup
                                    type="multiple"
                                    variant="outline"
                                >
                                    <ToggleGroupItem value="size">Size</ToggleGroupItem>
                                    <ToggleGroupItem value="style">Style</ToggleGroupItem>
                                    <ToggleGroupItem value="color">Màu</ToggleGroupItem>
                                    <ToggleGroupItem value="material">Chất liệu</ToggleGroupItem>
                                    <ToggleGroupItem value="season">Mùa</ToggleGroupItem>
                                </ToggleGroup>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">SKU</TableHead>
                                            <TableHead>Ảnh</TableHead>
                                            <TableHead>Tên</TableHead>
                                            <TableHead>Size</TableHead>
                                            <TableHead>Màu</TableHead>
                                            <TableHead>Style</TableHead>
                                            <TableHead>Chất liệu</TableHead>
                                            <TableHead>Mùa</TableHead>
                                            <TableHead>Giá gốc</TableHead>
                                            <TableHead>Giá khuyễn mãi</TableHead>
                                            <TableHead>Số lượng</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="sku">SKU</Label>
                                                    <Input
                                                        id="sku"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="GGPC001"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="color">Ảnh url</Label>
                                                <Input
                                                    id="sku"
                                                    type="text"
                                                    className="w-full"
                                                    defaultValue="GGPC001"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="Gamer Gear Pro Controller"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="size">Size</Label>
                                                    <Input
                                                        id="size"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="M"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="color">Color</Label>
                                                    <Input
                                                        id="color"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="Black"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="style">Style</Label>
                                                    <Input
                                                        id="style"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="Modern"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="material">Material</Label>
                                                    <Input
                                                        id="material"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="Cotton"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="season">Season</Label>
                                                    <Input
                                                        id="season"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="Summer"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="price">Price</Label>
                                                    <Input
                                                        id="price"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="49.99"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="sale-price">Sale Price</Label>
                                                    <Input
                                                        id="sale-price"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="39.99"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Label htmlFor="quantity">Quantity</Label>
                                                    <Input
                                                        id="quantity"
                                                        type="text"
                                                        className="w-full"
                                                        defaultValue="100"
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="justify-center border-t p-4">
                                <Button size="sm" variant="ghost" className="gap-1">
                                    <PlusCircle className="h-3.5 w-3.5"/>
                                    Thêm biến thể
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="A card with a form to edit the product category and subcategory">
                            <CardHeader>
                                <CardTitle>Thể loại và Nhãn hàng</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="category">Thể loại</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="category"
                                                aria-label="Select category"
                                            >
                                                <SelectValue placeholder="Select category"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clothing">Clothing</SelectItem>
                                                <SelectItem value="electronics">
                                                    Electronics
                                                </SelectItem>
                                                <SelectItem value="accessories">
                                                    Accessories
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="subcategory">
                                            Brand
                                        </Label>
                                        <Select>
                                            <SelectTrigger
                                                id="subcategory"
                                                aria-label="Select subcategory"
                                            >
                                                <SelectValue placeholder="Select subcategory"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                                <SelectItem value="sweatshirts">
                                                    Sweatshirts
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">

                                        <Label htmlFor="name">Brand khác</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            defaultValue="Nike"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card x-chunk="A card with a form to edit the product status">
                            <CardHeader>
                                <CardTitle>Trạng thái sản phẩm</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Status</Label>
                                        <Select>
                                            <SelectTrigger id="status" aria-label="Select status">
                                                <SelectValue placeholder="Select status"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Active</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div>
                            <Button>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
        </main>
    )
}