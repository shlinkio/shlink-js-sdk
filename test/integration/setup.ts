import { afterEach } from 'vitest';
import { apiClient } from './api-client';

function padArray<T>(arr: T[], length: number, fillValue: T) {
  if (arr.length >= length) {
    return arr;
  }

  const padLength = length - arr.length;
  const padArray = new Array(padLength).fill(fillValue);

  return [...arr, ...padArray];
}

afterEach(async () => {
  vi.clearAllMocks();

  // Cleanup all created Shlink resources, to avoid affecting next test
  const [shortUrls, tags] = await Promise.all([
    apiClient.listShortUrls({ itemsPerPage: 100 }),
    apiClient.listTags(),
  ]);

  const version = process.env.SHLINK_VERSION ?? '';
  const normalizedVersion = padArray(version.split('.'), 3, '0').join('.');

  await Promise.all([
    ...shortUrls.data.map((shortUrl) => apiClient.deleteShortUrl(shortUrl)),
    tags.data.length > 0 ? apiClient.deleteTags(tags.data) : Promise.resolve(),
    normalizedVersion >= '3.6.0' ? apiClient.deleteOrphanVisits() : Promise.resolve(),
  ]);
});
