type OptionalString = string | null | undefined;

type Nullable<T> = {
  [P in keyof T]: T[P] | null
};

export interface ShlinkDeviceLongUrls {
  android?: OptionalString;
  ios?: OptionalString;
  desktop?: OptionalString;
}

export interface ShlinkShortUrlMeta {
  validSince?: string;
  validUntil?: string;
  maxVisits?: number;
}

export interface ShlinkShortUrl {
  shortCode: string;
  shortUrl: string;
  longUrl: string;
  /** Optional only before Shlink 3.5.0 */
  deviceLongUrls?: Required<ShlinkDeviceLongUrls>,
  dateCreated: string;
  /** @deprecated Use `visitsSummary.total` instead */
  visitsCount: number;
  /** Optional only before Shlink 3.4.0 */
  visitsSummary?: ShlinkVisitsSummary;
  meta: Required<Nullable<ShlinkShortUrlMeta>>;
  tags: string[];
  domain: string | null;
  title?: string | null;
  crawlable?: boolean;
  forwardQuery?: boolean;
}

export interface ShlinkEditShortUrlData {
  longUrl?: string;
  title?: string | null;
  tags?: string[];
  deviceLongUrls?: ShlinkDeviceLongUrls;
  crawlable?: boolean;
  forwardQuery?: boolean;
  validSince?: string | null;
  validUntil?: string | null;
  maxVisits?: number | null;

  /** @deprecated To be removed in Shlink 4.0.0 */
  validateUrl?: boolean;
}

export interface ShlinkCreateShortUrlData extends Omit<ShlinkEditShortUrlData, 'deviceLongUrls'> {
  longUrl: string;
  customSlug?: string;
  shortCodeLength?: number;
  domain?: string;
  findIfExists?: boolean;
  deviceLongUrls?: {
    android?: string;
    ios?: string;
    desktop?: string;
  }
}

export interface ShlinkShortUrlsResponse {
  data: ShlinkShortUrl[];
  pagination: ShlinkPaginator;
}

export interface ShlinkMercureInfo {
  token: string;
  mercureHubUrl: string;
}

export interface ShlinkHealth {
  status: 'pass' | 'fail';
  version: string;
}

export interface ShlinkTagsStats {
  tag: string;
  shortUrlsCount: number;
  /** Optional only before Shlink 3.5.0 */
  visitsSummary?: ShlinkVisitsSummary;

  /** @deprecated Use `visitsSummary.total` instead */
  visitsCount: number;
}

export interface ShlinkTags {
  tags: string[];
  stats: ShlinkTagsStats[];
}

export interface ShlinkTagsResponse {
  data: string[];
  /** @deprecated Present only when withStats=true is provided, which is deprecated */
  stats?: ShlinkTagsStats[];
}

export interface ShlinkTagsStatsResponse {
  data: ShlinkTagsStats[];
}

export interface ShlinkPaginator {
  currentPage: number;
  pagesCount: number;
  totalItems: number;
}

export interface ShlinkVisitsSummary {
  total: number;
  nonBots: number;
  bots: number;
}

export type ShlinkOrphanVisitType = 'base_url' | 'invalid_short_url' | 'regular_404';

export interface ShlinkVisitLocation {
  countryCode: string | null;
  countryName: string | null;
  regionName: string | null;
  cityName: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  isEmpty: boolean;
}

export interface ShlinkRegularVisit {
  referer: string;
  date: string;
  userAgent: string;
  visitLocation: ShlinkVisitLocation | null;
  potentialBot: boolean;
}

export interface ShlinkOrphanVisit extends ShlinkRegularVisit {
  visitedUrl: string;
  type: ShlinkOrphanVisitType;
}

export type ShlinkVisit = ShlinkRegularVisit | ShlinkOrphanVisit;

export interface ShlinkVisits {
  data: ShlinkVisit[];
  pagination: ShlinkPaginator;
}

export interface ShlinkVisitsOverview {
  /** Optional only before Shlink 3.5.0 */
  nonOrphanVisits?: ShlinkVisitsSummary;
  /** Optional only before Shlink 3.5.0 */
  orphanVisits?: ShlinkVisitsSummary;

  /** @deprecated Use `nonOrphanVisits.total` instead */
  visitsCount: number;
  /** @deprecated Use `orphanVisits.total` instead */
  orphanVisitsCount: number;
}

export interface ShlinkVisitsParams {
  domain?: string | null;
  page?: number;
  itemsPerPage?: number;
  startDate?: string;
  endDate?: string;
  excludeBots?: boolean;
}

export interface ShlinkDomainRedirects {
  baseUrlRedirect: string | null;
  regular404Redirect: string | null;
  invalidShortUrlRedirect: string | null;
}

export interface ShlinkEditDomainRedirects extends Partial<ShlinkDomainRedirects> {
  domain: string;
}

export interface ShlinkDomain {
  domain: string;
  isDefault: boolean;
  redirects: ShlinkDomainRedirects;
}

export interface ShlinkDomainsResponse {
  data: ShlinkDomain[];
  defaultRedirects: ShlinkDomainRedirects;
}

export type TagsFilteringMode = 'all' | 'any';

export type ShlinkShortUrlsOrder = {
  field?: 'dateCreated' | 'shortCode' | 'longUrl' | 'title' | 'visits' | 'nonBotVisits';
  dir?: 'ASC' | 'DESC';
};

export interface ShlinkShortUrlsListParams {
  page?: string;
  itemsPerPage?: number;
  searchTerm?: string;
  tags?: string[];
  tagsMode?: TagsFilteringMode;
  orderBy?: ShlinkShortUrlsOrder;
  startDate?: string;
  endDate?: string;
  excludeMaxVisitsReached?: boolean;
  excludePastValidUntil?: boolean;
}

export interface ShlinkShortUrlsListNormalizedParams extends
  Omit<ShlinkShortUrlsListParams, 'orderBy' | 'excludeMaxVisitsReached' | 'excludePastValidUntil'> {
  orderBy?: string;
  excludeMaxVisitsReached?: 'true';
  excludePastValidUntil?: 'true';
}
