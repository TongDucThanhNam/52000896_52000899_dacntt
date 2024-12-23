import mongoose from "mongoose";

export interface IProductTag {
    _id: mongoose.Schema.Types.ObjectId
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase' },
    tagId: { type: mongoose.Schema.Types.ObjectId, ref: 'TagWithBase' },
}