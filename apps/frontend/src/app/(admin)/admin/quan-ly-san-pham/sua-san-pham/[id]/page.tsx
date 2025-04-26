import React, {Fragment} from "react";
import EditProduct from "@/components/admin/products/EditProduct";

async function getProductById(productId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}`)
    if (!res.ok) {
        throw new Error('Failed to fetch products')
    }
    return res.json()
}

//Get variants by product [id]
async function getVariantsByProductId(productId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}/variants`)
    if (!res.ok) {
        throw new Error('Failed to fetch variants')
    }
    return res.json()
}


export default async function EditProductPage(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const productId = (await params).id

    const product = await getProductById(productId)
    // console.log(product)
    const variants = await getVariantsByProductId(productId)
    // console.log(variants)

    return (
        <Fragment>
            <EditProduct product={product} myVariants={variants}/>
        </Fragment>
    )
}