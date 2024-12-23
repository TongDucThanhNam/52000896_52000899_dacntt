import type {ClientSession} from "mongoose";
import {UserWithBase} from "../../../Domain/Entities/UserEntities.ts";
import type {IUserRepository} from "../../../Application/Persistences/IRepositories/IUserRepository.ts";

class UserRepository implements IUserRepository {
    async createUser(userData: any, session: ClientSession): Promise<typeof UserWithBase> {
        try {
            const user = await UserWithBase.create([userData], { session });
            return user[0];
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async getUserById(userId: string, queryData: any): Promise<typeof UserWithBase | null> {
        try {
            const user: any = await UserWithBase.findById(userId)
            return user;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async getAllUsers(queryData: any): Promise<(typeof UserWithBase)[] | null> {
        try {
            const users: any = await UserWithBase.find(queryData);
            return users;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async updateUserById(userId: string, userData: any, session: ClientSession): Promise<typeof UserWithBase | null> {
        try {
            const user: any = await UserWithBase.findByIdAndUpdate(userId, userData, {
                new: true,
                session: session
            });
            return user;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async deleteUserById(userId: string, session: ClientSession): Promise<typeof UserWithBase | null> {
        try {
            const user: any = await UserWithBase.findByIdAndUpdate(userId, {
                isActive: false,
                isDeleted: true
            }, {
                new: true,
                session: session
            });
            return user;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }
}

export default UserRepository;