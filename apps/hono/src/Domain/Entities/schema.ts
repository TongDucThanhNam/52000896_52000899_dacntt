import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';








// --- Transaction ---
export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId'), // FK to users.id
  orderStatus: text('orderStatus'),
  totalValue: real('totalValue'),
  paymentMethod: text('paymentMethod'),
  ...baseColumns,
});

// --- Tag ---
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tagName: text('tagName'),
  tagSlug: text('tagSlug'),
  ...baseColumns,
});

// --- Product ---
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productName: text('productName'),
  productSlug: text('productSlug'),
  productDescription: text('productDescription'),
  productBrand: text('productBrand'),
  imageUrls: text('imageUrls'), // Store as JSON string or comma-separated
  categoryId: integer('categoryId'), // FK to categories.id
  productAvgRating: real('productAvgRating'),
  productTotalViews: integer('productTotalViews'),
  ...baseColumns,
});

// --- Variant ---
export const variants = sqliteTable('variants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('productId'), // FK to products.id
  variantSku: text('variantSku'),
  variantName: text('variantName'),
  variantSlug: text('variantSlug'),
  variantKeyIndex: integer('variantKeyIndex'),
  variantImageUrl: text('variantImageUrl'),
  variantSize: text('variantSize'),
  variantColor: text('variantColor'),
  variantStyle: text('variantStyle'),
  variantMaterial: text('variantMaterial'),
  variantSeason: text('variantSeason'),
  variantPrice: real('variantPrice'),
  variantPromotionPrice: real('variantPromotionPrice'),
  variantStockQuantity: integer('variantStockQuantity'),
  ...baseColumns,
});

// --- CartItem ---
export const cartItems = sqliteTable('cartItems', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  cartId: integer('cartId'), // FK to carts.id (not defined in provided entities)
  productId: integer('productId'), // FK to products.id
  variantId: integer('variantId'), // FK to variants.id
  cartItemQuantity: integer('cartItemQuantity'),
  cartItemUpdatedAt: text('cartItemUpdatedAt'),
  ...baseColumns,
});

// --- Preference ---
export const preferences = sqliteTable('preferences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId'), // FK to users.id
  preferenceType: text('preferenceType'),
  preferenceValue: text('preferenceValue'),
  preferenceScore: real('preferenceScore'),
  ...baseColumns,
});

// --- TransactionItem ---
export const transactionItems = sqliteTable('transactionItems', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  transactionId: integer('transactionId'), // FK to transactions.id
  productId: integer('productId'), // FK to products.id
  variantId: integer('variantId'), // FK to variants.id
  quantity: integer('quantity'),
  purchasePrice: real('purchasePrice'),
  ...baseColumns,
});

// --- ProductTag ---
export const productTags = sqliteTable('productTags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('productId'), // FK to products.id
  tagId: integer('tagId'), // FK to tags.id
  ...baseColumns,
});

// --- Interaction ---
export const interactions = sqliteTable('interactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId'), // FK to users.id
  productId: integer('productId'), // FK to products.id
  variantId: text('variantId'), // originally string in Mongo
  interactionType: text('interactionType'),
  interactionContent: text('interactionContent'),
  interactionScore: real('interactionScore'),
  ...baseColumns,
});
