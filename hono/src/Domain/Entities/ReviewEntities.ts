import mongoose from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {IReview} from '../Interface/IReview';

export const Review = new mongoose.Schema<IReview>({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase'},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase'},
    rating: {type: Number},
    reviewContent: {type: String},
});

export const ReviewWithBaseSchema = new mongoose.Schema({
    ...Review.obj,
    ...BaseSchema.obj,
});

export const ReviewWithBase = mongoose.model(
    'ReviewWithBase',
    ReviewWithBaseSchema,
    'reviews',
);