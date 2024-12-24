export interface ProductAttributes {
    //attributes related to product
    productName: string,
    productSlug: string,
    productDescription: string,
    productBrand: string
    imageUrls: string[],
    categoryId: string,
    productAvgRating: number,
    productTotalViews: number
}

export interface Variant {
    // attributes related to variant
    variantSku: string,
    variantName: string,
    variantSlug: string,
    variantKeyIndex: number,
    variantImageUrl: string,

    // attributes related to product variant
    variantSize: string,
    variantColor: string,
    variantStyle: string,
    variantMaterial: string,
    variantSeason: string,
    // attributes related to price and stock
    variantPrice: number,
    variantPromotionPrice: number,
    variantStockQuantity: number,
    variantStatus: string
}