import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {IVariant} from "../Interface/IVariant.ts";

const isValidObjectId = (value: Types.ObjectId) => {
    return value === null || mongoose.Types.ObjectId.isValid(value);
}
export const Variant = new mongoose.Schema<IVariant>({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase'},
    // attributes related to variant
    variantSku: {type: String},
    variantName: {type: String},
    variantSlug: {type: String},
    variantKeyIndex: {type: Number},
    variantImageUrl: {type: String},

    // attributes related to product variant
    variantSize: {type: String},
    variantColor: {type: String},
    variantStyle: {type: String},
    variantMaterial: {type: String},
    variantSeason: {type: String},
    // attributes related to price and stock
    variantPrice: {type: Number},
    variantPromotionPrice: {type: Number},
    variantStockQuantity: {type: Number},
});

export const VariantWithBaseSchema = new mongoose.Schema({
    ...Variant.obj,
    ...BaseSchema.obj,
});

export const VariantWithBase = mongoose.model('VariantWithBase', VariantWithBaseSchema, 'variants');