import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type {IUserServices} from "../../Persistences/IServices/IUserServices.ts";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import {type UserWithBase} from "../../../Domain/Entities/UserEntities.ts";
import {type PreferenceWithBase} from "../../../Domain/Entities/PreferenceEntities.ts";
import {CoreException} from "../../Common/Exceptions/CoreException.ts";

function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
}

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

    async createUser(data: any): Promise<typeof UserWithBase | CoreException> {
        try {
            // Check if the user already exists
            const existingUser = await this.unitOfWork.userRepository.getAllUsers(
                {
                    userEmail: data.userEmail,
                    isDeleted: false,
                    isActive: true,
                }
            )

            if (existingUser && existingUser.length > 0) {
                return new CoreException(
                    400,
                    "Người dùng đã tồn tại"
                );
            }

            const session = await this.unitOfWork.startTransaction();
            const saltRounds = 12;
            data.userPasswordHash = await bcrypt.hash(data.userPasswordHash, saltRounds);
            console.log(data);
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
            const {userId, preferenceType, preferenceValue, preferenceScore} = data;

            // Check if the preference already exists for this user
            const queryData = {};
            const existingPreferences: any = await this.unitOfWork.preferenceRepository.getPreferencesByUserId(
                userId,
                queryData
            );

            let result;
            if (existingPreferences && existingPreferences.length > 0) {
                // Use the first existing preference record
                const existingPreference = existingPreferences[0];
                // If exists, add to the current preferenceScore
                const newScore = existingPreference.preferenceScore + preferenceScore;
                result = await this.unitOfWork.preferenceRepository.updatePreferenceById(
                    existingPreference._id,
                    {preferenceScore: newScore},
                    session
                );
            } else {
                // Otherwise, create a new preference record
                result = await this.unitOfWork.preferenceRepository.createPreference(
                    {userId, preferenceType, preferenceValue, preferenceScore},
                    session
                );
            }
            await this.unitOfWork.commitTransaction();
            return result;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async forgotPassword(data: any): Promise<void> {
        try {
            //TODO: implement this
        } catch (error) {
            throw error;
        }
    }

    async loginUser(data: any): Promise<any> {
        try {
            const {userEmail, userPasswordHash} = data;

            const queryData = {
                userEmail: userEmail,
                isDeleted: false,
                isActive: true,
            };

            const users: any = await this.unitOfWork.userRepository.getAllUsers(queryData);

            if (!users || users.length === 0) {
                // throw new Error('User not found');
                return new CoreException(
                    401,
                    "Người dùng không tồn tại"
                );
            }

            const user = users[0];

            // Compare plain-text password with the hashed password using bcrypt
            const isValid = await bcrypt.compare(userPasswordHash, user.userPasswordHash);
            if (!isValid) {
                // throw new Error('Password is incorrect');
                return new CoreException(
                    401,
                    "Mật khẩu không chính xác"
                );
            }

            const token = encodeJwtToken(user);
            return token;
        } catch (error) {
            throw error;
        }
    }

    async logoutUser(data: any): Promise<any> {
        try {
            //TODO: implement this

        } catch (error) {
            throw error;
        }
    }

    async registerUser(data: any): Promise<any> {
        try {
            // Check if the user already exists
            const existingUser = await this.unitOfWork.userRepository.getAllUsers(
                {
                    userEmail: data.userEmail,
                    isDeleted: false,
                    isActive: true,
                }
            )

            if (existingUser && existingUser.length > 0) {
                return new CoreException(
                    400,
                    "Người dùng đã tồn tại"
                );
            }

            // Parse the userDateOfBirth if it's in "dd/mm/yyyy" format
            if (data.userDateOfBirth && typeof data.userDateOfBirth === "string") {
                data.userDateOfBirth = parseDate(data.userDateOfBirth);
            }
            const session = await this.unitOfWork.startTransaction();
            const saltRounds = 12;
            data.userPasswordHash = await bcrypt.hash(data.userPasswordHash, saltRounds);
            console.log(data);
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
            //TODO: implement this
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(data: any): Promise<any> {
        try {
            //TODO: implement this
        } catch (error) {
            throw error;
        }
    }
}

export default UserServices;