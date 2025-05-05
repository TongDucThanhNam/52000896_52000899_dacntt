import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "../Domain/Entities/index";
import type { Env } from "..";

export const auth = (db: DrizzleD1Database, env: Env) => {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: schema,
    }),
    // session: {
    //   cookieCache: {
    //     enabled: true,
    //     maxAge: 60 * 60 * 24 * 7, // 1 week
    //   },
    // },
    advanced: {
      useSecureCookies: true, // Use secure cookies (default: false)
      disableCSRFCheck: true, // Disable trusted origins check (⚠️ security risk)
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        partitioned: true, // New browser standards will mandate this for foreign cookies
      }, // Default attributes for all cookies
      crossSubDomainCookies: {
        enabled: true,
        // domain: env.CORS_ORIGIN || "https://fashion-ai.tongducthanhnam.id.vn",
      }, // Configure cookies to be shared across subdomains
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
          input: false, // không cho phép người dùng đặt vai trò
        },
        phone: {
          type: "string",
          required: false, // Đặt thành true nếu bắt buộc
          input: true,
        },
        height: {
          type: "number",
          required: false,
          input: true,
        },
        weight: {
          type: "number",
          required: false,
          input: true,
        },
        dateOfBirth: {
          type: "string", // Giả sử ngày sinh được lưu dưới dạng chuỗi
          required: false,
          input: true,
        },
        address: {
          type: "string",
          required: false,
          input: true,
        },
        imageUrl: {
          type: "string",
          required: false,
          input: true,
        },
        gender: {
          type: "string",
          required: false,
          input: true,
        },
        job: {
          type: "string",
          required: false,
          input: true,
        },
        city: {
          type: "string",
          required: false,
          input: true,
        },
      },
    },
    trustedOrigins: [
      env.CORS_ORIGIN,
      "https://fashion-ai-be.tongducthanhnam.id.vn",
      "https://fashion-ai.tongducthanhnam.id.vn",
      "https://fashion-ai.terasumi.workers.dev", // cloudflare
      "https://fashion-ai-peach.vercel.app", //vercel
      "http://localhost:8787", // local
      "http://localhost:3000", // local
    ],
    emailAndPassword: {
      enabled: true,
    },
  });
};

export type BetterAuth = ReturnType<typeof auth>;
