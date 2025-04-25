import mongoose, {Types} from 'mongoose';
import {BaseSchema} from './BaseEntities';

const isValidObjectId = (value: Types.ObjectId) => {
    return value === null || mongoose.Types.ObjectId.isValid(value);
}

export const Log = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserWithBase',
    },
    action: {type: String},
    method: {type: String},
    url: {type: String},
    statusCode: {type: Number},
    ipAddress: {type: String},
    deviceId: {type: String},
    timeStamp: {type: Date}
})

const LogWithBaseSchema = new mongoose.Schema({
    ...Log.obj,
    ...BaseSchema.obj
})

export const LogWithBase = mongoose.model('LogWithBase', LogWithBaseSchema, 'logs')