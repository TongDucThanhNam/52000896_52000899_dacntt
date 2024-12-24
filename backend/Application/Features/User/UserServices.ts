import type {IUserServices} from "../../Persistences/IServices/IUserServices.ts";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import {type UserWithBase} from "../../../Domain/Entities/UserEntities.ts";
import {type PreferenceWithBase} from "../../../Domain/Entities/PreferenceEntities.ts";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function encodeJwtToken(user: any): { accessToken: string, refreshToken: string } {
    const accessToken: string = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET || '',
        {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRES_IN}
    );

    const refreshToken: string = jwt.sign(
        {userId: user._id},
        process.env.REFRESH_TOKEN_SECRET || '',
        {algorithm: 'HS256', expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
    );

    // console.log(accessToken, refreshToken);

    return {
        accessToken,
        refreshToken
    };
}

class UserServices implements IUserServices {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async createUser(data: any): Promise<typeof UserWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const user = await this.unitOfWork.userRepository.createUser(data, session);
            await this.unitOfWork.commitTransaction();
            return user;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async deleteUser(data: any): Promise<typeof UserWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const user = await this.unitOfWork.userRepository.deleteUserById(data, session);
            await this.unitOfWork.commitTransaction();
            return user;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async getAllUsers(data: any): Promise<typeof UserWithBase[] | null> {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true,
            }
            const users = await this.unitOfWork.userRepository.getAllUsers(queryData);
            return users;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(data: any): Promise<typeof UserWithBase | null> {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true,
            }
            const user = await this.unitOfWork.userRepository.getUserById(data, queryData);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserPreferences(data: any): Promise<typeof PreferenceWithBase | null> {
        try {
            const {
                userId,
                ...restData
            } = data
            const preferences: any = await this.unitOfWork.preferenceRepository.getPreferencesByUserId(userId, restData);
            return preferences;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(data: any): Promise<typeof UserWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const {
                userId,
                ...userData
            } = data
            const user = await this.unitOfWork.userRepository.updateUserById(userId, userData, session);
            await this.unitOfWork.commitTransaction();
            return user;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async updateUserPreferences(data: any): Promise<typeof PreferenceWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const {
                userId,
                ...preferenceData
            } = data
            const preferences = await this.unitOfWork.preferenceRepository.updatePreferenceById(
                userId,
                preferenceData,
                session);
            await this.unitOfWork.commitTransaction();
            return preferences;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async addUserPreference(data: any): Promise<typeof PreferenceWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const preferences = await this.unitOfWork.preferenceRepository.createPreference(data, session);
            await this.unitOfWork.commitTransaction();
            return preferences;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async forgotPassword(data: any): Promise<void> {
        try {

        } catch (error) {
            throw error;
        }
    }

    async loginUser(data: any): Promise<any> {
        try {
            const {
                userEmail,
                userPasswordHash
            } = data;

            const queryData = {
                userEmail: userEmail,
                isDeleted: false,
                isActive: true,
            }

            const user: any = await this.unitOfWork.userRepository.getAllUsers(
                queryData
            )

            // console.log(user);
            if (!user) {
                throw new Error('User not found');
            }

            const result = user[0];


            //TODO: convert to bcrypt
            if (result.userPasswordHash !== userPasswordHash) {
                throw new Error('Password is incorrect');
            }

            const token = encodeJwtToken(result);
            // console.log(token);
            return token;


        } catch (error) {
            throw error;
        }
    }

    async logoutUser(data: any): Promise<any> {
        try {


        } catch (error) {
            throw error;
        }
    }

    async registerUser(data: any): Promise<any> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const user = await this.unitOfWork.userRepository.createUser(data, session);
            await this.unitOfWork.commitTransaction();
            return user;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async removeUserPreference(data: any): Promise<any> {
        try {
            //TODO:
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(data: any): Promise<any> {
        try {
            //TODO:
        } catch (error) {
            throw error;
        }
    }
}

export default UserServices;