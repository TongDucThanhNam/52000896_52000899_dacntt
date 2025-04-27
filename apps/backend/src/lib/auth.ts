import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import * as schema from "../Domain/Entities/auth";
import type { Variables } from "../index";
import type { Env } from "../index";

export function createAuthInstance(db: Variables['db'], env: Env) {
    console.log("Creating auth instance");
    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
            schema: schema,
        }),
        trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:3000"],
        emailAndPassword: {
            enabled: true,
        },
    });
}

// For backward compatibility
export const auth = {
    handler: (req: Request) => {
        throw new Error("Direct usage of auth.handler is deprecated. Use createAuthInstance instead.");
    }
};
