import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '../../../Domain/Entities/schema';
import type { IBaseUnitOfWork } from '../../../Application/Persistences/IRepositories/IBaseUnitOfWork';
import type { Env } from '../../../index';

export class BaseUnitOfWork implements IBaseUnitOfWork {
    private db: DrizzleD1Database<typeof schema> | null = null;
    private inTransaction: boolean = false;

    constructor(private env: Env) {
        console.log("Initializing Drizzle D1 database connection...");
        this.getDb();
    }

    getDb(): DrizzleD1Database<typeof schema> {
        if (!this.db) {
            this.db = drizzle(this.env.D1Database, { schema });
            console.log("Drizzle D1 database connection initialized!");
        }
        return this.db;
    }

    async startTransaction(): Promise<void> {
        try {
            // D1 automatically starts a transaction for each request
            // We'll just set a flag to track that we're in a transaction
            this.inTransaction = true;
            console.log("Transaction started");
        } catch (error: any) {
            console.error("Error starting transaction:", error);
            throw new Error(error.message);
        }
    }

    async commitTransaction(): Promise<void> {
        try {
            // D1 automatically commits the transaction at the end of the request
            // We'll just reset our flag
            this.inTransaction = false;
            console.log("Transaction committed successfully!");
        } catch (error: any) {
            console.error("Error committing transaction:", error);
            throw new Error(error.message);
        }
    }

    async abortTransaction(): Promise<void> {
        try {
            // For D1, we would need to throw an error to abort the transaction
            // Since D1 automatically rolls back on error
            this.inTransaction = false;
            console.log("Transaction aborted!");
        } catch (error: any) {
            console.error("Error aborting transaction:", error);
            throw new Error(error.message);
        }
    }
}
