import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Base columns cho tất cả các bảng trong database
 * Bao gồm các trường chung như isDeleted, createdAt, updatedAt, isActive
 */
export const baseColumns = {
    isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').default(new Date().toISOString()),
    updatedAt: text('updated_at').default(new Date().toISOString()),
    isActive: integer('is_active', { mode: 'boolean' }).default(true)
};

/**
 * Schema cơ bản cho các bảng
 * Có thể extend thêm các trường cụ thể cho từng bảng
 */
export const baseTable = sqliteTable('base', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ...baseColumns
});