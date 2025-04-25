import mongoose from "mongoose";

export interface ICart {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    cartUpdatedAt: Date;
}
