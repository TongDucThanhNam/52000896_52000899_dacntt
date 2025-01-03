import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {priceVietNamDongformetter} from "@/lib/utils";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        category: string;
        image: string;
    }
}

export default function ProductCard(
    {product}: ProductCardProps
) {
    return (
        <Link href={`/chi-tiet-san-pham/id`} passHref>
            <Card key={product.id} className="flex flex-col">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill={true}
                            className="rounded-t-lg object-cover"
                        />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
                    <Badge variant="neutral" className="mb-2">
                        {product.category}
                    </Badge>
                    <p className="text-gray-600 font-mono">{priceVietNamDongformetter(product.price.toString())}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button className="w-full font-bold">Thêm vào giỏ hàng</Button>
                </CardFooter>
            </Card>
        </Link>
    )
}