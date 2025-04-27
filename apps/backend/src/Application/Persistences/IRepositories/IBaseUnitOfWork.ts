import type {  DrizzleD1Database } from 'drizzle-orm/d1';

export interface IBaseUnitOfWork {
    getDb(): DrizzleD1Database<any>;

    startTransaction(): Promise<void>;

    commitTransaction(): Promise<void>;

    abortTransaction(): Promise<void>;
}
