import mongoose from "mongoose";

export interface IInteraction {
    _id: mongoose.Schema.Types.ObjectId;
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase' },
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantWithBase' },
    interactionType: { type: String },
    interactionContent: { type: String },
    interactionScore: { type: Number },
}