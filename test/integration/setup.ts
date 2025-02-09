import { afterEach } from 'vitest';
import { apiClient } from './api-client';

afterEach(async () => {
  vi.clearAllMocks();

  // Cleanup all created Shlink resources, to avoid affecting next test
  const [shortUrls, tags] = await Promise.all([
    apiClient.listShortUrls({ itemsPerPage: 100 }),
    apiClient.listTags(),
  ]);
  await Promise.all([
    ...shortUrls.data.map((shortUrl) => apiClient.deleteShortUrl(shortUrl)),
    tags.data.length > 0 ? apiClient.deleteTags(tags.data) : Promise.resolve(),
  ]);
});
