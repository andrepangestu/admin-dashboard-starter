import { describe, expect, it, vi } from 'vitest';

import type { ApiError } from './api-error';
import { createApiClient } from './create-api-client';

describe('createApiClient', () => {
  it('joins the base URL and sends cookies with JSON requests', async () => {
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ id: 'usr_1' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );
    const client = createApiClient({
      baseUrl: 'https://api.example.com/v1/',
      fetchImplementation,
    });

    await client.request<{ id: string }>('/users');

    expect(fetchImplementation).toHaveBeenCalledWith(
      'https://api.example.com/v1/users',
      expect.objectContaining({ credentials: 'include' }),
    );
  });

  it('normalizes unsuccessful JSON responses as ApiError', async () => {
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Access denied' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      }),
    );
    const client = createApiClient({ baseUrl: 'https://api.example.com', fetchImplementation });

    await expect(client.request('/users')).rejects.toEqual(
      expect.objectContaining<Partial<ApiError>>({
        name: 'ApiError',
        status: 403,
        message: 'Access denied',
      }),
    );
  });
});
