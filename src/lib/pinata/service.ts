import { PinataSDK } from 'pinata';
import { AppError } from '@/lib/errors';

const PINATA_UPLOAD_URL = 'https://uploads.pinata.cloud/v3/files';

let pinataClient: PinataSDK | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new AppError(`${name} is not configured`, 500, 'CONFIG_ERROR');
  }
  return value;
}

export function getPinataClient(): PinataSDK {
  if (!pinataClient) {
    pinataClient = new PinataSDK({
      pinataJwt: requireEnv('PINATA_JWT'),
      pinataGateway: requireEnv('PINATA_GATEWAY'),
    });
  }
  return pinataClient;
}

export interface PinataUploadResult {
  id: string;
  cid: string;
  name: string;
  size: number;
  mimeType: string;
}

interface PinataUploadApiResponse {
  data?: {
    id: string;
    cid: string;
    name: string;
    size: number;
    mime_type: string;
  };
  error?: string;
}

function toPinataExpiresAt(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString();
}

export async function uploadFileToPinata(
  file: File,
  fileName: string,
  expiresAtUnix: number
): Promise<PinataUploadResult> {
  const jwt = requireEnv('PINATA_JWT');

  const formData = new FormData();
  formData.append('file', file, fileName);
  formData.append('network', 'public');
  formData.append('name', fileName);
  formData.append('expires_at', toPinataExpiresAt(expiresAtUnix));

  try {
    const response = await fetch(PINATA_UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    });

    const payload = (await response.json()) as PinataUploadApiResponse;

    if (!response.ok || !payload.data) {
      console.error('Pinata upload failed:', payload);
      throw new AppError('Failed to upload file to storage', 502, 'PINATA_UPLOAD_FAILED');
    }

    return {
      id: payload.data.id,
      cid: payload.data.cid,
      name: payload.data.name,
      size: payload.data.size,
      mimeType: payload.data.mime_type,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Pinata upload error:', error);
    throw new AppError('Failed to upload file to storage', 502, 'PINATA_UPLOAD_FAILED');
  }
}

export async function deletePinataFile(pinataId: string): Promise<void> {
  const pinata = getPinataClient();
  try {
    await pinata.files.delete([pinataId]);
  } catch (error) {
    console.error(`Pinata delete failed for ${pinataId}:`, error);
  }
}
