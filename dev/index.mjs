import { ShlinkApiClient } from '../dist/index.js';
import { NodeHttpClient } from '../dist/node.js';

(async function () {
  const [,, baseUrl, apiKey] = process.argv;
  if (!baseUrl || !apiKey) {
    console.error('Base URL or API key not provided.');
    return;
  }

  try {
    const apiClient = new ShlinkApiClient(new NodeHttpClient(), {
      baseUrl,
      apiKey,
    });
    console.log('Success:', await apiClient.deleteShortUrlVisits('nieRB'));
  } catch (e) {
    console.error('Error:', e);
  }
}());
