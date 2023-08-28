import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import pack from './package.json';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [dts({ rollupTypes: true })],

  // TODO
  // build: {
  //   lib: {
  //     entry: {
  //       index: resolve(__dirname, 'src/index.ts'),
  //       'api-contract': resolve(__dirname, 'src/api-contract/index.ts'),
  //     },
  //     name: 'shlink-web-component',
  //   },
  //   rollupOptions: {
  //     external: [...Object.keys(pack.peerDependencies ?? {}), 'react/jsx-runtime'],
  //     output: {
  //       assetFileNames: 'index.[ext]',
  //     },
  //   },
  // },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: [
        'src/**/*.ts',
        '!src/index.ts',
      ],
      reporter: ['text', 'text-summary', 'clover', 'html'],

      // Required code coverage. Lower than this will make the check fail
      statements: 95,
      branches: 90,
      functions: 85,
      lines: 95,
    },
  },
});
