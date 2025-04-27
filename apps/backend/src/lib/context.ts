import type { Context as HonoContext } from "hono";
import { createAuthInstance } from "./auth";
import type { Variables, Env } from "../index";

export type CreateContextOptions = {
	context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
	console.log("Creating context");
	const db = context.get("db") as Variables['db'];
	const env = context.env as Env;
	const authInstance = createAuthInstance(db, env);

	const session = await authInstance.api.getSession({
		headers: context.req.raw.headers,
	});

	return {
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
