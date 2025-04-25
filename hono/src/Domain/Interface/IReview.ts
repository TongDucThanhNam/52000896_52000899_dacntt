import mongoose from "mongoose";

export interface IReview {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
    rating: number;
    reviewContent: string;
}
