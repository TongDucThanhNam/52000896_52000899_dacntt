CREATE TABLE `cartItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cartId` integer,
	`productId` integer,
	`variantId` integer,
	`cartItemQuantity` integer,
	`cartItemUpdatedAt` text,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`categoryName` text,
	`categorySlug` text,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `interactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`productId` integer,
	`variantId` text,
	`interactionType` text,
	`interactionContent` text,
	`interactionScore` real,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`action` text,
	`method` text,
	`url` text,
	`statusCode` integer,
	`ipAddress` text,
	`deviceId` text,
	`timeStamp` text,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `preferences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`preferenceType` text,
	`preferenceValue` text,
	`preferenceScore` real,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `productTags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`productId` integer,
	`tagId` integer,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`productName` text,
	`productSlug` text,
	`productDescription` text,
	`productBrand` text,
	`imageUrls` text,
	`categoryId` integer,
	`productAvgRating` real,
	`productTotalViews` integer,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`productId` integer,
	`rating` real,
	`reviewContent` text,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tagName` text,
	`tagSlug` text,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `transactionItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`transactionId` integer,
	`productId` integer,
	`variantId` integer,
	`quantity` integer,
	`purchasePrice` real,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	`orderStatus` text,
	`totalValue` real,
	`paymentMethod` text,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `users` (
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
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
--> statement-breakpoint
CREATE TABLE `variants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`productId` integer,
	`variantSku` text,
	`variantName` text,
	`variantSlug` text,
	`variantKeyIndex` integer,
	`variantImageUrl` text,
	`variantSize` text,
	`variantColor` text,
	`variantStyle` text,
	`variantMaterial` text,
	`variantSeason` text,
	`variantPrice` real,
	`variantPromotionPrice` real,
	`variantStockQuantity` integer,
	`isDeleted` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP,
	`isActive` integer DEFAULT true
);
