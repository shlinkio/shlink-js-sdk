import { ShlinkApiClient } from '../../src';
import { NodeHttpClient } from '../../src/node';

const apiKey = process.env.SHLINK_API_KEY;
if (!apiKey) {
  throw new Error('API key not found in SHLINK_API_KEY env');
}

export const apiClient = new ShlinkApiClient(new NodeHttpClient(), {
  baseUrl: 'http://localhost:8765',
  apiKey,
});
