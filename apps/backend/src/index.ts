import { cors } from "hono/cors";
import { Hono } from "hono";
import { auth } from "./lib/auth";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers";
import { createContext } from "./lib/context";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";
import type { Session, User } from "better-auth/types";
import { UnitOfWorkFactory } from "./Infrastructure/Persistences/Factories/UnitOfWorkFactory";
import interactionRoutes from "./Api/Routes/InteractionRoutes";
import productRoutes from "./Api/Routes/ProductRoutes";
import transactionRoutes from "./Api/Routes/TransactionRoutes";
import userRoutes from "./Api/Routes/UserRoutes";
import { user } from "./Domain/Entities/UserEntities";

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
}>({ strict: false });

const route = app
  .use("*", (c, next) => {
    // console.log("Setting CORS headers")
    return cors({
      // When this work, don't touch it.
      origin: [
        c.env.CORS_ORIGIN,
        "https://fashion-ai-peach.vercel.app",
        "https://fashion-ai.tongducthanhnam.id.vn",
        "http://localhost:8787", // for local development
        "http://localhost:3000",
      ], // Don't know why but this is the only way to make it work
      allowMethods: ["*"],
      allowHeaders: ["*"],
      credentials: true,
    })(c, next);
  })
  .use("*", async (c, next) => {
    // DB
    const db = drizzle(c.env.D1Database);
    c.set("db", db);
    await next();
  })
  .on(["POST", "GET"], "/api/auth/*", (c) => {
    // console.log("Authenticating request")
    const db = c.get("db");

    //check Env
    // console.log("Env", c.env);

    // Retrieve the db instance from context instead of creating a new one
    // Pass the retrieved db instance to auth
    const authInstance = auth(db, c.env);
    return authInstance.handler(c.req.raw);
  })
  .use("*", async (c, next) => {
    const db = c.get("db");
    // Auth/session
    const session = await auth(db, c.env).api.getSession({
      headers: c.req.raw.headers,
    });
    c.set("user", session?.user ?? null);
    c.set("session", session?.session ?? null);

    // UnitOfWork
    UnitOfWorkFactory.getInstance().initializeWithDb(db);
    await next();
  })
  // tRPC
  // .use("/trpc/*", async (c, next) => {
  //   // console.log("Handling TRPC request")
  //   return trpcServer({
  //     router: appRouter,
  //     createContext: async (_opts, c) => {
  //       return createContext({
  //         req: c.req.raw,
  //         env: c.env,
  //         workerCtx: c.executionCtx,
  //       });
  //     },
  //   })(c, next);
  // })
  .route("/api", interactionRoutes)
  .route("/api", productRoutes)
  .route("/api", transactionRoutes)
  .route("/api", userRoutes)
  .get("/", (c) => {
    // console.log("Handling GET request")
    return c.json({
      CORS_ORIGIN: c.env.CORS_ORIGIN,
      BETTER_AUTH_URL: c.env.BETTER_AUTH_URL,
      message: "Hello World!",
    }); // Should be removed in production
  })
  // Add global error handling middleware
  .onError(async (err, c) => {
    console.error(`Error occurred: ${err.message}`);

    // You can customize the error response based on the error type
    const status = err instanceof Error ? 500 : 400;
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";

    // Return a JSON response with the error details
    return c.json(
      {
        success: false,
        error: message,
        status,
      },
      status,
    );
  })

  // Error handling middleware
  .notFound((c) => {
    return c.json(
      {
        success: false,
        error: "Not Found",
        message: `The requested path '${c.req.path}' was not found on this server`,
        status: 404,
      },
      404,
    );
  });

export type AppType = typeof route;
export default route;
