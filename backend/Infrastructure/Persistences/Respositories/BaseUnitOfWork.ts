import mongoose, {type ClientSession} from "mongoose";
import type {IBaseUnitOfWork} from "../../../Application/Persistences/IRepositories/IBaseUnitOfWork";

require('dotenv').config();
const URI = process.env.CONNECTION_STRING;
const DBName = process.env.DATABASE_NAME

export class BaseUnitOfWork implements IBaseUnitOfWork {
    private session: ClientSession | null = null;

    constructor() {
        this.connect();
        // connectDB().then(r => console.log(r));
    }

    async connect() {
        try {
            await mongoose.connect(`${URI}`, {
                dbName: DBName,
                connectTimeoutMS: 60000,
            });
            console.log("Connected successfully to database !");
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async startTransaction(): Promise<ClientSession> {
        try {
            this.session = await mongoose.startSession();
            this.session.startTransaction();
            return this.session;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async commitTransaction(): Promise<void> {
        try {
            await this.session?.commitTransaction();
            this.session?.endSession();
            console.log("Commit change to database successfully!");
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async abortTransaction(): Promise<void> {
        try {
            await this.session?.abortTransaction();
            this.session?.endSession();
            console.log("Abort change to database!");
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
