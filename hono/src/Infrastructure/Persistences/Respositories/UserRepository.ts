import type {IUserRepository} from "../../../Application/Persistences/IRepositories/IUserRepository.ts";
import {getDb} from "../Config/db";
import {users} from "../../../Domain/Entities/schema";
import { eq } from "drizzle-orm";

class UserRepository implements IUserRepository {
    private db =  getDb();

    async createUser(userData: any): Promise<any> {
        try {
            const result = await this.db.insert(users).values(userData)
            return result;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async getUserById(userId: string, queryData: any): Promise<any> {
        try {
            const user = await this.db.select().from(users).where(eq(users.id, Number(userId))).limit(1);
            return user[0] || null;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async getAllUsers(queryData: any): Promise<any> {
        try {
            const result = await this.db.select().from(users);
            return result;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async updateUserById(userId: string, userData: any): Promise<any> {
        try {
            await this.db.update(users)
                .set(userData)
                .where(eq(users.id, Number(userId)));

            // Return the updated user
            const updatedUser = await this.db.select().from(users).where(eq(users.id, Number(userId))).limit(1);
            return updatedUser[0] || null;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async deleteUserById(userId: string): Promise<any> {
        try {
            await this.db.update(users)
                .set({
                    isActive: false,
                    isDeleted: true
                })
                .where(eq(users.id, Number(userId)));

            // Return the updated user
            const updatedUser = await this.db.select().from(users).where(eq(users.id, Number(userId))).limit(1);
            return updatedUser[0] || null;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }
}

export default UserRepository;
