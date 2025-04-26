import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Schema.Types.ObjectId;
    //attributes related to account
    userName: string;
    userPasswordHash: string;
    userEmail: string;
    userPhone: string;
    //attributes related to user
    userHeight: number;
    userWeight: number;
    userDateOfBirth: Date;
    userAddress: string;
    userImageUrl: string;
    userGender: string;
    userJob: string;
    userCity: string;
    userRole: string;
}
