import { ShlinkApiClient } from '../dist/index.js';
import { NodeHttpClient } from '../dist/node.js';

(async function () {
  try {
    const apiClient = new ShlinkApiClient(new NodeHttpClient(), {
      baseUrl: process.argv[2],
      apiKey: process.argv[3],
    });
    console.log('Success:', await apiClient.listShortUrls());
  } catch (e) {
    console.error('Error:', e);
  }
}());
