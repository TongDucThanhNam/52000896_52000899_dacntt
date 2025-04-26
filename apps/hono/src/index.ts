import { streamText } from "ai";
import cartRoutes from "./Api/Routes/CartRoutes";
import interactionRoutes from "./Api/Routes/InteractionRoutes";
import productRoutes from "./Api/Routes/ProductRoutes";
import {UnitOfWorkFactory} from './Infrastructure/Persistences/Factories/UnitOfWorkFactory';
import transactionRoutes from './Api/Routes/TransactionRoutes';
import userRoutes from './Api/Routes/UserRoutes';
import {DbContext} from './Infrastructure/Persistences/Config/db';
import {cors} from 'hono/cors'
import { Hono } from "hono";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { stream } from "hono/streaming";

import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers";
import { google } from "@ai-sdk/google";

import { createContext } from "./lib/context";

export type Env = {
    D1Database: D1Database; // <BINDING_NAME>: D1Database;
}

const app = new Hono<
    {
        Bindings: Env;
    }
>();

app.use(logger());
app.use(
	"/*",
	cors({
		origin: process.env.CORS_ORIGIN || "",
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	}),
);

app.post("/ai", async (c) => {
	const body = await c.req.json();
	const messages = body.messages || [];

	const result = streamText({
		model: google("gemini-1.5-flash"),
		messages,
	});

	c.header("X-Vercel-AI-Data-Stream", "v1");
	c.header("Content-Type", "text/plain; charset=utf-8");

	return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

app.get("/", (c) => {
	return c.text("OK");
});

app.use('/api/*', cors(
    {
        origin: '*',
    }
))


// Initialize the DbContext and UnitOfWorkFactory with the environment for each request
app.use('*', async (c, next) => {
    // Initialize the DbContext with the environment
    DbContext.getInstance().initialize(c.env);

    // Initialize the UnitOfWorkFactory with the environment
    UnitOfWorkFactory.getInstance().initialize(c.env);

    await next();
});

app.route('/api', cartRoutes);
app.route('/api', interactionRoutes);
app.route('/api', productRoutes);
app.route('/api', transactionRoutes);
app.route('/api', userRoutes);

export default app