import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// --- User ---
export const user = sqliteTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified").notNull(), // Use integer for boolean
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    // additionalFields
    phone: text("phone"),
    height: integer("height"),
    weight: integer("weight"),
    dateOfBirth: text("dateOfBirth"),
    address: text("address"),
    imageUrl: text("imageUrl"),
    gender: text("gender"),
    job: text("job"),
    city: text("city"),
    role: text("role"),
  },
  (table) => [index("email").on(table.email)],
);

export type User = typeof user.$inferSelect;
