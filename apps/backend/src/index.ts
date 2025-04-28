import interactionRoutes from "./Api/Routes/InteractionRoutes";
import productRoutes from "./Api/Routes/ProductRoutes";
import {UnitOfWorkFactory} from './Infrastructure/Persistences/Factories/UnitOfWorkFactory';
import transactionRoutes from './Api/Routes/TransactionRoutes';
import userRoutes from './Api/Routes/UserRoutes';
import {cors} from 'hono/cors'
import { Hono } from "hono";
import { logger } from "hono/logger";
import { createAuthInstance } from "./lib/auth";
import 'dotenv/config';


import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers";

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
	CORS_ORIGIN: string;
	BETTER_AUTH_URL: string;
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
		origin: process.env.CORS_ORIGIN || "http://localhost:8787",
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

app.on(["POST", "GET"], "/api/auth/*", async (c, next) => {
	try {
		const db = c.get("db");
		// Thêm log để kiểm tra db và env có tồn tại không
		console.log("Database instance retrieved:", !!db);
		console.log("Environment variables:", JSON.stringify(c.env)); // Cẩn thận không log thông tin nhạy cảm

		if (!c.env.BETTER_AUTH_URL) {
			console.error("BETTER_AUTH_URL environment variable is not set!");
			return c.json({ error: "Server configuration error" }, 500);
		}

		const authInstance = createAuthInstance(db, c.env);
		console.log("Auth instance created");

		const response = await authInstance.handler(c.req.raw);
		console.log("Auth handler executed successfully");
		return response;
	} catch (error) {
		// Log lỗi chi tiết ra console của Cloudflare Worker
		console.error("Error in /api/auth/* handler:", error);
		// Có thể trả về một thông báo lỗi chung cho client
		return c.json({ error: "Internal Server Error", message: error instanceof Error ? error.message : 'Unknown error' }, 500);
	}
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
	return c.json(
		{
			CORS_ORIGIN: c.env.CORS_ORIGIN,
			BETTER_AUTH_URL: c.env.BETTER_AUTH_URL,
			message: "Hello World!",
		}
	);
});

app.route('/api', interactionRoutes);
app.route('/api', productRoutes);
app.route('/api', transactionRoutes);
app.route('/api', userRoutes);

export default app