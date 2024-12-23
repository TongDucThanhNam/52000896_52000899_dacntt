import mongoose from "mongoose";
import type {IProduct} from "../Interface/IProduct.ts";
import {BaseSchema} from "./BaseEntities.ts";

export const Product = new mongoose.Schema<IProduct>({
    //attributes related to product
    productName: {type: String},
    productSlug: {type: String},
    productDescription: {type: String},
    productBrand: {type: String},
    imageUrls: {type: [String]},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'CategoryWithBase'},
    productAvgRating: {type: Number},
    productTotalViews: {type: Number},
});

export const ProductWithBaseSchema = new mongoose.Schema({
    ...Product.obj,
    ...BaseSchema.obj,
});

export const ProductWithBase = mongoose.model('ProductWithBase', ProductWithBaseSchema, 'products');