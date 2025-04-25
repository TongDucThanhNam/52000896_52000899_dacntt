import mongoose from "mongoose";

export interface IInteraction {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
    variantId: mongoose.Schema.Types.ObjectId;
    interactionType: string;
    interactionContent: string;
    interactionScore: number;
}
