import { defineConfig } from 'vitest/config';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    allowOnly: true,
    setupFiles: './test/setup.ts',
    include: ['test/integration/**/*.test.ts'],
  },
});
