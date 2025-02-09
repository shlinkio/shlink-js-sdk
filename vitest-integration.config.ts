import { defineConfig } from 'vitest/config';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    allowOnly: true,
    setupFiles: './test/integration/setup.ts',
    include: ['test/integration/**/*.test.ts'],

    // Since every test shares the same Shlink instance, we need to run them synchronously, so that every test can
    // clean-up their side effects before running the next test.
    // This effectively disables default parallelization and ensure only one test at a time is run.
    minWorkers: 1,
    maxWorkers: 1,
  },
});
