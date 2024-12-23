import type {ClientSession} from "mongoose";
import {UserWithBase} from "../../../Domain/Entities/UserEntities";

export interface IUserRepository {
    //CRUD
    createUser(userData: any, session: ClientSession): Promise<typeof UserWithBase>;

    getUserById(userId: string, queryData: any): Promise<typeof UserWithBase | null>;

    getAllUsers(queryData: any): Promise<typeof UserWithBase[] | null>;

    updateUserById(userId: string, userData: any, session: ClientSession): Promise<typeof UserWithBase | null>;

    deleteUserById(userId: string, session: ClientSession): Promise<typeof UserWithBase | null>;

    //Other API
}