import { type DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '../../../Domain/Entities/schema';

export interface IBaseUnitOfWork {
    getDb(): DrizzleD1Database<typeof schema>;

    startTransaction(): Promise<void>;

    commitTransaction(): Promise<void>;

    abortTransaction(): Promise<void>;
}
