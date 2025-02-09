import { apiClient } from '../api-client';

describe('short-urls', () => {
  it('interacts with the short URLs', async () => {
    // Create a short URL
    const longUrl = 'https://example.com';
    const shortUrl = await apiClient.createShortUrl({ longUrl });
    expect(shortUrl.longUrl).toEqual(longUrl);

    // List short URLs
    const shortUrls = await apiClient.listShortUrls();
    expect(shortUrls.data).toHaveLength(1);
    expect(shortUrls.data[0]).toEqual(shortUrl);

    // Update short URL
    const tags = ['one', 'two'];
    const updatedShortUrl = await apiClient.updateShortUrl(shortUrl, { tags });
    expect(updatedShortUrl.tags).toEqual(tags);

    // Delete short URL
    await apiClient.deleteShortUrl(shortUrl);
    const shortUrlsAfterDeletion = await apiClient.listShortUrls();
    expect(shortUrlsAfterDeletion.data).toHaveLength(0);
  });
});
