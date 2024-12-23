import mongoose from "mongoose";

export interface ICartItem {
    _id: mongoose.Schema.Types.ObjectId;
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'CartWithBase' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase' },
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantWithBase' },
    cartItemQuantity: { type: Number },
    cartItemUpdatedAt: { type: Date },
}