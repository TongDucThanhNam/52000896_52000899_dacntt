import {TableCell, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import React from "react";
import {Variant} from "@/components/admin/types";
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
        setVariants
    }: {
        header: string[],
        keyIndex: number,
        setVariants: React.Dispatch<React.SetStateAction<Variant[]>>
    }
) {
    //onChange


    return (
        <TableRow>
            <TableCell>
                <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                        id="sku"
                        type="text"
                        className="w-full"
                        defaultValue=""
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
                    className="w-full"
                    defaultValue="GGPC001"
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        className="w-full"
                        defaultValue="Gamer Gear Pro Controller"
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
                                className="w-full"
                                defaultValue=""
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
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        type="number"
                        className="w-full"
                        defaultValue="49.99"
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
                    <Label htmlFor="sale-price">Sale Price</Label>
                    <Input
                        id="sale-price"
                        type="number"
                        className="w-full"
                        defaultValue="39.99"
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
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                        id="quantity"
                        type="number"
                        className="w-full"
                        defaultValue="100"
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