PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`transaction_status` text,
	`transaction_total` numeric,
	`transaction_updated_at` text DEFAULT '2025-05-05T07:45:50.425Z',
	`is_deleted` integer DEFAULT false,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "user_id", "transaction_status", "transaction_total", "transaction_updated_at", "is_deleted", "created_at", "updated_at") SELECT "id", "user_id", "transaction_status", "transaction_total", "transaction_updated_at", "is_deleted", "created_at", "updated_at" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `userId` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `userId` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `token` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `identifier` ON `verification` (`identifier`);--> statement-breakpoint
CREATE INDEX `email` ON `user` (`email`);