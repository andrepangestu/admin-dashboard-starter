import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi/backend.openapi.yaml',
  output: './src/generated',
});
