import mongoose from "mongoose";

export interface ITransactionItem {
    _id: mongoose.Schema.Types.ObjectId;
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransactionWithBase',
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductWithBase' },
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'VariantWithBase' },
    quantity: { type: Number },
    purchasePrice: { type: Number },
}