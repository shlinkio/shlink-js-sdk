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
  ShlinkRenaming,
  ShlinkSetRedirectRulesData,
  ShlinkShortUrl,
  ShlinkShortUrlIdentifier,
  ShlinkShortUrlsList,
  ShlinkShortUrlsListParams,
  ShlinkTagsList,
  ShlinkTagsStatsList,
  ShlinkVisitsList,
  ShlinkVisitsOverview,
  ShlinkVisitsParams,
} from './types';

// type Abortable = {
//   signal?: AbortSignal;
// };

export type ShlinkApiClient = {
  // Short URLs

  listShortUrls(params?: ShlinkShortUrlsListParams, signal?: AbortSignal): Promise<ShlinkShortUrlsList>;

  createShortUrl(options: ShlinkCreateShortUrlData, signal?: AbortSignal): Promise<ShlinkShortUrl>;

  getShortUrl(shortUrlId: ShlinkShortUrlIdentifier, signal?: AbortSignal): Promise<ShlinkShortUrl>;

  deleteShortUrl(shortUrlId: ShlinkShortUrlIdentifier, signal?: AbortSignal): Promise<void>;

  updateShortUrl(
    shortUrlId: ShlinkShortUrlIdentifier,
    data: ShlinkEditShortUrlData,
    signal?: AbortSignal,
  ): Promise<ShlinkShortUrl>;

  // Short URL redirect rules

  getShortUrlRedirectRules(
    shortUrlId: ShlinkShortUrlIdentifier,
    signal?: AbortSignal,
  ): Promise<ShlinkRedirectRulesList>;

  setShortUrlRedirectRules(
    shortUrlId: ShlinkShortUrlIdentifier,
    data: ShlinkSetRedirectRulesData,
    signal?: AbortSignal,
  ): Promise<ShlinkRedirectRulesList>;

  // Visits

  getVisitsOverview(signal?: AbortSignal): Promise<ShlinkVisitsOverview>;

  getShortUrlVisits(
    shortUrlId: ShlinkShortUrlIdentifier,
    params?: ShlinkVisitsParams,
    signal?: AbortSignal,
  ): Promise<ShlinkVisitsList>;

  getTagVisits(tag: string, params?: ShlinkVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  getDomainVisits(domain: string, params?: ShlinkVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  getOrphanVisits(params?: ShlinkOrphanVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  getNonOrphanVisits(params?: ShlinkVisitsParams, signal?: AbortSignal): Promise<ShlinkVisitsList>;

  deleteShortUrlVisits(
    shortUrlId: ShlinkShortUrlIdentifier,
    signal?: AbortSignal,
  ): Promise<ShlinkDeleteVisitsResult>;

  deleteOrphanVisits(signal?: AbortSignal): Promise<ShlinkDeleteVisitsResult>;

  // Tags

  listTags(signal?: AbortSignal): Promise<ShlinkTagsList>;

  tagsStats(signal?: AbortSignal): Promise<ShlinkTagsStatsList>;

  deleteTags(tags: string[], signal?: AbortSignal): Promise<{ tags: string[] }>;

  editTag(renaming: ShlinkRenaming, signal?: AbortSignal): Promise<ShlinkRenaming>;

  // Domains

  listDomains(signal?: AbortSignal): Promise<ShlinkDomainsList>;

  editDomainRedirects(domainRedirects: ShlinkEditDomainRedirects, signal?: AbortSignal): Promise<ShlinkDomainRedirects>;

  // Misc

  health(authority?: string, signal?: AbortSignal): Promise<ShlinkHealth>;

  mercureInfo(signal?: AbortSignal): Promise<ShlinkMercureInfo>;
};
