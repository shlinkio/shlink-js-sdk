import type {
  ShlinkApiClient as BaseShlinkApiClient,
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
} from '../api-contract';
import type { HttpClient, RequestOptions } from './HttpClient';
import type { ApiVersion } from './utils';
import {
  buildShlinkBaseUrl,
  normalizeListParams,
  queryParamsToString,
  replaceAuthorityFromUri,
} from './utils';

type ShlinkRequestOptions = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: object;
  body?: object;
  domain?: string;
};

export type ServerInfo = {
  baseUrl: string
  apiKey: string
};

export class ShlinkApiClient implements BaseShlinkApiClient {
  private apiVersion: ApiVersion;

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly serverInfo: ServerInfo,
  ) {
    this.apiVersion = 3;
  }

  // Short URLs

  public async listShortUrls(params: ShlinkShortUrlsListParams = {}): Promise<ShlinkShortUrlsList> {
    return this.performRequest<{ shortUrls: ShlinkShortUrlsList }>(
      { url: '/short-urls', query: normalizeListParams(params) },
    ).then(({ shortUrls }) => shortUrls);
  }

  public async createShortUrl(options: ShlinkCreateShortUrlData): Promise<ShlinkShortUrl> {
    const body = Object.entries(options).reduce<any>((obj, [key, value]) => {
      if (value) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value;
      }
      return obj;
    }, {});
    return this.performRequest<ShlinkShortUrl>({ url: '/short-urls', method: 'POST', body });
  }

  public async getShortUrl(shortCode: string, domain?: string | null): Promise<ShlinkShortUrl> {
    return this.performRequest<ShlinkShortUrl>({ url: `/short-urls/${shortCode}`, query: { domain } });
  }

  public async deleteShortUrl(shortCode: string, domain?: string | null | undefined): Promise<void> {
    return this.performEmptyRequest({ url: `/short-urls/${shortCode}`, method: 'DELETE', query: { domain } });
  }

  public async updateShortUrl(
    shortCode: string,
    domain: string | null | undefined,
    data: ShlinkEditShortUrlData,
  ): Promise<ShlinkShortUrl> {
    return this.performRequest<ShlinkShortUrl>(
      { url: `/short-urls/${shortCode}`, method: 'PATCH', query: { domain }, body: data },
    );
  }

  // Short URL redirect rules

  public async getShortUrlRedirectRules(shortCode: string, domain?: string | null): Promise<ShlinkRedirectRulesList> {
    return this.performRequest<ShlinkRedirectRulesList>(
      { url: `/short-urls/${shortCode}/redirect-rules`, method: 'GET', query: { domain } },
    );
  }

  public async setShortUrlRedirectRules(
    shortCode: string,
    domain: string | null | undefined,
    data: ShlinkSetRedirectRulesData,
  ): Promise<ShlinkRedirectRulesList> {
    return this.performRequest<ShlinkRedirectRulesList>(
      { url: `/short-urls/${shortCode}/redirect-rules`, method: 'POST', query: { domain }, body: data },
    );
  }

  // Visits

  public async getVisitsOverview(): Promise<ShlinkVisitsOverview> {
    return this.performRequest<{ visits: ShlinkVisitsOverview }>({ url: '/visits' }).then(({ visits }) => visits);
  }

  public async getShortUrlVisits(shortCode: string, params?: ShlinkShortUrlVisitsParams): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: `/short-urls/${shortCode}/visits`, query: params });
  }

  public async getTagVisits(tag: string, params?: ShlinkVisitsParams): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: `/tags/${tag}/visits`, query: params });
  }

  public async getDomainVisits(domain: string, params?: ShlinkVisitsParams): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: `/domains/${domain}/visits`, query: params });
  }

  public async getOrphanVisits(params?: ShlinkOrphanVisitsParams): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: '/visits/orphan', query: params });
  }

  public async getNonOrphanVisits(params?: ShlinkVisitsParams): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: '/visits/non-orphan', query: params });
  }

  private async performVisitsRequest(options: ShlinkRequestOptions): Promise<ShlinkVisitsList> {
    return this.performRequest<{ visits: ShlinkVisitsList }>(options).then(({ visits }) => visits);
  }

  public async deleteShortUrlVisits(shortCode: string, domain?: string | null): Promise<ShlinkDeleteVisitsResult> {
    const query = domain ? { domain } : undefined;
    return this.performRequest<ShlinkDeleteVisitsResult>(
      { method: 'DELETE', url: `/short-urls/${shortCode}/visits`, query },
    );
  }

  public async deleteOrphanVisits(): Promise<ShlinkDeleteVisitsResult> {
    return this.performRequest<ShlinkDeleteVisitsResult>({ method: 'DELETE', url: '/visits/orphan' });
  }

  // Tags

  public async listTags(): Promise<ShlinkTagsList> {
    return this.performRequest<{ tags: ShlinkTagsList }>({
      url: '/tags',
      query: { withStats: 'true' }, // FIXME Remove this query param once Shlink 3.0 is no longer supported
    }).then(({ tags }) => tags);
  }

  public async tagsStats(): Promise<ShlinkTagsStatsList> {
    return this.performRequest<{ tags: ShlinkTagsStatsList }>({ url: '/tags/stats' }).then(({ tags }) => tags);
  }

  public async deleteTags(tags: string[]): Promise<{ tags: string[] }> {
    return this.performEmptyRequest({ url: '/tags', method: 'DELETE', query: { tags } }).then(() => ({ tags }));
  }

  public async editTag(oldName: string, newName: string): Promise<{ oldName: string; newName: string }> {
    return this.performEmptyRequest({ url: '/tags', method: 'PUT', body: { oldName, newName } })
      .then(() => ({ oldName, newName }));
  }

  // Domains

  public async listDomains(): Promise<ShlinkDomainsList> {
    return this.performRequest<{ domains: ShlinkDomainsList }>({ url: '/domains' }).then(({ domains }) => domains);
  }

  public async editDomainRedirects(
    domainRedirects: ShlinkEditDomainRedirects,
  ): Promise<ShlinkDomainRedirects> {
    return this.performRequest<ShlinkDomainRedirects>(
      { url: '/domains/redirects', method: 'PATCH', body: domainRedirects },
    );
  }

  // Misc

  public async health(domain?: string): Promise<ShlinkHealth> {
    return this.performRequest<ShlinkHealth>({ url: '/health', domain });
  }

  public async mercureInfo(): Promise<ShlinkMercureInfo> {
    return this.performRequest<ShlinkMercureInfo>({ url: '/mercure-info' });
  }

  private async performRequest<T>(requestOptions: ShlinkRequestOptions): Promise<T> {
    return this.httpClient.jsonRequest<T>(...this.toFetchParams(requestOptions));
  }

  private async performEmptyRequest(requestOptions: ShlinkRequestOptions): Promise<void> {
    return this.httpClient.emptyRequest(...this.toFetchParams(requestOptions));
  }

  private toFetchParams({
    url,
    method = 'GET',
    query = {},
    body,
    domain,
  }: ShlinkRequestOptions): [string, RequestOptions] {
    const normalizedQuery = queryParamsToString(query);
    const stringifiedQuery = !normalizedQuery ? '' : `?${normalizedQuery}`;
    const baseUrl = domain ? replaceAuthorityFromUri(this.serverInfo.baseUrl, domain) : this.serverInfo.baseUrl;

    return [`${buildShlinkBaseUrl(baseUrl, this.apiVersion)}${url}${stringifiedQuery}`, {
      method,
      body: body && JSON.stringify(body),
      headers: { 'X-Api-Key': this.serverInfo.apiKey },
    }];
  }
}
