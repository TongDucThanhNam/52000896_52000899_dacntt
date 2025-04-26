import mongoose from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {IProductTag} from '../Interface/IProductTag';

export const ProductTag = new mongoose.Schema<IProductTag>({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase'},
    tagId: {type: mongoose.Schema.Types.ObjectId, ref: 'TagWithBase'},
});

export const ProductTagWithBaseSchema = new mongoose.Schema({
    ...ProductTag.obj,
    ...BaseSchema.obj,
});

export const ProductTagWithBase = mongoose.model(
    'ProductTagWithBase',
    ProductTagWithBaseSchema,
    'productTags',
);