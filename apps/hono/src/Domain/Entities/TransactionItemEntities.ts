import { integer, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';
import type { ITransactionItem } from '../Interface/ITransactionItem';
import { baseColumns } from './BaseEntities';

export const transactionItems = sqliteTable('transaction_items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    transactionId: integer('transaction_id').notNull(),
    productId: integer('product_id').notNull(),
    variantId: integer('variant_id').notNull(),
    quantity: integer('quantity'),
    purchasePrice: numeric('purchase_price'),
    ...baseColumns
});

export type TransactionItem = typeof transactionItems.$inferSelect;

export const TransactionItemWithBase = mongoose.model(
    'TransactionItemWithBase',
    TransactionItemWithBaseSchema,
    'transactionItems',
);