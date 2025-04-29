import {cors} from "hono/cors";
import {Hono} from "hono";
import {auth} from "./lib/auth";
import {trpcServer} from "@hono/trpc-server";
import {appRouter} from "./routers";
import {createContext} from "./lib/context";
import type {DrizzleD1Database} from "drizzle-orm/d1";
import {drizzle} from "drizzle-orm/d1";
import type {D1Database} from "@cloudflare/workers-types";
import {Session, User} from "better-auth/types";
import {UnitOfWorkFactory} from "./Infrastructure/Persistences/Factories/UnitOfWorkFactory";
import interactionRoutes from "./Api/Routes/InteractionRoutes";
import productRoutes from "./Api/Routes/ProductRoutes";
import transactionRoutes from "./Api/Routes/TransactionRoutes";
import userRoutes from "./Api/Routes/UserRoutes";

export type Variables = {
    db: DrizzleD1Database<Record<string, never>>;
    jwtPayload?: { id: string };
    user: User | null;
    session: Session | null;
};
export type Env = {
    D1Database: D1Database; // <BINDING_NAME>: D1Database;
    CORS_ORIGIN: string;
    BETTER_AUTH_URL: string;
};

const app = new Hono<{
    Bindings: Env;
    Variables: Variables;
}>({strict: false});

const route = app
    .use("*", (c, next) => {
            // console.log("Setting CORS headers")
            return cors({
                origin: c.env.CORS_ORIGIN ? `https://${c.env.CORS_ORIGIN}` : "https://fashion-ai.tongducthanhnam.id.vn",
                allowMethods: ["GET", "POST", "OPTIONS"],
                allowHeaders: ["Content-Type", "Authorization"],
                credentials: true,
            })(c, next);
        }
    )
    .use("*", async (c, next) => {
        // console.log("Connecting to D1 database:")
        const db = drizzle(c.env.D1Database);
        // console.log("Connected to D1 database")
        // console.log("Getting session from Better Auth:")
        const session = await auth(db, c.env).api.getSession({
            headers: c.req.raw.headers,
        });
        // console.log("Got session from Better Auth")

        if (!session) {
            // console.log("No session found, clearing user and session")
            c.set("user", null);
            c.set("session", null);
            return next();
        }

        // console.log(`Session found, setting ${session.user.name} and ${session.session.userAgent}`)
        c.set("user", session.user);
        c.set("session", session.session);
        return next();
    })
    .on(["POST", "GET"], "/api/auth/*", (c) => {
        // console.log("Authenticating request")
        const db = drizzle(c.env.D1Database);
        const authInstance = auth(db, c.env);
        return authInstance.handler(c.req.raw);
    })
    .use("/trpc/*", async (c, next) => {
        // console.log("Handling TRPC request")
        return trpcServer({
            router: appRouter,
            createContext: async (_opts, c) => {
                return createContext({
                    req: c.req.raw,
                    env: c.env,
                    workerCtx: c.executionCtx,
                });
            },
        })(c, next);
    })
    .get("/", (c) => {
        // console.log("Handling GET request")
        return c.json({
            CORS_ORIGIN: c.env.CORS_ORIGIN
                ? `https://${c.env.CORS_ORIGIN}`
                : "https://fashion-ai.tongducthanhnam.id.vn",
            BETTER_AUTH_URL: c.env.BETTER_AUTH_URL,
            message: "Hello World!",
        });
    })
    //TODO: Improve this middleware
    .use(async (ctx, next) => {
        const db = drizzle(ctx.env.D1Database);
        ctx.set("db", db);

        // Initialize UnitOfWorkFactory with the database instance
        UnitOfWorkFactory.getInstance().initializeWithDb(db);
        await next();
    })
    .route('/api', interactionRoutes)
    .route('/api', productRoutes)
    .route('/api', transactionRoutes)
    .route('/api', userRoutes)

export type AppType = typeof route;
export default route;