import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

/**
 * Bảng tương tác sử dụng Drizzle ORM cho Cloudflare D1
 * Bao gồm các trường từ MongoDB Schema và các trường base
 */
export const interactions = sqliteTable('interactions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull(),
    productId: integer('product_id').notNull(),
    variantId: text('variant_id'),
    interactionType: text('interaction_type'),
    interactionContent: text('interaction_content'),
    interactionScore: integer('interaction_score'),
    ...baseColumns
});

export type Interaction = typeof interactions.$inferSelect;