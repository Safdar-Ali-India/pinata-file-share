CREATE TABLE `shared_files` (
	`id` text PRIMARY KEY NOT NULL,
	`share_token` text NOT NULL,
	`pinata_id` text NOT NULL,
	`pinata_cid` text NOT NULL,
	`file_name` text NOT NULL,
	`mime_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `shared_files_share_token_unique` ON `shared_files` (`share_token`);--> statement-breakpoint
CREATE INDEX `share_token_idx` ON `shared_files` (`share_token`);--> statement-breakpoint
CREATE INDEX `expires_at_idx` ON `shared_files` (`expires_at`);
