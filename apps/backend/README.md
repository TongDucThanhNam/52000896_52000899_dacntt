### Push Schema to D1
- Local first (You mush go to terminal path backend first.):
Generate new SQL file:
```bash
bun drizzle-kit generate
```
Then copy the new SQL fileName and run the following command with ./drizzle/migrations/${fileName}

```bash
# syntax: bunx wrangler d1 execute <databaseName> --local --file <pathToMigrationFile>
bunx wrangler d1 execute fashion-ai --local --file ./drizzle/migrations/0000_clammy_vertigo.sql
```

After updating all repositories, push the schema to D1:

```bash
bun run db:up
```

- Remote (Cloudflare):
Or use the drizzle-kit push command directly:

```bash
bunx drizzle-kit push
```

###  Test the Application

Test all functionality to ensure the migration was successful:

1. Test CRUD operations for all entities
2. Test transaction management
3. Test error handling

## Notes

- The migration maintains the same interface for services, so the API should continue to work as before
- Drizzle D1 transactions work differently from Mongoose transactions - they are automatically started for each request
- The UnitOfWorkFactory ensures that each service gets a fresh UnitOfWork with the current environment