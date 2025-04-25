import mongoose from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {ITransactionItem} from '../Interface/ITransactionItem';

export const TransactionItem = new mongoose.Schema<ITransactionItem>({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransactionWithBase',
    },
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase'},
    variantId: {type: mongoose.Schema.Types.ObjectId, ref: 'VariantWithBase'},
    quantity: {type: Number},
    purchasePrice: {type: Number},
});

export const TransactionItemWithBaseSchema = new mongoose.Schema({
    ...TransactionItem.obj,
    ...BaseSchema.obj,
});

export const TransactionItemWithBase = mongoose.model(
    'TransactionItemWithBase',
    TransactionItemWithBaseSchema,
    'transactionItems',
);