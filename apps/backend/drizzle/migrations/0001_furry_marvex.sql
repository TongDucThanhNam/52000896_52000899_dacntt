PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` text,
	`refresh_token_expires_at` text,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_account`("id", "account_id", "provider_id", "user_id", "access_token", "refresh_token", "id_token", "access_token_expires_at", "refresh_token_expires_at", "scope", "password", "created_at", "updated_at") SELECT "id", "account_id", "provider_id", "user_id", "access_token", "refresh_token", "id_token", "access_token_expires_at", "refresh_token_expires_at", "scope", "password", "created_at", "updated_at" FROM `account`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "expires_at", "token", "created_at", "updated_at", "ip_address", "user_agent", "user_id") SELECT "id", "expires_at", "token", "created_at", "updated_at", "ip_address", "user_agent", "user_id" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "name", "email", "email_verified", "image", "created_at", "updated_at") SELECT "id", "name", "email", "email_verified", "image", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `__new_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_verification`("id", "identifier", "value", "expires_at", "created_at", "updated_at") SELECT "id", "identifier", "value", "expires_at", "created_at", "updated_at" FROM `verification`;--> statement-breakpoint
DROP TABLE `verification`;--> statement-breakpoint
ALTER TABLE `__new_verification` RENAME TO `verification`;--> statement-breakpoint
CREATE TABLE `__new_base` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_base`("id", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "is_deleted", "created_at", "updated_at", "is_active" FROM `base`;--> statement-breakpoint
DROP TABLE `base`;--> statement-breakpoint
ALTER TABLE `__new_base` RENAME TO `base`;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`categoryName` text,
	`categorySlug` text,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "categoryName", "categorySlug", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "categoryName", "categorySlug", "is_deleted", "created_at", "updated_at", "is_active" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
CREATE TABLE `__new_interactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`variant_id` text,
	`interaction_type` text,
	`interaction_content` text,
	`interaction_score` integer,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_interactions`("id", "user_id", "product_id", "variant_id", "interaction_type", "interaction_content", "interaction_score", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "user_id", "product_id", "variant_id", "interaction_type", "interaction_content", "interaction_score", "is_deleted", "created_at", "updated_at", "is_active" FROM `interactions`;--> statement-breakpoint
DROP TABLE `interactions`;--> statement-breakpoint
ALTER TABLE `__new_interactions` RENAME TO `interactions`;--> statement-breakpoint
CREATE TABLE `__new_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`action` text,
	`method` text,
	`url` text,
	`status_code` integer,
	`ip_address` text,
	`device_id` text,
	`timestamp` integer,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_logs`("id", "user_id", "action", "method", "url", "status_code", "ip_address", "device_id", "timestamp", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "user_id", "action", "method", "url", "status_code", "ip_address", "device_id", "timestamp", "is_deleted", "created_at", "updated_at", "is_active" FROM `logs`;--> statement-breakpoint
DROP TABLE `logs`;--> statement-breakpoint
ALTER TABLE `__new_logs` RENAME TO `logs`;--> statement-breakpoint
CREATE TABLE `__new_preferences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`preference_type` text NOT NULL,
	`preference_value` text NOT NULL,
	`preference_score` numeric NOT NULL,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_preferences`("id", "user_id", "preference_type", "preference_value", "preference_score", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "user_id", "preference_type", "preference_value", "preference_score", "is_deleted", "created_at", "updated_at", "is_active" FROM `preferences`;--> statement-breakpoint
DROP TABLE `preferences`;--> statement-breakpoint
ALTER TABLE `__new_preferences` RENAME TO `preferences`;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_name` text,
	`product_slug` text,
	`product_description` text,
	`product_brand` text,
	`image_urls` text,
	`category_id` integer NOT NULL,
	`product_avg_rating` integer,
	`product_total_views` integer,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "product_name", "product_slug", "product_description", "product_brand", "image_urls", "category_id", "product_avg_rating", "product_total_views", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "product_name", "product_slug", "product_description", "product_brand", "image_urls", "category_id", "product_avg_rating", "product_total_views", "is_deleted", "created_at", "updated_at", "is_active" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
CREATE TABLE `__new_product_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_product_tags`("id", "product_id", "tag_id", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "product_id", "tag_id", "is_deleted", "created_at", "updated_at", "is_active" FROM `product_tags`;--> statement-breakpoint
DROP TABLE `product_tags`;--> statement-breakpoint
ALTER TABLE `__new_product_tags` RENAME TO `product_tags`;--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`productId` integer,
	`rating` real,
	`reviewContent` text,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "userId", "productId", "rating", "reviewContent", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "userId", "productId", "rating", "reviewContent", "is_deleted", "created_at", "updated_at", "is_active" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tag_name` text,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_tags`("id", "tag_name", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "tag_name", "is_deleted", "created_at", "updated_at", "is_active" FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`transaction_status` text,
	`transaction_total` numeric,
	`transaction_updated_at` text DEFAULT '2025-04-27T15:10:05.210Z',
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "user_id", "transaction_status", "transaction_total", "transaction_updated_at", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "user_id", "transaction_status", "transaction_total", "transaction_updated_at", "is_deleted", "created_at", "updated_at", "is_active" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
CREATE TABLE `__new_transaction_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`transaction_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`variant_id` integer NOT NULL,
	`quantity` integer,
	`purchase_price` numeric,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_transaction_items`("id", "transaction_id", "product_id", "variant_id", "quantity", "purchase_price", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "transaction_id", "product_id", "variant_id", "quantity", "purchase_price", "is_deleted", "created_at", "updated_at", "is_active" FROM `transaction_items`;--> statement-breakpoint
DROP TABLE `transaction_items`;--> statement-breakpoint
ALTER TABLE `__new_transaction_items` RENAME TO `transaction_items`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text,
	`userPasswordHash` text,
	`userEmail` text,
	`userPhone` text,
	`userHeight` real,
	`userWeight` real,
	`userDateOfBirth` text,
	`userAddress` text,
	`userImageUrl` text,
	`userGender` text,
	`userJob` text,
	`userCity` text,
	`userRole` text,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "userName", "userPasswordHash", "userEmail", "userPhone", "userHeight", "userWeight", "userDateOfBirth", "userAddress", "userImageUrl", "userGender", "userJob", "userCity", "userRole", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "userName", "userPasswordHash", "userEmail", "userPhone", "userHeight", "userWeight", "userDateOfBirth", "userAddress", "userImageUrl", "userGender", "userJob", "userCity", "userRole", "is_deleted", "created_at", "updated_at", "is_active" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE TABLE `__new_variants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`variant_sku` text,
	`variant_name` text,
	`variant_slug` text,
	`variant_key_index` integer,
	`variant_image_url` text,
	`variant_size` text,
	`variant_color` text,
	`variant_style` text,
	`variant_material` text,
	`variant_season` text,
	`variant_price` numeric,
	`variant_promotion_price` numeric,
	`variant_stock_quantity` integer,
	`is_deleted` integer DEFAULT false,
	`created_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`updated_at` text DEFAULT '2025-04-27T15:10:05.208Z',
	`is_active` integer DEFAULT true
);
--> statement-breakpoint
INSERT INTO `__new_variants`("id", "product_id", "variant_sku", "variant_name", "variant_slug", "variant_key_index", "variant_image_url", "variant_size", "variant_color", "variant_style", "variant_material", "variant_season", "variant_price", "variant_promotion_price", "variant_stock_quantity", "is_deleted", "created_at", "updated_at", "is_active") SELECT "id", "product_id", "variant_sku", "variant_name", "variant_slug", "variant_key_index", "variant_image_url", "variant_size", "variant_color", "variant_style", "variant_material", "variant_season", "variant_price", "variant_promotion_price", "variant_stock_quantity", "is_deleted", "created_at", "updated_at", "is_active" FROM `variants`;--> statement-breakpoint
DROP TABLE `variants`;--> statement-breakpoint
ALTER TABLE `__new_variants` RENAME TO `variants`;