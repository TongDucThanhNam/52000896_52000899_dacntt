import mongoose from "mongoose";

export interface ITransaction {
    _id: mongoose.Schema.Types.ObjectId
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase' },
    orderDate: { type: Date },
    orderStatus: { type: String },
    totalValue: { type: Number },
    discountCode: { type: String },
    paymentMethod: { type: String },
    shippingMethod: { type: String },
}