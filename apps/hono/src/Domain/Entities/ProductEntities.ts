import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { IProduct } from '../Interface/IProduct.ts';
import { baseColumns } from './BaseEntities';

export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    productName: text('product_name'),
    productSlug: text('product_slug'),
    productDescription: text('product_description'),
    productBrand: text('product_brand'),
    imageUrls: text('image_urls'),
    categoryId: integer('category_id').notNull(),
    productAvgRating: integer('product_avg_rating'),
    productTotalViews: integer('product_total_views'),
    ...baseColumns
});

export type Product = typeof products.$inferSelect;