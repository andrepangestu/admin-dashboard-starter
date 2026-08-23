import { ApiError } from './api-error';

export interface ApiClientOptions {
  baseUrl: string;
  fetchImplementation?: typeof fetch;
  defaultHeaders?: HeadersInit;
}

export interface ApiClient {
  request<T>(path: string, init?: RequestInit): Promise<T>;
}

interface ErrorPayload {
  message?: string;
  requestId?: string;
  [key: string]: unknown;
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) return response.json();

  const text = await response.text();
  return text.length > 0 ? text : undefined;
}

function isErrorPayload(value: unknown): value is ErrorPayload {
  return typeof value === 'object' && value !== null;
}

export function createApiClient({
  baseUrl,
  fetchImplementation = fetch,
  defaultHeaders,
}: ApiClientOptions): ApiClient {
  return {
    async request<T>(path: string, init: RequestInit = {}): Promise<T> {
      const headers = new Headers(defaultHeaders);
      headers.set('Accept', 'application/json');

      if (init.body !== undefined && !(init.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
      }

      new Headers(init.headers).forEach((value, key) => headers.set(key, value));

      const response = await fetchImplementation(joinUrl(baseUrl, path), {
        ...init,
        credentials: init.credentials ?? 'include',
        headers,
      });
      const body = await parseResponseBody(response);

      if (!response.ok) {
        const payload = isErrorPayload(body) ? body : undefined;
        throw new ApiError({
          status: response.status,
          message: payload?.message ?? `Request failed with status ${response.status}`,
          details: body,
          requestId: payload?.requestId,
        });
      }

      return body as T;
    },
  };
}
