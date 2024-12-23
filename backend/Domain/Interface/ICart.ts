import mongoose from "mongoose";

export interface ICart {
    _id: mongoose.Schema.Types.ObjectId;
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase' },
    cartUpdatedAt: { type: Date },
}