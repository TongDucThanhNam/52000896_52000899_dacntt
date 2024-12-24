import React, {Fragment} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ProductAttributes} from './types'
import {FileUpload} from "@/components/ui/file-upload";
import {Label} from "@/components/ui/label";

interface ProductDetailsFormProps {
    productAttributes: ProductAttributes
    setProductAttributes: React.Dispatch<React.SetStateAction<ProductAttributes>>
}

export default function ProductDetailsForm({productAttributes, setProductAttributes}: ProductDetailsFormProps) {
    return (
        <Fragment>
            {/* Image Upload */}
            <FileUpload imageUrls={productAttributes.imageUrls} setProductAttributes={setProductAttributes}
                        productAttributes={productAttributes}/>

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
                                onChange={(e) => setProductAttributes({
                                    ...productAttributes,
                                    productName: e.target.value
                                })}
                                defaultValue={productAttributes.productName}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name">Slug sản phẩm</Label>
                            <Input
                                id="name"
                                type="text"
                                className="w-full"
                                onChange={(e) => setProductAttributes({
                                    ...productAttributes,
                                    productSlug: e.target.value
                                })}
                                defaultValue={productAttributes.productSlug}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Mô tả sản phẩm</Label>
                            <Textarea
                                id="description"
                                onChange={(e) => setProductAttributes({
                                    ...productAttributes,
                                    productDescription: e.target.value
                                })}
                                defaultValue={productAttributes.productDescription}
                                className="min-h-32"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card x-chunk="A card with a form to edit the product category and subcategory">
                <CardHeader>
                    <CardTitle>Thể loại và Nhãn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                            <Label htmlFor="category">Thể loại</Label>
                            <Select
                                onValueChange={(value) => setProductAttributes({
                                    ...productAttributes,
                                    categoryId: value
                                })}
                            >
                                <SelectTrigger
                                    id="category"
                                    aria-label="Select category"
                                >
                                    <SelectValue placeholder="Chọn loại quần áo"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="675ef491210adaed736cea7e">
                                        Quần
                                    </SelectItem>
                                    <SelectItem value="675ef491210adaed736cea7e">
                                        Áo
                                    </SelectItem>
                                    <SelectItem value="675ef491210adaed736cea7e">
                                        Váy
                                    </SelectItem>
                                    <SelectItem value="675ef491210adaed736cea7e">
                                        Áo khoác
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/*<div className="grid gap-3">*/}
                        {/*    <Label htmlFor="subcategory">*/}
                        {/*        Brand*/}
                        {/*    </Label>*/}
                        {/*    <Select*/}
                        {/*        onValueChange={(value) => setProductAttributes({*/}
                        {/*            ...productAttributes,*/}
                        {/*            productBrand: value*/}
                        {/*        })}*/}
                        {/*        // defaultValue={productAttributes.productBrand}*/}
                        {/*    >*/}
                        {/*        <SelectTrigger*/}
                        {/*            id="subcategory"*/}
                        {/*            aria-label="Select subcategory"*/}
                        {/*        >*/}
                        {/*            <SelectValue placeholder="Chọn Brand"/>*/}
                        {/*        </SelectTrigger>*/}
                        {/*        <SelectContent>*/}
                        {/*            <SelectItem value="t-shirts">T-Shirts</SelectItem>*/}
                        {/*            <SelectItem value="hoodies">Hoodies</SelectItem>*/}
                        {/*            <SelectItem value="sweatshirts">*/}
                        {/*                Sweatshirts*/}
                        {/*            </SelectItem>*/}
                        {/*        </SelectContent>*/}
                        {/*    </Select>*/}
                        {/*</div>*/}
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nhập Brand</Label>
                            <Input
                                id="name"
                                type="text"
                                className="w-full"
                                defaultValue="Nike"
                                onChange={(e) => setProductAttributes({
                                    ...productAttributes,
                                    productBrand: e.target.value
                                })}
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
                            <Label htmlFor="status">Trạng thái</Label>
                            <Select
                                defaultValue={"active"}
                            >
                                <SelectTrigger id="status" aria-label="Chọn trạng thái">
                                    <SelectValue placeholder="Chọn trạng thái"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="deactive">Hết hàng</SelectItem>
                                    <SelectItem value="active">Đang bán</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Fragment>
    )
}