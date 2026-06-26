import { NextResponse } from 'next/server';
import { findExpiredActive, markDeleted } from '@/lib/db/repository';
import { deletePinataFile } from '@/lib/pinata/service';
import { AppError, toErrorResponse } from '@/lib/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function authorizeCron(request: Request): void {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    throw new AppError('Cron is not configured', 500, 'CONFIG_ERROR');
  }

  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${secret}`) {
    throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
  }
}

export async function GET(request: Request) {
  return runCleanup(request);
}

export async function POST(request: Request) {
  return runCleanup(request);
}

async function runCleanup(request: Request) {
  try {
    authorizeCron(request);

    const expired = await findExpiredActive();
    let cleaned = 0;

    for (const file of expired) {
      await deletePinataFile(file.pinataId);
      await markDeleted(file.id);
      cleaned += 1;
    }

    return NextResponse.json({ cleaned, timestamp: Math.floor(Date.now() / 1000) });
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
