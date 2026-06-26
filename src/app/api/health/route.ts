import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    database: Boolean(process.env.DATABASE_URL),
    pinataJwt: Boolean(process.env.PINATA_JWT),
    pinataGateway: Boolean(process.env.PINATA_GATEWAY),
  };

  const healthy = Object.values(checks).every(Boolean);

  return NextResponse.json(
    { status: healthy ? 'ok' : 'degraded', checks },
    { status: healthy ? 200 : 503 }
  );
}
