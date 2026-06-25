import { eq, and, isNull, lt } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { getDb } from '@/lib/db';
import { sharedFiles, type SharedFile } from '@/lib/db/schema';
import { SHARE_TOKEN_LENGTH } from '@/lib/constants';

export interface CreateFileRecordInput {
  pinataId: string;
  pinataCid: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  expiresAt: number;
}

export async function createFileRecord(input: CreateFileRecordInput): Promise<SharedFile> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  const record = {
    id: nanoid(),
    shareToken: nanoid(SHARE_TOKEN_LENGTH),
    pinataId: input.pinataId,
    pinataCid: input.pinataCid,
    fileName: input.fileName,
    mimeType: input.mimeType,
    sizeBytes: input.sizeBytes,
    expiresAt: input.expiresAt,
    createdAt: now,
    deletedAt: null,
  };

  await db.insert(sharedFiles).values(record);
  return record;
}

export async function findByShareToken(token: string): Promise<SharedFile | null> {
  const db = getDb();
  const rows = await db
    .select()
    .from(sharedFiles)
    .where(and(eq(sharedFiles.shareToken, token), isNull(sharedFiles.deletedAt)))
    .limit(1);

  return rows[0] ?? null;
}

export async function markDeleted(id: string): Promise<void> {
  const db = getDb();
  const now = Math.floor(Date.now() / 1000);
  await db
    .update(sharedFiles)
    .set({ deletedAt: now })
    .where(eq(sharedFiles.id, id));
}

export async function findExpiredActive(nowUnix = Math.floor(Date.now() / 1000)): Promise<SharedFile[]> {
  const db = getDb();
  return db
    .select()
    .from(sharedFiles)
    .where(and(lt(sharedFiles.expiresAt, nowUnix), isNull(sharedFiles.deletedAt)));
}
