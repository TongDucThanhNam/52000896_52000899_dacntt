import type { Env } from "../../../index";
import { UnitOfWork } from "../Respositories/UnitOfWork";
import type { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import { DrizzleD1Database } from "drizzle-orm/d1";

/**
 * Factory class for creating UnitOfWork instances with the Cloudflare environment.
 * This allows services to get a properly configured UnitOfWork without needing
 * direct access to the Cloudflare environment.
 */
export class UnitOfWorkFactory {
    private static instance: UnitOfWorkFactory;
    private env: Env | null = null;
    private db: DrizzleD1Database<Record<string, never>> | null = null;

    private constructor() {}

    /**
     * Get the singleton instance of the factory
     */
    public static getInstance(): UnitOfWorkFactory {
        if (!UnitOfWorkFactory.instance) {
            UnitOfWorkFactory.instance = new UnitOfWorkFactory();
        }
        return UnitOfWorkFactory.instance;
    }

    /**
     * Initialize the factory with the Cloudflare environment
     * This should be called once at application startup
     */
    public initialize(env: Env): void {
        this.env = env;
    }

    /**
     * Initialize the factory with a database instance
     * This can be used instead of initialize(env) when a database instance is already available
     */
    public initializeWithDb(db: DrizzleD1Database<Record<string, never>>): void {
        this.db = db;
    }

    /**
     * Create a new UnitOfWork instance with the stored environment or database
     */
    public createUnitOfWork(): IUnitOfWork {
        if (this.db) {
            return new UnitOfWork(this.db);
        }

        if (!this.env) {
            throw new Error("UnitOfWorkFactory has not been initialized with an environment or database");
        }
        return new UnitOfWork(this.env);
    }
}
