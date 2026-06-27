import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { getEnv } from '@/lib/env';
import { getDb } from '@/lib/db';
import { verifyPinataAuth } from '@/lib/pinata/service';

export const dynamic = 'force-dynamic';

async function checkDatabase(): Promise<boolean> {
  if (!getEnv('DATABASE_URL')) return false;

  try {
    await getDb().run(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

export async function GET() {
  const [database, pinataAuth] = await Promise.all([checkDatabase(), verifyPinataAuth()]);

  const checks = {
    database,
    pinataJwt: Boolean(getEnv('PINATA_JWT')),
    pinataAuth,
    pinataGateway: Boolean(getEnv('PINATA_GATEWAY')),
  };

  const healthy = checks.database && checks.pinataAuth && checks.pinataGateway;

  return NextResponse.json(
    { status: healthy ? 'ok' : 'degraded', checks },
    { status: healthy ? 200 : 503 }
  );
}
