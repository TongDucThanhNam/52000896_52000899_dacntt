import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';
import type { ICart } from '../Interface/ICart';

// --- Cart Schema ---
export const carts = sqliteTable('carts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('userId'), // FK to users.id
    cartUpdatedAt: text('cartUpdatedAt').default(new Date().toISOString()),
    ...baseColumns,
});

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;