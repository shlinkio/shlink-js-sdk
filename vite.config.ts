import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [dts({ rollupTypes: true })],

  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'api-contract': resolve(__dirname, 'src/api-contract/index.ts'),
        browser: resolve(__dirname, 'src/browser/index.ts'),
        node: resolve(__dirname, 'src/node/index.ts'),
      },
      formats: ['es'], // Generate ES module only
    },
    rollupOptions: {
      // Keep references to these node dependencies, but don't try to bundle them
      external: ['node:http', 'node:https'],
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    allowOnly: true,
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: [
        'src/**/*.ts',
        '!src/index.ts',
        '!src/api-contract/*',
      ],
      reporter: ['text', 'text-summary', 'clover', 'html'],

      // Required code coverage. Lower than this will make the check fail
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
  },
});
