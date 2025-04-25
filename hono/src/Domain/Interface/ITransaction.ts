import mongoose from "mongoose";

export interface ITransaction {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    orderDate: Date;
    orderStatus: string;
    totalValue: number;
    discountCode: string;
    paymentMethod: string;
    shippingMethod: string;
}
