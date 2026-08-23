export interface ApiErrorOptions {
  status: number;
  message: string;
  details?: unknown;
  requestId?: string | undefined;
}

export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;
  readonly requestId: string | undefined;

  constructor({ status, message, details, requestId }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
    this.requestId = requestId;
  }
}
