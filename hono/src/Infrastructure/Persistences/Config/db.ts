import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '../../../Domain/Entities/schema';
import type { Env } from '../../../index';

/**
 * DbContext is a singleton class that provides access to the Drizzle D1 database instance.
 * It's initialized with the Cloudflare environment at application startup.
 */
export class DbContext {
    private static instance: DbContext;
    private db: DrizzleD1Database<typeof schema> | null = null;

    private constructor() {}

    /**
     * Get the singleton instance of the DbContext
     */
    public static getInstance(): DbContext {
        if (!DbContext.instance) {
            DbContext.instance = new DbContext();
        }
        return DbContext.instance;
    }

    /**
     * Initialize the DbContext with the Cloudflare environment
     * This should be called once at application startup
     */
    public initialize(env: Env): void {
        if (!this.db) {
            console.log("Initializing Drizzle D1 database connection...");
            this.db = drizzle(env.D1Database, { schema });
            console.log("Drizzle D1 database connection initialized!");
        }
    }

    /**
     * Get the Drizzle D1 database instance
     * Throws an error if the DbContext has not been initialized
     */
    public getDb(): DrizzleD1Database<typeof schema> {
        if (!this.db) {
            throw new Error("DbContext has not been initialized with an environment");
        }
        return this.db;
    }
}

// Export a function to get the database instance
export function getDb(): DrizzleD1Database<typeof schema> {
    return DbContext.getInstance().getDb();
}
