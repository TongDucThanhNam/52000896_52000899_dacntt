import mongoose from "mongoose";

export interface IProduct {
    _id: mongoose.Schema.Types.ObjectId;
    //attributes related to product
    productName: { type: String },
    productSlug: { type: String },
    productDescription: { type: String },
    productBrand: { type: String },
    imageUrls: { type: [String] },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryWithBase' },
    productAvgRating: { type: Number },
    productTotalViews: { type: Number }
}