import type {ClientSession} from "mongoose";

export interface IBaseMongooseSession {
    startTransaction(): Promise<ClientSession>;

    commitTransaction(): Promise<void>;

    abortTransaction(): Promise<void>;
}