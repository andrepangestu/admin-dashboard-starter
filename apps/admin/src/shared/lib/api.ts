import { createApiClient } from '@starter/api-client';

import { env } from '@/shared/config/env';

export const api = createApiClient({
  baseUrl: env.API_BASE_URL,
});
