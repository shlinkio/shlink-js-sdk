import type {
  Abortable,
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
  ShlinkWithDomainVisitsParams,
} from './types';

export type ShlinkApiClient = {
  // Short URLs

  listShortUrls(params?: ShlinkShortUrlsListParams & Abortable): Promise<ShlinkShortUrlsList>;

  createShortUrl(data: ShlinkCreateShortUrlData & Abortable): Promise<ShlinkShortUrl>;

  getShortUrl(shortUrlId: ShlinkShortUrlIdentifier, options?: Abortable): Promise<ShlinkShortUrl>;

  deleteShortUrl(shortUrlId: ShlinkShortUrlIdentifier, options?: Abortable): Promise<void>;

  updateShortUrl(
    shortUrlId: ShlinkShortUrlIdentifier,
    data: ShlinkEditShortUrlData & Abortable,
  ): Promise<ShlinkShortUrl>;

  // Short URL redirect rules

  getShortUrlRedirectRules(
    shortUrlId: ShlinkShortUrlIdentifier,
    options?: Abortable,
  ): Promise<ShlinkRedirectRulesList>;

  setShortUrlRedirectRules(
    shortUrlId: ShlinkShortUrlIdentifier,
    data: ShlinkSetRedirectRulesData & Abortable,
  ): Promise<ShlinkRedirectRulesList>;

  // Visits

  getVisitsOverview(options?: Abortable): Promise<ShlinkVisitsOverview>;

  getShortUrlVisits(
    shortUrlId: ShlinkShortUrlIdentifier,
    params?: ShlinkVisitsParams & Abortable,
  ): Promise<ShlinkVisitsList>;

  getTagVisits(tag: string, params?: ShlinkWithDomainVisitsParams & Abortable): Promise<ShlinkVisitsList>;

  getDomainVisits(domain: string, params?: ShlinkVisitsParams & Abortable): Promise<ShlinkVisitsList>;

  getOrphanVisits(params?: ShlinkOrphanVisitsParams & Abortable): Promise<ShlinkVisitsList>;

  getNonOrphanVisits(params?: ShlinkWithDomainVisitsParams & Abortable): Promise<ShlinkVisitsList>;

  deleteShortUrlVisits(
    shortUrlId: ShlinkShortUrlIdentifier,
    options?: Abortable,
  ): Promise<ShlinkDeleteVisitsResult>;

  deleteOrphanVisits(options?: Abortable): Promise<ShlinkDeleteVisitsResult>;

  // Tags

  listTags(options?: Abortable): Promise<ShlinkTagsList>;

  tagsStats(options?: Abortable): Promise<ShlinkTagsStatsList>;

  deleteTags(tags: string[], options?: Abortable): Promise<{ tags: string[] }>;

  editTag(renaming: ShlinkRenaming, options?: Abortable): Promise<ShlinkRenaming>;

  // Domains

  listDomains(options?: Abortable): Promise<ShlinkDomainsList>;

  editDomainRedirects(domainRedirects: ShlinkEditDomainRedirects, options?: Abortable): Promise<ShlinkDomainRedirects>;

  // Misc

  health(options?: { domain?: string } & Abortable): Promise<ShlinkHealth>;

  mercureInfo(options?: Abortable): Promise<ShlinkMercureInfo>;
};
