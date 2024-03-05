import { fromPartial } from '@total-typescript/shoehorn';
import type { HttpClient } from '../../src';
import { ShlinkApiClient } from '../../src';
import type {
  ShlinkDomain,
  ShlinkShortUrl,
  ShlinkShortUrlsOrder,
  ShlinkVisitsList,
  ShlinkVisitsOverview,
} from '../../src/api-contract';

describe('ShlinkApiClient', () => {
  const jsonRequest = vi.fn().mockResolvedValue({});
  const emptyRequest = vi.fn().mockResolvedValue(undefined);
  const httpClient: HttpClient = { jsonRequest, emptyRequest };
  const shortCodesWithDomainCombinations: [string, string | null | undefined][] = [
    ['abc123', null],
    ['abc123', undefined],
    ['abc123', 'example.com'],
  ];
  let apiClient: ShlinkApiClient;

  beforeEach(() => {
    apiClient = new ShlinkApiClient(httpClient, { baseUrl: 'https://s.test', apiKey: '' });
  });

  describe('listShortUrls', () => {
    const expectedList = ['foo', 'bar'];

    it('properly returns short URLs list', async () => {
      jsonRequest.mockResolvedValue({ shortUrls: expectedList });

      const actualList = await apiClient.listShortUrls();

      expect(expectedList).toEqual(actualList);
    });

    it.each([
      [{ field: 'visits', dir: 'DESC' } as ShlinkShortUrlsOrder, '?orderBy=visits-DESC'],
      [{ field: 'longUrl', dir: 'ASC' } as ShlinkShortUrlsOrder, '?orderBy=longUrl-ASC'],
      [{ field: 'longUrl', dir: undefined } as ShlinkShortUrlsOrder, ''],
    ])('parses orderBy in params', async (orderBy, expectedOrderBy) => {
      jsonRequest.mockResolvedValue({ data: expectedList });

      await apiClient.listShortUrls({ orderBy });

      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/short-urls${expectedOrderBy}`),
        expect.anything(),
      );
    });

    it.each([
      [{}, ''],
      [{ excludeMaxVisitsReached: false }, ''],
      [{ excludeMaxVisitsReached: true }, '?excludeMaxVisitsReached=true'],
      [{ excludePastValidUntil: false }, ''],
      [{ excludePastValidUntil: true }, '?excludePastValidUntil=true'],
      [
        { excludePastValidUntil: true, excludeMaxVisitsReached: true },
        '?excludeMaxVisitsReached=true&excludePastValidUntil=true',
      ],
    ])('parses disabled URLs params', async (params, expectedQuery) => {
      jsonRequest.mockResolvedValue({ data: expectedList });

      await apiClient.listShortUrls(params);

      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/short-urls${expectedQuery}`),
        expect.anything(),
      );
    });
  });

  describe('createShortUrl', () => {
    const shortUrl = {
      bar: 'foo',
    };

    it('returns create short URL', async () => {
      jsonRequest.mockResolvedValue(shortUrl);
      const result = await apiClient.createShortUrl({ longUrl: '' });

      expect(result).toEqual(shortUrl);
    });

    it('removes all empty options', async () => {
      jsonRequest.mockResolvedValue({ data: shortUrl });

      await apiClient.createShortUrl({ longUrl: 'bar', customSlug: undefined, maxVisits: null });

      expect(jsonRequest).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        body: JSON.stringify({ longUrl: 'bar' }),
      }));
    });
  });

  describe('getShortUrlVisits', () => {
    it('properly returns short URL visits', async () => {
      const expectedVisits = ['foo', 'bar'];
      jsonRequest.mockResolvedValue({
        visits: {
          data: expectedVisits,
        },
      });

      const actualVisits = await apiClient.getShortUrlVisits('abc123', {});

      expect({ data: expectedVisits }).toEqual(actualVisits);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining('/short-urls/abc123/visits'),
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('deleteShortUrlVisits', () => {
    it.each([
      ['the_domain', '?domain=the_domain'],
      [null, ''],
      [undefined, ''],
    ])('deletes visits with params', async (domain, expectedQuery) => {
      const response = { deletedVisits: 10 };
      jsonRequest.mockResolvedValue(response);

      const actualVisits = await apiClient.deleteShortUrlVisits('abc123', domain);

      expect(actualVisits).toEqual(response);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/short-urls/abc123/visits${expectedQuery}`),
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('getTagVisits', () => {
    it('properly returns tag visits', async () => {
      const expectedVisits = ['foo', 'bar'];
      jsonRequest.mockResolvedValue({
        visits: {
          data: expectedVisits,
        },
      });

      const actualVisits = await apiClient.getTagVisits('foo', {});

      expect({ data: expectedVisits }).toEqual(actualVisits);
      expect(jsonRequest).toHaveBeenCalledWith(expect.stringContaining('/tags/foo/visits'), expect.objectContaining({
        method: 'GET',
      }));
    });
  });

  describe('getDomainVisits', () => {
    it('properly returns domain visits', async () => {
      const expectedVisits = ['foo', 'bar'];
      jsonRequest.mockResolvedValue({
        visits: {
          data: expectedVisits,
        },
      });

      const actualVisits = await apiClient.getDomainVisits('foo.com', {});

      expect({ data: expectedVisits }).toEqual(actualVisits);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining('/domains/foo.com/visits'),
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('getShortUrl', () => {
    it.each(shortCodesWithDomainCombinations)('properly returns short URL', async (shortCode, domain) => {
      const expectedShortUrl = { foo: 'bar' };
      jsonRequest.mockResolvedValue(expectedShortUrl);
      const expectedQuery = domain ? `?domain=${domain}` : '';

      const result = await apiClient.getShortUrl(shortCode, domain);

      expect(expectedShortUrl).toEqual(result);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/short-urls/${shortCode}${expectedQuery}`),
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('updateShortUrl', () => {
    it.each(shortCodesWithDomainCombinations)('properly updates short URL meta', async (shortCode, domain) => {
      const meta = {
        maxVisits: 50,
        validSince: '2025-01-01T10:00:00+01:00',
      };
      const expectedResp = fromPartial<ShlinkShortUrl>({});
      jsonRequest.mockResolvedValue(expectedResp);
      const expectedQuery = domain ? `?domain=${domain}` : '';

      const result = await apiClient.updateShortUrl(shortCode, domain, meta);

      expect(expectedResp).toEqual(result);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/short-urls/${shortCode}${expectedQuery}`),
        expect.objectContaining({ method: 'PATCH' }),
      );
    });
  });

  describe('listTags', () => {
    it('properly returns list of tags', async () => {
      const expectedTags = ['foo', 'bar'];
      jsonRequest.mockResolvedValue({
        tags: {
          data: expectedTags,
        },
      });

      const result = await apiClient.listTags();

      expect(result).toEqual({ tags: expectedTags, stats: [] });
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining('/tags'),
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('tagsStats', () => {
    it('can use /tags/stats endpoint', async () => {
      const expectedTags = ['foo', 'bar'];
      const expectedStats = expectedTags.map((tag) => ({ tag, shortUrlsCount: 10, visitsCount: 10 }));

      jsonRequest.mockResolvedValue({
        tags: {
          data: expectedStats,
        },
      });

      const result = await apiClient.tagsStats();

      expect({ tags: expectedTags, stats: expectedStats }).toEqual(result);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining('/tags/stats'),
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('deleteTags', () => {
    it('properly deletes provided tags', async () => {
      const tags = ['foo', 'bar'];

      await apiClient.deleteTags(tags);

      expect(emptyRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/tags?${tags.map((tag) => `tags%5B%5D=${tag}`).join('&')}`),
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('editTag', () => {
    it('properly edits provided tag', async () => {
      const oldName = 'foo';
      const newName = 'bar';

      await apiClient.editTag(oldName, newName);

      expect(emptyRequest).toHaveBeenCalledWith(expect.stringContaining('/tags'), expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ oldName, newName }),
      }));
    });
  });

  describe('deleteShortUrl', () => {
    it.each(shortCodesWithDomainCombinations)('properly deletes provided short URL', async (shortCode, domain) => {
      const expectedQuery = domain ? `?domain=${domain}` : '';

      await apiClient.deleteShortUrl(shortCode, domain);

      expect(emptyRequest).toHaveBeenCalledWith(
        expect.stringContaining(`/short-urls/${shortCode}${expectedQuery}`),
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('health', () => {
    const expectedData = {
      status: 'pass',
      version: '1.19.0',
    };

    beforeEach(() => {
      jsonRequest.mockResolvedValue(expectedData);
    });

    it('returns health data', async () => {
      const result = await apiClient.health();

      expect(jsonRequest).toHaveBeenCalledWith(expect.stringMatching(/^https:\/\/s.test/), expect.anything());
      expect(result).toEqual(expectedData);
    });

    it('allows domain to be overwritten', async () => {
      await apiClient.health('another-domain.test');
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/another-domain.test/),
        expect.anything(),
      );
    });
  });

  describe('mercureInfo', () => {
    it('returns mercure info', async () => {
      const expectedData = {
        token: 'abc.123.def',
        mercureHubUrl: 'http://example.com/.well-known/mercure',
      };
      jsonRequest.mockResolvedValue(expectedData);

      const result = await apiClient.mercureInfo();

      expect(jsonRequest).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });
  });

  describe('listDomains', () => {
    it('returns domains', async () => {
      const expectedData = { data: [fromPartial<ShlinkDomain>({}), fromPartial<ShlinkDomain>({})] };
      jsonRequest.mockResolvedValue({ domains: expectedData });

      const result = await apiClient.listDomains();

      expect(jsonRequest).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });
  });

  describe('getVisitsOverview', () => {
    it('returns visits overview', async () => {
      const expectedData = fromPartial<ShlinkVisitsOverview>({});
      jsonRequest.mockResolvedValue({ visits: expectedData });

      const result = await apiClient.getVisitsOverview();

      expect(jsonRequest).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });
  });

  describe('getOrphanVisits', () => {
    it('returns orphan visits', async () => {
      jsonRequest.mockResolvedValue({ visits: fromPartial<ShlinkVisitsList>({ data: [] }) });

      const result = await apiClient.getOrphanVisits();

      expect(jsonRequest).toHaveBeenCalled();
      expect(result).toEqual({ data: [] });
    });
  });

  describe('deleteOrphanVisits', () => {
    it('deletes visits with params', async () => {
      const response = { deletedVisits: 10 };
      jsonRequest.mockResolvedValue(response);

      const actualVisits = await apiClient.deleteOrphanVisits();

      expect(actualVisits).toEqual(response);
      expect(jsonRequest).toHaveBeenCalledWith(
        expect.stringContaining('/visits/orphan'),
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('getNonOrphanVisits', () => {
    it('returns non-orphan visits', async () => {
      jsonRequest.mockResolvedValue({ visits: fromPartial<ShlinkVisitsList>({ data: [] }) });

      const result = await apiClient.getNonOrphanVisits();

      expect(jsonRequest).toHaveBeenCalled();
      expect(result).toEqual({ data: [] });
    });
  });

  describe('editDomainRedirects', () => {
    it('returns the redirects', async () => {
      const resp = { baseUrlRedirect: null, regular404Redirect: 'foo', invalidShortUrlRedirect: 'bar' };
      jsonRequest.mockResolvedValue(resp);

      const result = await apiClient.editDomainRedirects({ domain: 'foo' });

      expect(jsonRequest).toHaveBeenCalled();
      expect(result).toEqual(resp);
    });
  });
});
