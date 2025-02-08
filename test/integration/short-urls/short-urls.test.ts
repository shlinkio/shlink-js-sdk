import { ShlinkApiClient } from '../../../src';
import { NodeHttpClient } from '../../../src/node';

describe('short-urls', () => {
  it('interacts with the short URLs', async () => {
    const apiKey = process.env.SHLINK_API_KEY;
    if (!apiKey) {
      throw new Error('API key not found in SHLINK_API_KEY env');
    }

    const client = new ShlinkApiClient(new NodeHttpClient(), {
      baseUrl: 'http://localhost:8765',
      apiKey,
    });

    // Create a short URL
    const longUrl = 'https://example.com';
    const shortUrl = await client.createShortUrl({ longUrl });
    expect(shortUrl.longUrl).toEqual(longUrl);

    // List short URLs
    const shortUrls = await client.listShortUrls();
    expect(shortUrls.data).toHaveLength(1);
    expect(shortUrls.data[0]).toEqual(shortUrl);

    // Update short URL
    const tags = ['foo', 'bar'];
    const updatedShortUrl = await client.updateShortUrl(shortUrl, { tags });
    expect(updatedShortUrl.tags).toEqual(tags);

    // Delete short URL
    await client.deleteShortUrl(shortUrl);
    const shortUrlsAfterDeletion = await client.listShortUrls();
    expect(shortUrlsAfterDeletion.data).toHaveLength(0);
  });
});
