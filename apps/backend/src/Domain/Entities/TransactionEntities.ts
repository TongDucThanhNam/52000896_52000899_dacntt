import {integer, numeric, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

export const transactions = sqliteTable('transactions', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id'),
    transactionStatus: text('transaction_status'),
    transactionTotal: numeric('transaction_total'),
    transactionUpdatedAt: text('transaction_updated_at').default(new Date().toISOString()),
    ...baseColumns,
})

export type Transaction = typeof transactions.$inferSelect;