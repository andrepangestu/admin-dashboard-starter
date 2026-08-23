import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string().trim().min(1).default('Admin Workspace'),
  VITE_API_BASE_URL: z.url().default('http://localhost:3000/api'),
  VITE_ENABLE_MOCKS: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
  const message = result.error.issues
    .map((issue) => `${issue.path.join('.') || 'environment'}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid application environment: ${message}`);
}

export const env = {
  APP_NAME: result.data.VITE_APP_NAME,
  API_BASE_URL: result.data.VITE_API_BASE_URL,
  ENABLE_MOCKS: result.data.VITE_ENABLE_MOCKS,
} as const;
