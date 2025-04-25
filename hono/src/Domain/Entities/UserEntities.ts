import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseEntities';
import type {IUser} from "../Interface/IUser.ts";

const isValidObjectId = (value: Types.ObjectId) => {
    return value === null || mongoose.Types.ObjectId.isValid(value);
}

export const User = new mongoose.Schema<IUser>({
    //attributes related to account
    userName: {type: String},
    userPasswordHash: {type: String},
    userEmail: {type: String},
    userPhone: {type: String},
    //attributes related to user
    userHeight: {type: Number},
    userWeight: {type: Number},
    userDateOfBirth: {type: Date},
    userAddress: {type: String},
    userImageUrl: {type: String},
    userGender: {type: String},
    userJob: {type: String},
    userCity: {type: String},
    userRole: {type: String},
})

export const UserWithBaseSchema = new mongoose.Schema({
    ...User.obj,
    ...BaseSchema.obj
})

export const UserWithBase = mongoose.model('UserWithBase', UserWithBaseSchema, 'users')