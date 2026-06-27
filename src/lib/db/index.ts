import { createClient, type Client } from '@libsql/client';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '@/lib/db/schema';

let client: Client | null = null;
let db: LibSQLDatabase<typeof schema> | null = null;

function getDatabaseConfig(): { url: string; authToken?: string } {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not configured');
  }

  const authToken = process.env.DATABASE_AUTH_TOKEN;
  return authToken ? { url, authToken } : { url };
}

export function getDb(): LibSQLDatabase<typeof schema> {
  if (!db) {
    client = createClient(getDatabaseConfig());
    db = drizzle(client, { schema });
  }
  return db;
}

export function closeDb(): void {
  if (client) {
    client.close();
    client = null;
    db = null;
  }
}
