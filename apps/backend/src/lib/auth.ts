import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "../Domain/Entities/index";
import { Env } from "..";

export const auth = (db: DrizzleD1Database, env: Env) => {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: schema,
    }),
    advanced: {
      disableCSRFCheck: true,

      crossSubDomainCookies: {
        enabled: true,
        // domain: env.CORS_ORIGIN || "https://fashion-ai.tongducthanhnam.id.vn",
      },
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
      process.env.CORS_ORIGIN || "https://fashion-ai.tongducthanhnam.id.vn",
      "https://fashion-ai.terasumi.workers.dev",
      "http://localhost:8787", // for local development
      "http://localhost:3000",
    ],
    emailAndPassword: {
      enabled: true,
    },
  });
};

export type BetterAuth = ReturnType<typeof auth>;
