import {Variant} from "@/types";
import React, {Fragment} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import VariantRow from "@/components/admin/products/VariantRow";

interface VariantsFormProps {
    variants: Variant[]
    setVariants: React.Dispatch<React.SetStateAction<Variant[]>>
}

export default function VariantsForm(
    {variants, setVariants}: VariantsFormProps
) {
    const [header, setHeader] = React.useState<string[]>([
        'Size',
        'Style',
        'Color',
        'Material',
        'Season'
    ])

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Thêm biến thể</CardTitle>
                    <CardDescription>
                        Nhập để thêm các biến thể sản phẩm
                    </CardDescription>

                    {/* Toggle Atribute */}
                    <ToggleGroup
                        type="multiple"
                        variant={"default"}
                        onValueChange={(value) => {
                            setHeader(value)
                        }}
                    >
                        <ToggleGroupItem variant={"outline"} value="Size">Size</ToggleGroupItem>
                        <ToggleGroupItem value="Style">Style</ToggleGroupItem>
                        <ToggleGroupItem value="Color">Màu</ToggleGroupItem>
                        <ToggleGroupItem value="Material">Chất liệu</ToggleGroupItem>
                        <ToggleGroupItem value="Season">Mùa</ToggleGroupItem>
                    </ToggleGroup>
                </CardHeader>
                <CardContent className={"max-w-[1000px] overflow-x-scroll"}>
                    <Table className={""}>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">SKU</TableHead>
                                <TableHead>Ảnh</TableHead>
                                <TableHead>Tên</TableHead>
                                {/**/}

                                {header.map((item, index) => (
                                    <TableHead key={index}>{item}</TableHead>
                                ))}

                                {/**/}
                                <TableHead>Giá khuyễn mãi</TableHead>
                                <TableHead>Số lượng</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                variants.map((variant, index) => (
                                    <VariantRow
                                        key={index}
                                        keyIndex={variant.variantKeyIndex}
                                        header={header}
                                        variant={variant}
                                        setVariants={setVariants}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant={"default"} className="gap-1"
                            onClick={() => {
                                const currentVariantLength = variants.length
                                setVariants([...variants, {
                                    variantSku: '',
                                    variantName: '',
                                    variantSlug: '',
                                    variantKeyIndex: currentVariantLength,
                                    variantImageUrl: '',

                                    // attributes related to product variant
                                    variantSize: '',
                                    variantColor: '',
                                    variantStyle: '',
                                    variantMaterial: '',
                                    variantSeason: '',
                                    // attributes related to price and stock
                                    variantPrice: 0,
                                    variantPromotionPrice: 0,
                                    variantStockQuantity: 0,
                                    variantStatus: ''
                                }])
                            }}
                    >
                        <PlusCircle className="h-3.5 w-3.5"/>
                        Thêm biến thể
                    </Button>
                </CardFooter>
            </Card>
        </Fragment>
    )
}