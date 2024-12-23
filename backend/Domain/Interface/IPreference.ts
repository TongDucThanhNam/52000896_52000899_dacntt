import mongoose from "mongoose";

export interface IPreference {
    _id: mongoose.Schema.Types.ObjectId
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase', required: true },
    preferenceType: {
        type: String,
        enum: ['Style', 'Color', 'Size', 'Brand', 'ProductTags'],
        required: true,
    },
    preferenceName: { type: String, required: true },
    preferenceScore: { type: Number, required: true },
}