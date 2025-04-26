import {TableCell, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import React from "react";
import {Variant} from "@/types";
import {Label} from "@/components/ui/label";

const HeaderMap = {
    Size: 'variantSize',
    Style: 'variantStyle',
    Color: 'variantColor',
    Material: 'variantMaterial',
    Season: 'variantSeason'
}

export default function VariantRow(
    {
        header,
        keyIndex,
        setVariants,
        variant
    }: {
        header: string[],
        keyIndex: number,
        setVariants: React.Dispatch<React.SetStateAction<Variant[]>>,
        variant?: any
    }
) {
    return (
        <TableRow>
            <TableCell>
                <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input

                        id="sku"
                        type="text"
                        className="h-8 min-w-[120px]"
                        defaultValue={variant?.variantSku || ""}
                        onChange={(e) => {
                            setVariants((prev) =>
                                prev.map((variant, index) =>
                                    index === keyIndex
                                        ? {...variant, variantSku: e.target.value}
                                        : variant
                                )
                            );
                        }}
                    />
                </div>
            </TableCell>
            <TableCell>
                <Label htmlFor="color">Ảnh url</Label>
                <Input
                    id="sku"
                    type="text"
                    className="h-8 min-w-[120px]"
                    defaultValue={variant?.variantImageUrl || ""}
                    onChange={(e) => {
                        setVariants((prev) =>
                            prev.map((variant, index) =>
                                index === keyIndex
                                    ? {...variant, variantImageUrl: e.target.value}
                                    : variant
                            )
                        );
                    }}
                />
            </TableCell>
            <TableCell>
                <div>
                    <Label htmlFor="name">Tên</Label>
                    <Input
                        id="name"
                        type="text"
                        className="h-8 min-w-[120px]"
                        defaultValue={variant?.variantName || ""}
                        onChange={(e) => {
                            setVariants((prev) =>
                                prev.map((variant, index) =>
                                    index === keyIndex
                                        ? {...variant, variantName: e.target.value}
                                        : variant
                                )
                            );
                        }}
                    />
                </div>
            </TableCell>
            {
                header.map((item, index) => (
                    <TableCell key={index}>
                        <div>
                            <Label htmlFor={item.toLowerCase()}>{item}</Label>
                            <Input
                                id={item.toLowerCase()}
                                type="text"
                                className="h-8 min-w-[120px]"
                                defaultValue={variant ? variant[HeaderMap[item as keyof typeof HeaderMap]] : ""}
                                onChange={(e) => {
                                    setVariants((prev) =>
                                        prev.map((variant, i) =>
                                            i === keyIndex
                                                ? {
                                                    ...variant,
                                                    [HeaderMap[item as keyof typeof HeaderMap]]: e.target.value
                                                }
                                                : variant
                                        )
                                    );
                                }}
                            />
                        </div>
                    </TableCell>
                ))
            }

            <TableCell>
                <div>
                    <Label htmlFor="price">Giá gốc</Label>
                    <Input
                        id="price"
                        type="number"
                        className="h-8 min-w-[120px]"
                        defaultValue={variant?.variantPrice || 0}
                        onChange={(e) => {
                            setVariants((prev) =>
                                prev.map((variant, index) =>
                                    index === keyIndex
                                        ? {...variant, variantPrice: parseFloat(e.target.value)}
                                        : variant
                                )
                            );
                        }}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div>
                    <Label htmlFor="sale-price">Giá bán</Label>
                    <Input
                        id="sale-price"
                        type="number"
                        className="h-8 min-w-[120px]"
                        defaultValue={variant?.variantPromotionPrice || 0}
                        onChange={(e) => {
                            setVariants((prev) =>
                                prev.map((variant, index) =>
                                    index === keyIndex
                                        ? {...variant, variantPromotionPrice: parseFloat(e.target.value)}
                                        : variant
                                )
                            );
                        }}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div>
                    <Label htmlFor="quantity">Số lượng</Label>
                    <Input
                        id="quantity"
                        type="number"
                        className="h-8 min-w-[120px]"
                        defaultValue={variant?.variantStockQuantity || 0}
                        onChange={(e) => {
                            setVariants((prev) =>
                                prev.map((variant, index) =>
                                    index === keyIndex
                                        ? {...variant, variantStockQuantity: parseInt(e.target.value)}
                                        : variant
                                )
                            );
                        }}
                    />
                </div>
            </TableCell>
        </TableRow>
    )
}