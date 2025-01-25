import type {
  ShlinkCreateShortUrlData,
  ShlinkDeleteVisitsResult,
  ShlinkDomainRedirects,
  ShlinkDomainsList,
  ShlinkEditDomainRedirects,
  ShlinkEditShortUrlData,
  ShlinkHealth,
  ShlinkMercureInfo,
  ShlinkOrphanVisitsParams,
  ShlinkRedirectRulesList,
  ShlinkSetRedirectRulesData,
  ShlinkShortUrl,
  ShlinkShortUrlsList,
  ShlinkShortUrlsListParams,
  ShlinkShortUrlVisitsParams,
  ShlinkTagsList,
  ShlinkTagsStatsList,
  ShlinkVisitsList,
  ShlinkVisitsOverview,
  ShlinkVisitsParams,
} from './types';

export type ShlinkApiClient = {
  // Short URLs

  listShortUrls(params?: ShlinkShortUrlsListParams, signal?: AbortSignal): Promise<ShlinkShortUrlsList>;

  createShortUrl(options: ShlinkCreateShortUrlData, signal?: AbortSignal): Promise<ShlinkShortUrl>;

  getShortUrl(shortCode: string, domain?: string | null, signal?: AbortSignal): Promise<ShlinkShortUrl>;

  deleteShortUrl(shortCode: string, domain?: string | null, signal?: AbortSignal): Promise<void>;

  updateShortUrl(
    shortCode: string,
    domain: string | null | undefined,
    data: ShlinkEditShortUrlData,
    signal?: AbortSignal,
  ): Promise<ShlinkShortUrl>;

  // Short URL redirect rules

  getShortUrlRedirectRules(
    shortCode: string,
    domain?: string | null,
    signal?: AbortSignal,
  ): Promise<ShlinkRedirectRulesList>;

  setShortUrlRedirectRules(
    shortCode: string,
    domain: string | null | undefined,
    data: ShlinkSetRedirectRulesData,
    signal?: AbortSignal,
  ): Promise<ShlinkRedirectRulesList>;

  // Visits

  getVisitsOverview(signal?: AbortSignal): Promise<ShlinkVisitsOverview>;

  getShortUrlVisits(
    shortCode: string,
    params?: ShlinkShortUrlVisitsParams,
    signal?: AbortSignal,
  ): Promise<ShlinkVisitsList>;

  getTagVisits(tag: string, params?: ShlinkVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  getDomainVisits(domain: string, params?: ShlinkVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  getOrphanVisits(params?: ShlinkOrphanVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  getNonOrphanVisits(params?: ShlinkVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  deleteShortUrlVisits(
    shortCode: string,
    domain?: string | null,
    signal?: AbortSignal,
  ): Promise<ShlinkDeleteVisitsResult>;

  deleteOrphanVisits(signal?: AbortSignal): Promise<ShlinkDeleteVisitsResult>;

  // Tags

  listTags(signal?: AbortSignal): Promise<ShlinkTagsList>;

  tagsStats(signal?: AbortSignal): Promise<ShlinkTagsStatsList>;

  deleteTags(tags: string[], signal?: AbortSignal): Promise<{ tags: string[] }>;

  editTag(oldName: string, newName: string, signal?: AbortSignal): Promise<{ oldName: string; newName: string }>;

  // Domains

  listDomains(signal?: AbortSignal): Promise<ShlinkDomainsList>;

  editDomainRedirects(domainRedirects: ShlinkEditDomainRedirects, signal?: AbortSignal): Promise<ShlinkDomainRedirects>;

  // Misc

  health(authority?: string, signal?: AbortSignal): Promise<ShlinkHealth>;

  mercureInfo(signal?: AbortSignal): Promise<ShlinkMercureInfo>;
};
