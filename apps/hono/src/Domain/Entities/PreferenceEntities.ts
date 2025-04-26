import mongoose from 'mongoose';
import {BaseSchema} from './BaseEntities';

export const Preference = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserWithBase', required: true},
    preferenceType: {
        type: String,
        enum: ['Style', 'Color', 'Size', 'Brand', 'ProductTags'],
        required: true,
    },
    preferenceValue: {type: String, required: true},
    preferenceScore: {type: Number, required: true},
});

export const PreferenceWithBaseSchema = new mongoose.Schema({
    ...Preference.obj,
    ...BaseSchema.obj,
});

export const PreferenceWithBase = mongoose.model(
    'PreferenceWithBase',
    PreferenceWithBaseSchema,
    'preferences',
);