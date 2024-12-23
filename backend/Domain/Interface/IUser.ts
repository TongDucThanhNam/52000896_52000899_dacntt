import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Schema.Types.ObjectId
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
}