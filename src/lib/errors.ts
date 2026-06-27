export class AppError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly code: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

const PUBLIC_ERROR_MESSAGES = {
  CONFIG_ERROR: 'Upload service is temporarily unavailable. Please try again later.',
  PINATA_UPLOAD_FAILED: 'Failed to upload file. Please try again later.',
  INTERNAL_ERROR: 'Something went wrong. Please try again later.',
} as const;

function getPublicErrorMessage(error: AppError): string {
  if (error.code in PUBLIC_ERROR_MESSAGES) {
    return PUBLIC_ERROR_MESSAGES[error.code as keyof typeof PUBLIC_ERROR_MESSAGES];
  }

  if (error.statusCode >= 500) {
    return PUBLIC_ERROR_MESSAGES.INTERNAL_ERROR;
  }

  return error.message;
}

export function toErrorResponse(error: unknown): { status: number; body: { error: string; code: string } } {
  if (isAppError(error)) {
    return {
      status: error.statusCode,
      body: { error: getPublicErrorMessage(error), code: error.code },
    };
  }

  console.error('Unhandled error:', error);
  return {
    status: 500,
    body: { error: PUBLIC_ERROR_MESSAGES.INTERNAL_ERROR, code: 'INTERNAL_ERROR' },
  };
}
