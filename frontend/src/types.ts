export interface ProductAttributes {
    productTag?: string[];
    productId?: string,
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
    _id?: string,
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

export interface Product {
    _id?: string,
    productId: string,
    productName: string,
    productSlug?: string,
    productDescription: string,
    productBrand: string,
    imageUrls: string[],
    categoryId: string,
    productAvgRating?: number,
    productTotalViews?: number,
    productTag: string[],
    variants?: Variant[]
}

export interface CartItem {
    variantId: string
    productId: string
    productName: string
    variantPromotionPrice: number
    quantity: number
    imageUrl: string
    variants: Variant[]
}

export interface UserProfile {
    _id: string,
    //attributes related to account
    userName: string,
    userPasswordHash: string,
    userEmail: string,
    userPhone: string,
    //attributes related to user
    userHeight: number,
    userWeight: number,
    userDateOfBirth: Date,
    userAddress: string,
    userImageUrl: string,
    userGender: string,
    userJob: string,
    userCity: string,
    userRole: string,
}

export interface Transaction {
    _id: string
    userId: string
    orderStatus: string
    totalValue: number
    paymentMethod: string
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export interface TransactionItem {
    _id: string
    transactionId: string
    productId: string
    variantId: string
    quantity: number
    purchasePrice: number
    isDeleted: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Interaction {
    userId: string
    productId: string
    variantId: string
    interactionType: "view" | "cart" | "purchase"
    interactionContent: string
    interactionScore: number
}