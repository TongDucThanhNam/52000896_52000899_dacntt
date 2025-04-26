import mongoose from "mongoose";
import type {ITag} from "../Interface/ITag.ts";
import {BaseSchema} from "./BaseEntities";

export const Tag = new mongoose.Schema<ITag>({
    tagName: {type: String},
    tagSlug: {type: String},
});

export const TagWithBaseSchema = new mongoose.Schema({
    ...Tag.obj,
    ...BaseSchema.obj,
});

export const TagWithBase = mongoose.model('TagWithBase', TagWithBaseSchema, 'tags');
