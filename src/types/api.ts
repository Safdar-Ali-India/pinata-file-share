export interface UploadSuccessResponse {
  shareToken: string;
  shareUrl: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  expiresAt: number;
  cid: string;
}

export interface ShareFileResponse {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  expiresAt: number;
  cid: string;
  downloadUrl: string;
  expired: boolean;
  remaining: string;
}

export interface ApiErrorResponse {
  error: string;
  code: string;
}
