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

export function toErrorResponse(error: unknown): { status: number; body: { error: string; code: string } } {
  if (isAppError(error)) {
    return {
      status: error.statusCode,
      body: { error: error.message, code: error.code },
    };
  }

  console.error('Unhandled error:', error);
  return {
    status: 500,
    body: { error: 'Internal server error', code: 'INTERNAL_ERROR' },
  };
}
