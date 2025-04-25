import type {IUserRepository} from "../../../Application/Persistences/IRepositories/IUserRepository.ts";
import {getDb} from "../Config/db";

class UserRepository implements IUserRepository {
    private db = getDb();

    async createUser(userData: any): Promise<any> {
        try {
            const user = await this.db.insert(users)
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