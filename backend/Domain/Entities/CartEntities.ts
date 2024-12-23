import mongoose from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {ICart} from '../Interface/ICart';

export const Cart = new mongoose.Schema<ICart>({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase'},
    cartUpdatedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

export const CartWithBaseSchema = new mongoose.Schema({
    ...Cart.obj,
    ...BaseSchema.obj,
});

export const CartWithBase = mongoose.model(
    'CartWithBase',
    CartWithBaseSchema,
    'carts',
);