import mongoose from "mongoose";

export interface IPreference {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    preferenceType: 'Style' | 'Color' | 'Size' | 'Brand' | 'ProductTags';
    preferenceName: string;
    preferenceScore: number;
}
