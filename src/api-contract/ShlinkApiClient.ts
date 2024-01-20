import type {
  ShlinkCreateShortUrlData,
  ShlinkDeleteVisitsResponse,
  ShlinkDomainRedirects,
  ShlinkDomainsResponse,
  ShlinkEditDomainRedirects,
  ShlinkEditShortUrlData,
  ShlinkHealth,
  ShlinkMercureInfo,
  ShlinkShortUrl,
  ShlinkShortUrlsListParams,
  ShlinkShortUrlsResponse,
  ShlinkShortUrlVisitsParams,
  ShlinkTags,
  ShlinkVisits,
  ShlinkVisitsOverview,
  ShlinkVisitsParams,
} from './types';

export type ShlinkApiClient = {
  listShortUrls(params?: ShlinkShortUrlsListParams): Promise<ShlinkShortUrlsResponse>;

  createShortUrl(options: ShlinkCreateShortUrlData): Promise<ShlinkShortUrl>;

  getShortUrlVisits(shortCode: string, query?: ShlinkShortUrlVisitsParams): Promise<ShlinkVisits>;

  deleteShortUrlVisits(shortCode: string, domain?: string | null): Promise<ShlinkDeleteVisitsResponse>;

  getTagVisits(tag: string, query?: ShlinkVisitsParams): Promise<ShlinkVisits>;

  getDomainVisits(domain: string, query?: ShlinkVisitsParams): Promise<ShlinkVisits>;

  getOrphanVisits(query?: ShlinkVisitsParams): Promise<ShlinkVisits>;

  deleteOrphanVisits(): Promise<ShlinkDeleteVisitsResponse>;

  getNonOrphanVisits(query?: ShlinkVisitsParams): Promise<ShlinkVisits>;

  getVisitsOverview(): Promise<ShlinkVisitsOverview>;

  getShortUrl(shortCode: string, domain?: string | null): Promise<ShlinkShortUrl>;

  deleteShortUrl(shortCode: string, domain?: string | null): Promise<void>;

  updateShortUrl(
    shortCode: string,
    domain: string | null | undefined,
    body: ShlinkEditShortUrlData,
  ): Promise<ShlinkShortUrl>;

  listTags(): Promise<ShlinkTags>;

  tagsStats(): Promise<ShlinkTags>;

  deleteTags(tags: string[]): Promise<{ tags: string[] }>;

  editTag(oldName: string, newName: string): Promise<{ oldName: string; newName: string }>;

  health(authority?: string): Promise<ShlinkHealth>;

  mercureInfo(): Promise<ShlinkMercureInfo>;

  listDomains(): Promise<ShlinkDomainsResponse>;

  editDomainRedirects(domainRedirects: ShlinkEditDomainRedirects): Promise<ShlinkDomainRedirects>;
};
