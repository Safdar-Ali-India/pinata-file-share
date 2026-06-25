import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const sharedFiles = sqliteTable(
  'shared_files',
  {
    id: text('id').primaryKey(),
    shareToken: text('share_token').notNull().unique(),
    pinataId: text('pinata_id').notNull(),
    pinataCid: text('pinata_cid').notNull(),
    fileName: text('file_name').notNull(),
    mimeType: text('mime_type').notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    expiresAt: integer('expires_at').notNull(),
    createdAt: integer('created_at').notNull(),
    deletedAt: integer('deleted_at'),
  },
  (table) => ({
    shareTokenIdx: index('share_token_idx').on(table.shareToken),
    expiresAtIdx: index('expires_at_idx').on(table.expiresAt),
  })
);

export type SharedFile = typeof sharedFiles.$inferSelect;
export type NewSharedFile = typeof sharedFiles.$inferInsert;
