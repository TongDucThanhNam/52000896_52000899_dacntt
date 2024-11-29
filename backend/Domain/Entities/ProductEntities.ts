import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseEntities';

const isValidObjectId = (value: Types.ObjectId) => {
    return value === null || mongoose.Types.ObjectId.isValid(value);
}

export const Product = new mongoose.Schema({
    item_name: {type: String},
    description: {type: String},
    original_price: {type: Number},
    price: {type: Number},
    weight: {type: Number},
    stock: {type: Number},
    imageUrl: {type: String},
    category: {type: String},
    item_status: {type: String},
})

export const ProductWithBaseSchema = new mongoose.Schema({
    ...Product.obj,
    ...BaseSchema.obj
})

export const ProductWithBase = mongoose.model('ProductWithBase', ProductWithBaseSchema, 'products')