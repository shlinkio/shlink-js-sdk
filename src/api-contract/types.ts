export type Nullable<T> = {
  [P in keyof T]: T[P] | null
};

export type Abortable = {
  signal?: AbortSignal;
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
  visitsSummary: ShlinkVisitsSummary;
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
};

export type ShlinkCreateShortUrlData = Omit<ShlinkEditShortUrlData, 'deviceLongUrls' | 'longUrl'> & {
  longUrl: string;
  customSlug?: string;
  shortCodeLength?: number;
  domain?: string;
  findIfExists?: boolean;
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
};

export type ShlinkTagsList = {
  data: string[];
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
};

export type ShlinkVisitsParams = {
  page?: number;
  itemsPerPage?: number;
  startDate?: string;
  endDate?: string;
  excludeBots?: boolean;
};

export type ShlinkWithDomainVisitsParams = ShlinkVisitsParams & {
  domain?: string | 'DEFAULT';
};

export type ShlinkOrphanVisitsParams = ShlinkWithDomainVisitsParams & {
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
  /** Available since Shlink 4.6.0 */
  excludeTags?: string[];
  /** Available since Shlink 4.6.0 */
  excludeTagsMode?: TagsFilteringMode;
  orderBy?: ShlinkShortUrlsOrder;
  startDate?: string;
  endDate?: string;
  excludeMaxVisitsReached?: boolean;
  excludePastValidUntil?: boolean;
  /** Available since Shlink 4.6.0 */
  apiKeyName?: string;
};

export type ShlinkRedirectConditionType =
  | 'device'
  | 'language'
  | 'query-param'
  | 'any-value-query-param' // Since Shlink 4.5.0
  | 'valueless-query-param' // Since Shlink 4.5.0
  | 'ip-address'
  | 'geolocation-country-code' // Since Shlink 4.3.0
  | 'geolocation-city-name'; // Since Shlink 4.3.0

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
  matchValue: string | null;
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
