type OptionalString = string | null | undefined;

type Nullable<T> = {
  [P in keyof T]: T[P] | null
};

/**
 * @deprecated Shlink 4.0.0 no longer uses this.
 */
export type ShlinkDeviceLongUrls = {
  android?: OptionalString;
  ios?: OptionalString;
  desktop?: OptionalString;
};

export type ShlinkShortUrlMeta = {
  validSince?: string;
  validUntil?: string;
  maxVisits?: number;
};

export type ShlinkShortUrl = {
  shortCode: string;
  shortUrl: string;
  longUrl: string;
  dateCreated: string;
  /** Optional only before Shlink 3.4.0 */
  visitsSummary?: ShlinkVisitsSummary;
  meta: Required<Nullable<ShlinkShortUrlMeta>>;
  tags: string[];
  domain: string | null;
  title?: string | null;
  crawlable?: boolean;
  forwardQuery?: boolean;

  /** @deprecated Use `visitsSummary.total` instead */
  visitsCount?: number;
  /** @deprecated Removed in Shlink 4.0.0 */
  deviceLongUrls?: Required<ShlinkDeviceLongUrls>,
};

export type ShlinkEditShortUrlData = {
  longUrl?: string;
  title?: string | null;
  tags?: string[];
  crawlable?: boolean;
  forwardQuery?: boolean;
  validSince?: string | null;
  validUntil?: string | null;
  maxVisits?: number | null;

  /** @deprecated Ignored by Shlink 4.0.0 */
  validateUrl?: boolean;
  /** @deprecated Ignored by Shlink 4.0.0. Use redirect rules instead */
  deviceLongUrls?: ShlinkDeviceLongUrls;
};

export type ShlinkCreateShortUrlData = Omit<ShlinkEditShortUrlData, 'deviceLongUrls' | 'longUrl'> & {
  longUrl: string;
  customSlug?: string;
  shortCodeLength?: number;
  domain?: string;
  findIfExists?: boolean;

  /** @deprecated Ignored by Shlink 4.0.0. Use redirect rules instead */
  deviceLongUrls?: {
    android?: string;
    ios?: string;
    desktop?: string;
  }
};

export type ShlinkShortUrlsList = {
  data: ShlinkShortUrl[];
  pagination: ShlinkPaginator;
};

export type ShlinkMercureInfo = {
  token: string;
  mercureHubUrl: string;
};

export type ShlinkHealth = {
  status: 'pass' | 'fail';
  version: string;
};

export type ShlinkTagsStats = {
  tag: string;
  shortUrlsCount: number;
  /** Optional only before Shlink 3.5.0 */
  visitsSummary?: ShlinkVisitsSummary;

  /** @deprecated Not returned by Shlink 4.0.0. Use `visitsSummary.total` instead */
  visitsCount?: number;
};

export type ShlinkTagsList = {
  data: string[];

  /** @deprecated Never returned by Shlink 4.0.0 */
  stats?: ShlinkTagsStats[];
};

export type ShlinkTagsStatsList = {
  data: ShlinkTagsStats[];
};

export type ShlinkPaginator = {
  currentPage: number;
  pagesCount: number;
  totalItems: number;
};

export type ShlinkVisitsSummary = {
  total: number;
  nonBots: number;
  bots: number;
};

export type ShlinkOrphanVisitType = 'base_url' | 'invalid_short_url' | 'regular_404';

export type ShlinkVisitLocation = {
  countryCode: string | null;
  countryName: string | null;
  regionName: string | null;
  cityName: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  isEmpty: boolean;
};

export type ShlinkRegularVisit = {
  referer: string;
  date: string;
  userAgent: string;
  visitLocation: ShlinkVisitLocation | null;
  potentialBot: boolean;
};

export type ShlinkOrphanVisit = ShlinkRegularVisit & {
  visitedUrl: string;
  type: ShlinkOrphanVisitType;
};

export type ShlinkVisit = ShlinkRegularVisit | ShlinkOrphanVisit;

export type ShlinkVisitsList = {
  data: ShlinkVisit[];
  pagination: ShlinkPaginator;
};

export type ShlinkDeleteVisitsResult = {
  deletedVisits: number;
};

export type ShlinkVisitsOverview = {
  /** Optional only before Shlink 3.5.0 */
  nonOrphanVisits?: ShlinkVisitsSummary;
  /** Optional only before Shlink 3.5.0 */
  orphanVisits?: ShlinkVisitsSummary;

  /** @deprecated Use `nonOrphanVisits.total` instead */
  visitsCount?: number;
  /** @deprecated Use `orphanVisits.total` instead */
  orphanVisitsCount?: number;
};

export type ShlinkVisitsParams = {
  page?: number;
  itemsPerPage?: number;
  startDate?: string;
  endDate?: string;
  excludeBots?: boolean;
};

export type ShlinkShortUrlVisitsParams = ShlinkVisitsParams & {
  domain?: string | null;
};

export type ShlinkOrphanVisitsParams = ShlinkVisitsParams & {
  /** Ignored by Shlink older than v4.0.0 */
  type?: ShlinkOrphanVisitType;
};

export type ShlinkDomainRedirects = {
  baseUrlRedirect: string | null;
  regular404Redirect: string | null;
  invalidShortUrlRedirect: string | null;
};

export type ShlinkEditDomainRedirects = Partial<ShlinkDomainRedirects> & {
  domain: string;
};

export type ShlinkDomain = {
  domain: string;
  isDefault: boolean;
  redirects: ShlinkDomainRedirects;
};

export type ShlinkDomainsList = {
  data: ShlinkDomain[];
  defaultRedirects: ShlinkDomainRedirects;
};

export type TagsFilteringMode = 'all' | 'any';

export type ShlinkShortUrlsOrder = {
  field?: 'dateCreated' | 'shortCode' | 'longUrl' | 'title' | 'visits' | 'nonBotVisits';
  dir?: 'ASC' | 'DESC';
};

export type ShlinkShortUrlsListParams = {
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
};

export type ShlinkRedirectConditionType = 'device' | 'language' | 'query-param';

export type ShlinkRedirectCondition = {
  type: ShlinkRedirectConditionType;
  matchKey: string | null;
  matchValue: string;
};

export type ShlinkRedirectRuleData = {
  longUrl: string;
  conditions: ShlinkRedirectCondition[];
};

export type ShlinkRedirectRule = ShlinkRedirectRuleData & {
  priority: number;
};

export type ShlinkRedirectRulesList = {
  defaultLongUrl: string;
  redirectRules: ShlinkRedirectRule[];
};

export type ShlinkSetRedirectRulesData = {
  redirectRules: ShlinkRedirectRuleData[];
};
