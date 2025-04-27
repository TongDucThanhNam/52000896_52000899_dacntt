import { streamText } from "ai";
import interactionRoutes from "./Api/Routes/InteractionRoutes";
import productRoutes from "./Api/Routes/ProductRoutes";
import {UnitOfWorkFactory} from './Infrastructure/Persistences/Factories/UnitOfWorkFactory';
import transactionRoutes from './Api/Routes/TransactionRoutes';
import userRoutes from './Api/Routes/UserRoutes';
import {cors} from 'hono/cors'
import { Hono } from "hono";
import { logger } from "hono/logger";
import { createAuthInstance } from "./lib/auth";
import { stream } from "hono/streaming";
import 'dotenv/config';


import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers";
import { google } from "@ai-sdk/google";

import { createContext } from "./lib/context";
import {DrizzleDB} from "./lib/drizzle";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";

export type Variables = {
	db: DrizzleD1Database<Record<string, never>>;
	jwtPayload?: { id: string };
};
export type Env = {
    D1Database: D1Database; // <BINDING_NAME>: D1Database;
}

const app = new Hono<
    {
        Bindings: Env;
		Variables: Variables;
    }
>();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "http://localhost:3000",
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

// Set the database instance on the context for each request
// and initialize UnitOfWorkFactory with it
app.use(async (ctx, next) => {
	const db = DrizzleDB.getInstance(ctx.env.D1Database);
	ctx.set("db", db);

	// Initialize UnitOfWorkFactory with the database instance
	UnitOfWorkFactory.getInstance().initializeWithDb(db);

	await next();
});

// TODO: Fix error: [wrangler:inf] POST /api/auth/sign-up/email 422 UNPROCESSABLE_ENTITY (218ms)
app.on(["POST", "GET"], "/api/auth/*", (c, next) => {
	console.log("Auth handler"); // This line not executed
	const db = c.get("db");
	const authInstance = createAuthInstance(db, c.env);
	console.log("Auth instance created");
	console.log("Request: ", c.req.raw);

	return authInstance.handler(c.req.raw);
});

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	}),
);

app.get("/", (c) => {
	return c.text("OK");
});

app.route('/api', interactionRoutes);
app.route('/api', productRoutes);
app.route('/api', transactionRoutes);
app.route('/api', userRoutes);

export default app
