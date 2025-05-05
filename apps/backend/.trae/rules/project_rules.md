## Product instructions

1. This Project using Hono as Backend Framework, target deploy to Cloudflare Workers.
2. Project split into 4 layers:
   1. Domain: Entities `src/Domain/Entities/*Entity.ts`
   2. Controllers: Handle Request and Response `src/Api/Controllers/*Controller.ts`
   3. Services: Handle Business Logic `src/Application/Features/*/*Services.ts`
   4. Repositories: Handle Database: `src/Infrastructure/Repositories/*Repository.ts`
3. Database: Cloudflare D1 connect via Drizzle ORM:
   - `src/Infrastructure/Database/Drizzle.ts`
   - `src/Infrastructure/Database/Schema.ts`
4. Auth: Better-auth

## Roadmap

- [ ] Fix all bugs
- [ ] Optimized query
- [ ] tRPC
- [ ] AI generation.
- [ ] Check auth and permission via Middleware
- [ ] OpenAPI
- [ ] CI/CD
- [ ] Docker
- [ ] Payment webhook with Sepay.
