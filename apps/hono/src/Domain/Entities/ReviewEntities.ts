import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

// --- Review ---
export const reviews = sqliteTable('reviews', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('userId'), // FK to users.id
    productId: integer('productId'), // FK to products.id
    rating: real('rating'),
    reviewContent: text('reviewContent'),
    ...baseColumns,
  });

export type Review = typeof reviews.$inferSelect;