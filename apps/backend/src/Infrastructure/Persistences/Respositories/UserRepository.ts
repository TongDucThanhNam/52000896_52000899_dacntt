import type { IUserRepository } from "../../../Application/Persistences/IRepositories/IUserRepository.ts";
import { user } from "../../../Domain/Entities/UserEntities";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class UserRepository implements IUserRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  getAllUsers(queryData: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async createUser(userData: any): Promise<any> {
    try {
      const result = await this.db.insert(user).values(userData).returning();
      return result;
    } catch (error) {
      throw new Error(`Error at UserRepository.createUser: ${error}`);
    }
  }

  async getUserById(userId: string, queryData: any): Promise<any> {
    try {
      const result = await this.db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);
      return result[0] || null;
    } catch (error) {
      throw new Error(`Error at UserRepository.getUserById: ${error}`);
    }
  }

  async getAlluser(queryData: any): Promise<any> {
    try {
      const result = await this.db.select().from(user);
      return result;
    } catch (error) {
      throw new Error(`Error at UserRepository.getAlluser: ${error}`);
    }
  }

  async updateUserById(userId: string, userData: any): Promise<any> {
    try {
      await this.db
        .update(user)
        .set(userData)
        .where(eq(user.id, userId))
        .returning();

      // Return the updated user
      const updatedUser = await this.db
        .select()
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);
      return updatedUser[0] || null;
    } catch (error) {
      throw new Error(`Error at UserRepository.updateUserById: ${error}`);
    }
  }

  async deleteUserById(userId: string): Promise<any> {
    try {
      //TODO: Soft Delete
      await this.db.delete(user).where(eq(user.id, userId));
    } catch (error) {
      throw new Error(`Error at UserRepository.deleteUserById: ${error}`);
    }
  }
}

export default UserRepository;
