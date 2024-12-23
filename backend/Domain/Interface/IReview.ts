import mongoose from "mongoose";

export interface IReview {
    _id: mongoose.Schema.Types.ObjectId;
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase' },
    rating: { type: Number },
    reviewContent: { type: String },
}