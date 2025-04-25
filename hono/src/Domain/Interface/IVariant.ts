import mongoose from "mongoose";

export interface IVariant {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase' },
    // attributes related to variant
    variantSku: { type: String },
    variantName: { type: String },
    variantSlug: { type: String },
    variantKeyIndex: { type: Number },
    variantImageUrl: { type: String },

    // attributes related to product variant
    variantSize: { type: String },
    variantColor: { type: String },
    variantStyle: { type: String },
    variantMaterial: { type: String },
    variantSeason: { type: String },
    // attributes related to price and stock
    variantPrice: { type: Number },
    variantPromotionPrice: { type: Number },
    variantStockQuantity: { type: Number },
    variantStatus: { type: String },
}