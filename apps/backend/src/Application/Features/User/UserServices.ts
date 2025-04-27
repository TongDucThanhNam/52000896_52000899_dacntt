import { decode, sign, verify, jwt } from 'hono/jwt';
import dotenv from "dotenv";
import { createHash } from 'crypto';
import type {IUserServices} from "../../Persistences/IServices/IUserServices.ts";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {CoreException} from "../../Common/Exceptions/CoreException";
import { config } from 'dotenv';
import { UnitOfWorkFactory } from "../../../Infrastructure/Persistences/Factories/UnitOfWorkFactory.js";
config({ path: '.dev.vars' });

function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
}

dotenv.config();

// Helper function to hash passwords
function hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
}

// Helper function to verify passwords
function verifyPassword(password: string, hashedPassword: string): boolean {
    const hashedInput = hashPassword(password);
    return hashedInput === hashedPassword;
}

async function encodeJwtToken(user: any): Promise<{ accessToken: string; refreshToken: string; }> {
    console.log(user);
    const accessToken: string = await sign(
        {userId: user.id},
        process.env.JWT_SECRET || 'fashionAIToken'
    );

    const refreshToken: string = await sign(
        {userId: user.id},
        process.env.REFRESH_TOKEN_SECRET || 'fashionAIToken'
    );

    // console.log(accessToken, refreshToken);

    return {
        accessToken,
        refreshToken
    };
}

class UserServices implements IUserServices {
    private get unitOfWork(): IUnitOfWork {
        return UnitOfWorkFactory.getInstance().createUnitOfWork();
    }

    async createUser(data: any): Promise<any> {
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

            // Handle date of birth if present
            if (data.userDateOfBirth && data.userDateOfBirth instanceof Date) {
                data.userDateOfBirth = data.userDateOfBirth.toISOString();
            }

            data.userPasswordHash = hashPassword(data.userPasswordHash);
            console.log(data);
            const user = await this.unitOfWork.userRepository.createUser(data);
            return user;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async deleteUser(data: any): Promise<any> {
        try {
            const user = await this.unitOfWork.userRepository.deleteUserById(data);
            return user;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async getAllUsers(data: any): Promise<any> {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true,
            }
            const users = await this.unitOfWork.userRepository.getAllUsers(queryData);
            return users;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async getUserById(data: any): Promise<any> {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true,
            }
            const user = await this.unitOfWork.userRepository.getUserById(data, queryData);
            return user;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async getUserPreferences(data: any): Promise<any> {
        try {
            const {
                userId,
                ...restData
            } = data
            const preferences: any = await this.unitOfWork.preferenceRepository.getPreferencesByUserId(userId, restData);
            return preferences;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async updateUser(data: any): Promise<any> {
        try {
            const {
                userId,
                ...userData
            } = data

            // Handle date of birth if present
            if (userData.userDateOfBirth && userData.userDateOfBirth instanceof Date) {
                userData.userDateOfBirth = userData.userDateOfBirth.toISOString();
            }

            const user = await this.unitOfWork.userRepository.updateUserById(userId, userData);
            return user;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async updateUserPreferences(data: any): Promise<any> {
        try {
            const {
                userId,
                ...preferenceData
            } = data
            const preferences = await this.unitOfWork.preferenceRepository.updatePreferenceById(
                userId,
                preferenceData);
            return preferences;
        } catch (error) {
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async addUserPreference(data: any): Promise<any> {
        try {
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
                );
            } else {
                // Otherwise, create a new preference record
                result = await this.unitOfWork.preferenceRepository.createPreference(
                    {userId, preferenceType, preferenceValue, preferenceScore},
                );
            }
            return result;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async forgotPassword(data: any): Promise<void> {
        throw new CoreException(501, "Not implemented");
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

            // Compare plain-text password with the hashed password
            const isValid = verifyPassword(userPasswordHash, user.userPasswordHash);
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
            if (error instanceof CoreException) {
                throw error;
            }
            throw new CoreException(500, "Internal server error");
        }
    }

    async logoutUser(data: any): Promise<any> {
        throw new CoreException(501, "Not implemented");
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
                // Convert to Date object for validation/processing
                const dateObj = parseDate(data.userDateOfBirth);
                // Convert back to ISO string format for database storage
                data.userDateOfBirth = dateObj.toISOString();
            }
            data.userPasswordHash = hashPassword(data.userPasswordHash);
            console.log(data);
            const user = await this.unitOfWork.userRepository.createUser(data);
            return user;
        } catch (error) {
            throw new Error(`Error when registering user: ${error}`);
        }
    }

    async removeUserPreference(data: any): Promise<any> {
        throw new CoreException(501, "Not implemented");
    }

    async resetPassword(data: any): Promise<any> {
        throw new CoreException(501, "Not implemented");
    }
}

export default UserServices;
