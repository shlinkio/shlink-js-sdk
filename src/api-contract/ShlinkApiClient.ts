import type {
  ShlinkCreateShortUrlData,
  ShlinkDeleteVisitsResult,
  ShlinkDomainRedirects,
  ShlinkDomainsList,
  ShlinkEditDomainRedirects,
  ShlinkEditShortUrlData,
  ShlinkHealth,
  ShlinkMercureInfo,
  ShlinkShortUrl,
  ShlinkShortUrlsList,
  ShlinkShortUrlsListParams,
  ShlinkShortUrlVisitsParams,
  ShlinkTags,
  ShlinkVisitsList,
  ShlinkVisitsOverview,
  ShlinkVisitsParams,
} from './types';

export type ShlinkApiClient = {
  // Short URLs

  listShortUrls(params?: ShlinkShortUrlsListParams): Promise<ShlinkShortUrlsList>;

  createShortUrl(options: ShlinkCreateShortUrlData): Promise<ShlinkShortUrl>;

  getShortUrl(shortCode: string, domain?: string | null): Promise<ShlinkShortUrl>;

  deleteShortUrl(shortCode: string, domain?: string | null): Promise<void>;

  updateShortUrl(
    shortCode: string,
    domain: string | null | undefined,
    data: ShlinkEditShortUrlData,
  ): Promise<ShlinkShortUrl>;

  // Visits

  getVisitsOverview(): Promise<ShlinkVisitsOverview>;

  getShortUrlVisits(shortCode: string, params?: ShlinkShortUrlVisitsParams): Promise<ShlinkVisitsList>;

  getTagVisits(tag: string, params?: ShlinkVisitsParams): Promise<ShlinkVisitsList>;

  getDomainVisits(domain: string, params?: ShlinkVisitsParams): Promise<ShlinkVisitsList>;

  getOrphanVisits(params?: ShlinkVisitsParams): Promise<ShlinkVisitsList>;

  getNonOrphanVisits(params?: ShlinkVisitsParams): Promise<ShlinkVisitsList>;

  deleteShortUrlVisits(shortCode: string, domain?: string | null): Promise<ShlinkDeleteVisitsResult>;

  deleteOrphanVisits(): Promise<ShlinkDeleteVisitsResult>;

  // Tags

  listTags(): Promise<ShlinkTags>;

  tagsStats(): Promise<ShlinkTags>;

  deleteTags(tags: string[]): Promise<{ tags: string[] }>;

  editTag(oldName: string, newName: string): Promise<{ oldName: string; newName: string }>;

  // Domains

  listDomains(): Promise<ShlinkDomainsList>;

  editDomainRedirects(domainRedirects: ShlinkEditDomainRedirects): Promise<ShlinkDomainRedirects>;

  // Misc

  health(authority?: string): Promise<ShlinkHealth>;

  mercureInfo(): Promise<ShlinkMercureInfo>;
};
