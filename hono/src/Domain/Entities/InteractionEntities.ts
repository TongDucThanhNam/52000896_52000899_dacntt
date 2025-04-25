import mongoose, {Types} from "mongoose";
import {BaseSchema} from "./BaseEntities";
import type {IInteraction} from "../Interface/IInteraction.ts";

const isValidObjectId = (value: Types.ObjectId) => {
    return value === null || mongoose.Types.ObjectId.isValid(value);
};

export const Interaction = new mongoose.Schema<IInteraction>({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "UserWithBase"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "ProductWithBase"},
    variantId: {type: String},
    interactionType: {type: String},
    interactionContent: {type: String},
    interactionScore: {type: Number},
});

export const InteractionWithBaseSchema = new mongoose.Schema({
    ...Interaction.obj,
    ...BaseSchema.obj,
});

export const InteractionWithBase = mongoose.model(
    "InteractionWithBase",
    InteractionWithBaseSchema,
    "interactions",
);
