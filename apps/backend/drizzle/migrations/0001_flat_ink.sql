PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`transaction_status` text,
	`transaction_total` numeric,
	`transaction_updated_at` text DEFAULT '2025-04-28T03:19:07.437Z',
	`is_deleted` integer DEFAULT false,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "user_id", "transaction_status", "transaction_total", "transaction_updated_at", "is_deleted", "created_at", "updated_at") SELECT "id", "user_id", "transaction_status", "transaction_total", "transaction_updated_at", "is_deleted", "created_at", "updated_at" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;