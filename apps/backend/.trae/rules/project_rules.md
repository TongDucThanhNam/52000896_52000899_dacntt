## Product instructionss
1. This Project using Hono as Backend Framework, target deploy to Cloudflare Workers.
2. Project split into 4 layers:
   1. Routes: API Routes
   2. Controllers: Handle Request and Response
   3. Services: Handle Business Logic
   4. Repositories: Handle Database
3. Database: Cloudflare D1 connect via Drizzle ORM
4. Auth: Better-auth
## Roadmap
- [ ] Fix all bugs
- [ ] Check auth and permission via Middleware
- [ ] OpenAPI
- [ ] CI/CD
- [ ] Docker
- [ ] Payment webhook with Sepay.