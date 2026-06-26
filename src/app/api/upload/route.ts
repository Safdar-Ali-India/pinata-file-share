import { NextResponse } from 'next/server';
import { createFileRecord } from '@/lib/db/repository';
import { computeExpiresAt } from '@/lib/expiration';
import { uploadFileToPinata } from '@/lib/pinata/service';
import { sanitizeFileName } from '@/lib/security/sanitize';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit';
import { parseExpirationHours, validateUploadFile } from '@/lib/validation/upload';
import { toErrorResponse } from '@/lib/errors';
import type { UploadSuccessResponse } from '@/types/api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getAppUrl(request: Request): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    checkRateLimit(`upload:${ip}`);

    const formData = await request.formData();
    const file = validateUploadFile(formData.get('file') as File | null);
    const expirationHours = parseExpirationHours(formData.get('expirationHours'));
    const expiresAt = computeExpiresAt(expirationHours);
    const safeName = sanitizeFileName(file.name);

    const pinataResult = await uploadFileToPinata(file, safeName, expiresAt);

    const record = await createFileRecord({
      pinataId: pinataResult.id,
      pinataCid: pinataResult.cid,
      fileName: safeName,
      mimeType: pinataResult.mimeType || file.type,
      sizeBytes: pinataResult.size,
      expiresAt,
    });

    const appUrl = getAppUrl(request);
    const body: UploadSuccessResponse = {
      shareToken: record.shareToken,
      shareUrl: `${appUrl}/share/${record.shareToken}`,
      fileName: record.fileName,
      mimeType: record.mimeType,
      sizeBytes: record.sizeBytes,
      expiresAt: record.expiresAt,
      cid: record.pinataCid,
    };

    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
