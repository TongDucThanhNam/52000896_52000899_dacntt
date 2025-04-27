import { integer, sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

export const variants = sqliteTable('variants', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    productId: integer('product_id').notNull(),
    variantSku: text('variant_sku'),
    variantName: text('variant_name'),
    variantSlug: text('variant_slug'),
    variantKeyIndex: integer('variant_key_index'),
    variantImageUrl: text('variant_image_url'),
    variantSize: text('variant_size'),
    variantColor: text('variant_color'),
    variantStyle: text('variant_style'),
    variantMaterial: text('variant_material'),
    variantSeason: text('variant_season'),
    variantPrice: numeric('variant_price'),
    variantPromotionPrice: numeric('variant_promotion_price'),
    variantStockQuantity: integer('variant_stock_quantity'),
    ...baseColumns
});

export type Variant = typeof variants.$inferSelect;