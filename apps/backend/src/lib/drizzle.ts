import {drizzle, DrizzleD1Database} from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";

export class DrizzleDB {
    private static instance?: DrizzleD1Database<Record<string, never>>;

    public static getInstance(d1: D1Database) {
        if (!this.instance) {
            this.instance = drizzle(d1);
        }

        return this.instance;
    }
}
