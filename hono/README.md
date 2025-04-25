# Mongoose to Drizzle D1 Migration

This project has been migrated from Mongoose (MongoDB) to Drizzle ORM with Cloudflare D1 (SQLite). This README provides instructions for completing the migration process.

## Completed Migration Steps

1. Updated the `IBaseUnitOfWork` interface to work with Drizzle D1 instead of Mongoose
2. Implemented a new `BaseUnitOfWork` class that uses Drizzle D1
3. Updated the `UnitOfWork` class to accept the Cloudflare environment
4. Created a `UnitOfWorkFactory` to provide UnitOfWork instances with the environment
5. Updated the `index.ts` file to initialize the UnitOfWorkFactory
6. Updated the `CartServices` class to use the UnitOfWorkFactory
7. Configured `drizzle.config.ts` for pushing schema changes to D1

## Remaining Migration Steps

### 1. Update Service Classes

Update all service classes to use the UnitOfWorkFactory instead of directly instantiating UnitOfWork:

```typescript
// Before
private unitOfWork: IUnitOfWork = new UnitOfWork();

// After
private get unitOfWork(): IUnitOfWork {
    return UnitOfWorkFactory.getInstance().createUnitOfWork();
}
```

Service classes that need to be updated:
- InteractionServices
- ProductServices
- TransactionServices
- UserServices

### 2. Update Repository Classes

All repository classes need to be updated to use Drizzle D1 instead of Mongoose. For each repository:

1. Remove Mongoose imports and dependencies
2. Update methods to use Drizzle D1 queries
3. Update the constructor to accept a Drizzle D1 database instance

Example repository implementation with Drizzle:

```typescript
import { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '../../../Domain/Entities/schema';
import { users } from '../../../Domain/Entities/schema';
import { eq } from 'drizzle-orm';

class UserRepository implements IUserRepository {
    constructor(private db: DrizzleD1Database<typeof schema>) {}

    async createUser(userData: any): Promise<any> {
        try {
            const result = await this.db.insert(users).values(userData).returning();
            return result[0];
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    async getUserById(userId: string): Promise<any> {
        try {
            const user = await this.db.select().from(users).where(eq(users.id, parseInt(userId))).get();
            return user;
        } catch (error) {
            throw new Error("Error at UserRepository: " + error);
        }
    }

    // Other methods...
}
```

### 3. Push Schema to D1

After updating all repositories, push the schema to D1:

```bash
npm run db:up
```

Or use the drizzle-kit push command directly:

```bash
npx drizzle-kit push
```

### 4. Test the Application

Test all functionality to ensure the migration was successful:

1. Test CRUD operations for all entities
2. Test transaction management
3. Test error handling

## Notes

- The migration maintains the same interface for services, so the API should continue to work as before
- Drizzle D1 transactions work differently from Mongoose transactions - they are automatically started for each request
- The UnitOfWorkFactory ensures that each service gets a fresh UnitOfWork with the current environment