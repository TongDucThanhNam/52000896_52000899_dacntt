import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {ICategory} from "../Interface/ICategory.ts";

const isValidObjectId = (value: Types.ObjectId) => {
    return value === null || mongoose.Types.ObjectId.isValid(value);
}

export const Category = new mongoose.Schema<ICategory>({
    categoryName: {type: String},
    categorySlug: {type: String},
});

export const CategoryWithBaseSchema = new mongoose.Schema({
    ...Category.obj,
    ...BaseSchema.obj,
});

export const CategoryWithBase = mongoose.model(
    'CategoryWithBase',
    CategoryWithBaseSchema,
    'categories'
);