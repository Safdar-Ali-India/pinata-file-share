import { NextResponse } from 'next/server';
import { findByShareToken } from '@/lib/db/repository';
import { isExpired } from '@/lib/expiration';
import { buildGatewayUrl } from '@/lib/security/sanitize';
import { AppError, toErrorResponse } from '@/lib/errors';

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

    if (isExpired(record.expiresAt)) {
      throw new AppError('This file has expired', 410, 'EXPIRED');
    }

    const gateway = process.env.PINATA_GATEWAY;
    if (!gateway) {
      throw new AppError('Gateway is not configured', 500, 'CONFIG_ERROR');
    }

    const url = buildGatewayUrl(gateway, record.pinataCid);
    return NextResponse.redirect(url, 302);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
