import { NextResponse } from 'next/server';
import { findByShareToken } from '@/lib/db/repository';
import { isExpired, formatRemainingTime } from '@/lib/expiration';
import { buildGatewayUrl } from '@/lib/security/sanitize';
import { AppError, toErrorResponse } from '@/lib/errors';
import type { ShareFileResponse } from '@/types/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ token: string }>;
}

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{10,32}$/;

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    if (!TOKEN_PATTERN.test(token)) {
      throw new AppError('Invalid share link', 400, 'INVALID_TOKEN');
    }

    const record = await findByShareToken(token);
    if (!record) {
      throw new AppError('File not found', 404, 'NOT_FOUND');
    }

    const expired = isExpired(record.expiresAt);
    const gateway = process.env.PINATA_GATEWAY;
    if (!gateway) {
      throw new AppError('Gateway is not configured', 500, 'CONFIG_ERROR');
    }

    const body: ShareFileResponse = {
      fileName: record.fileName,
      mimeType: record.mimeType,
      sizeBytes: record.sizeBytes,
      expiresAt: record.expiresAt,
      cid: record.pinataCid,
      downloadUrl: expired ? '' : buildGatewayUrl(gateway, record.pinataCid),
      expired,
      remaining: formatRemainingTime(record.expiresAt),
    };

    return NextResponse.json(body, {
      status: expired ? 410 : 200,
    });
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
