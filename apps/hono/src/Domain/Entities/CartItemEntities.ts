import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { ICartItem } from '../Interface/ICartItem';
import { baseColumns } from './BaseEntities';

// --- CartItem Schema ---
export const cartItems = sqliteTable('cart_items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    cartId: integer('cart_id').notNull(), // FK to carts.id
    productId: integer('product_id').notNull(), // FK to products.id
    variantId: integer('variant_id'), // FK to variants.id
    cartItemQuantity: integer('quantity').notNull(),
    cartItemUpdatedAt: text('updated_at').default(new Date().toISOString()),
    ...baseColumns,
});

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;