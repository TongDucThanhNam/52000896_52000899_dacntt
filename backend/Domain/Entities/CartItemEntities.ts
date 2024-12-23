import mongoose from 'mongoose';
import type {ICartItem} from '../Interface/ICartItem';
import {BaseSchema} from "./BaseEntities.ts";

export const CartItem = new mongoose.Schema<ICartItem>({
    cartId: {type: mongoose.Schema.Types.ObjectId, ref: 'CartWithBase'},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase'},
    variantId: {type: mongoose.Schema.Types.ObjectId, ref: 'VariantWithBase'},
    cartItemQuantity: {type: Number},
    cartItemUpdatedAt: {type: Date},
});

export const CartItemWithBaseSchema = new mongoose.Schema({
    ...CartItem.obj,
    ...BaseSchema.obj,
});

export const CartItemWithBase = mongoose.model(
    'CartItemWithBase',
    CartItemWithBaseSchema,
    'cartItems',
);