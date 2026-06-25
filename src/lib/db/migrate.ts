import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@libsql/client';

async function migrate() {
  const url = process.env.DATABASE_URL ?? 'file:./data/app.db';

  if (url.startsWith('file:')) {
    const filePath = url.replace('file:', '');
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const client = createClient({ url });

  await client.execute(`
    CREATE TABLE IF NOT EXISTS shared_files (
      id TEXT PRIMARY KEY NOT NULL,
      share_token TEXT NOT NULL UNIQUE,
      pinata_id TEXT NOT NULL,
      pinata_cid TEXT NOT NULL,
      file_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      deleted_at INTEGER
    )
  `);

  await client.execute(`
    CREATE INDEX IF NOT EXISTS share_token_idx ON shared_files (share_token)
  `);

  await client.execute(`
    CREATE INDEX IF NOT EXISTS expires_at_idx ON shared_files (expires_at)
  `);

  client.close();
  console.log('Database migration complete');
}

migrate().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
