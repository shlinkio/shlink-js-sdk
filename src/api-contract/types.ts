export type Nullable<T> = {
  [P in keyof T]: T[P] | null
};

export type Abortable = {
  signal?: AbortSignal;
};

/**
 * @deprecated Shlink 4.0.0 no longer uses this.
 */
export type ShlinkDeviceLongUrls = {
  android?: string | null;
  ios?: string | null;
  desktop?: string | null;
};

export type ShlinkShortUrlMeta = {
  validSince?: string;
  validUntil?: string;
  maxVisits?: number;
};

export type ShlinkShortUrlIdentifier = {
  shortCode: string;
  domain?: string | null;
};

export type ShlinkShortUrl = Required<ShlinkShortUrlIdentifier> & {
  shortUrl: string;
  longUrl: string;
  dateCreated: string;
  /** Available since Shlink 3.4.0 */
  visitsSummary?: ShlinkVisitsSummary;
  meta: Required<Nullable<ShlinkShortUrlMeta>>;
  tags: string[];
  title?: string | null;
  crawlable?: boolean;
  forwardQuery?: boolean;
  /**
   * Whether this short URL has any dynamic redirection rule attached to it.
   * Available since Shlink 4.3.0
   */
  hasRedirectRules?: boolean;

  /** @deprecated Use `visitsSummary.total` instead. Removed in Shlink 4.0.0 */
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
  visitsSummary: ShlinkVisitsSummary;

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
  /** Available since Shlink 4.1.0 */
  visitedUrl?: string;
  /**
   * The raw URL to which the visitor was redirected when this visit was tracked.
   * It will be `null` if a redirect didn't happen for this visit.
   * Available since Shlink 4.3.0
   */
  redirectUrl?: string | null;
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
  nonOrphanVisits: ShlinkVisitsSummary;
  orphanVisits: ShlinkVisitsSummary;

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
  /**
   * List short URLs only for this domain authority. Use DEFAULT keyword for the default domain.
   * Available since Shlink 4.3.0
   */
  domain?: string | 'DEFAULT';
  tags?: string[];
  tagsMode?: TagsFilteringMode;
  orderBy?: ShlinkShortUrlsOrder;
  startDate?: string;
  endDate?: string;
  excludeMaxVisitsReached?: boolean;
  excludePastValidUntil?: boolean;
};

export type ShlinkRedirectConditionType =
  | 'device'
  | 'language'
  | 'query-param'
  | 'any-value-query-param'
  | 'valueless-query-param'
  | 'ip-address'
  | 'geolocation-country-code'
  | 'geolocation-city-name';

export type ShlinkDeviceType =
  | 'android'
  | 'ios'
  | 'mobile'
  | 'windows'
  | 'macos'
  | 'linux'
  | 'chromeos'
  | 'desktop';

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

export type ShlinkRenaming = {
  oldName: string;
  newName: string;
};
