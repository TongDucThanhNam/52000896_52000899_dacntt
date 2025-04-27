import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';
import {baseColumns} from './BaseEntities';

// --- Category ---
export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({autoIncrement: true}),
    categoryName: text('categoryName'),
    categorySlug: text('categorySlug'),
    ...baseColumns,
});