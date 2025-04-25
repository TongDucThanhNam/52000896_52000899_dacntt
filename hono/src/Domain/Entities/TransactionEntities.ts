import mongoose from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {ITransaction} from '../Interface/ITransaction';

export const Transaction = new mongoose.Schema<ITransaction>({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase'},
    orderStatus: {type: String},
    totalValue: {type: Number},
    paymentMethod: {type: String},
});

export const TransactionWithBaseSchema = new mongoose.Schema({
    ...Transaction.obj,
    ...BaseSchema.obj,
});

export const TransactionWithBase = mongoose.model(
    'TransactionWithBase',
    TransactionWithBaseSchema,
    'transactions',
);