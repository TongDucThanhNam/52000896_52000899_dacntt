import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities'; // Giả sử baseColumns được định nghĩa ở đây
import { products } from './ProductEntities'; // Giả sử bảng products được định nghĩa ở đây
import { tags } from './TagEntities'; // Giả sử bảng tags được định nghĩa ở đây

export const productTags = sqliteTable('product_tags', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    productId: integer('product_id').notNull().references(() => products.id), // Tham chiếu đến cột id trong bảng products
    tagId: integer('tag_id').notNull().references(() => tags.id), // Tham chiếu đến cột id trong bảng tags
    ...baseColumns // Bao gồm các cột cơ sở như createdAt, updatedAt, v.v.
});

export type ProductTag = typeof productTags.$inferSelect; // Loại suy luận cho select
export type NewProductTag = typeof productTags.$inferInsert; // Loại suy luận cho insert