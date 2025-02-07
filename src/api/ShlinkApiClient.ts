import type {
  Abortable,
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
  signal?: AbortSignal;
};

export type ServerInfo = {
  baseUrl: string
  apiKey: string
};

export class ShlinkApiClient implements BaseShlinkApiClient {
  #apiVersion: ApiVersion;

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly serverInfo: ServerInfo,
  ) {
    this.#apiVersion = 3;
  }

  // Short URLs

  public async listShortUrls(
    params: ShlinkShortUrlsListParams = {},
    signal?: AbortSignal,
  ): Promise<ShlinkShortUrlsList> {
    return this.performRequest<{ shortUrls: ShlinkShortUrlsList }>(
      { url: '/short-urls', query: normalizeListParams(params), signal },
    ).then(({ shortUrls }) => shortUrls);
  }

  public async createShortUrl({ signal, ...options }: ShlinkCreateShortUrlData & Abortable): Promise<ShlinkShortUrl> {
    const body = Object.entries(options).reduce<any>((obj, [key, value]) => {
      if (value) {
        obj[key] = value;
      }
      return obj;
    }, {});
    return this.performRequest<ShlinkShortUrl>({ url: '/short-urls', method: 'POST', body, signal });
  }

  public async getShortUrl(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal }: Abortable = {},
  ): Promise<ShlinkShortUrl> {
    return this.performRequest<ShlinkShortUrl>({ url: `/short-urls/${shortCode}`, query: { domain }, signal });
  }

  public async deleteShortUrl(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal }: Abortable = {},
  ): Promise<void> {
    return this.performEmptyRequest({ url: `/short-urls/${shortCode}`, method: 'DELETE', query: { domain }, signal });
  }

  public async updateShortUrl(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal, ...data }: ShlinkEditShortUrlData & Abortable,
  ): Promise<ShlinkShortUrl> {
    return this.performRequest<ShlinkShortUrl>(
      { url: `/short-urls/${shortCode}`, method: 'PATCH', query: { domain }, body: data, signal },
    );
  }

  // Short URL redirect rules

  public async getShortUrlRedirectRules(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal }: Abortable = {},
  ): Promise<ShlinkRedirectRulesList> {
    return this.performRequest<ShlinkRedirectRulesList>(
      { url: `/short-urls/${shortCode}/redirect-rules`, method: 'GET', query: { domain }, signal },
    );
  }

  public async setShortUrlRedirectRules(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal, ...data }: ShlinkSetRedirectRulesData & Abortable,
  ): Promise<ShlinkRedirectRulesList> {
    return this.performRequest<ShlinkRedirectRulesList>(
      { url: `/short-urls/${shortCode}/redirect-rules`, method: 'POST', query: { domain }, body: data, signal },
    );
  }

  // Visits

  public async getVisitsOverview({ signal }: Abortable = {}): Promise<ShlinkVisitsOverview> {
    return this.performRequest<{ visits: ShlinkVisitsOverview }>({ url: '/visits', signal }).then(
      ({ visits }) => visits,
    );
  }

  public async getShortUrlVisits(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal, ...params }: ShlinkVisitsParams & Abortable = {},
  ): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: `/short-urls/${shortCode}/visits`, query: { ...params, domain }, signal });
  }

  public async getTagVisits(
    tag: string,
    { signal, ...params }: ShlinkVisitsParams & Abortable = {},
  ): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: `/tags/${tag}/visits`, query: params, signal });
  }

  public async getDomainVisits(
    domain: string,
    { signal, ...params }: ShlinkVisitsParams & Abortable = {},
  ): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: `/domains/${domain}/visits`, query: params, signal });
  }

  public async getOrphanVisits(
    { signal, ...params }: ShlinkOrphanVisitsParams & Abortable = {},
  ): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: '/visits/orphan', query: params, signal });
  }

  public async getNonOrphanVisits(
    { signal, ...params }: ShlinkVisitsParams & Abortable = {},
  ): Promise<ShlinkVisitsList> {
    return this.performVisitsRequest({ url: '/visits/non-orphan', query: params, signal });
  }

  private async performVisitsRequest(options: ShlinkRequestOptions): Promise<ShlinkVisitsList> {
    return this.performRequest<{ visits: ShlinkVisitsList }>(options).then(({ visits }) => visits);
  }

  public async deleteShortUrlVisits(
    { shortCode, domain }: ShlinkShortUrlIdentifier,
    { signal }: Abortable = {},
  ): Promise<ShlinkDeleteVisitsResult> {
    const query = domain ? { domain } : undefined;
    return this.performRequest<ShlinkDeleteVisitsResult>(
      { method: 'DELETE', url: `/short-urls/${shortCode}/visits`, query, signal },
    );
  }

  public async deleteOrphanVisits({ signal }: Abortable = {}): Promise<ShlinkDeleteVisitsResult> {
    return this.performRequest<ShlinkDeleteVisitsResult>({ method: 'DELETE', url: '/visits/orphan', signal });
  }

  // Tags

  public async listTags({ signal }: Abortable = {}): Promise<ShlinkTagsList> {
    return this.performRequest<{ tags: ShlinkTagsList }>({ url: '/tags', signal }).then(({ tags }) => tags);
  }

  public async tagsStats({ signal }: Abortable = {}): Promise<ShlinkTagsStatsList> {
    return this.performRequest<{ tags: ShlinkTagsStatsList }>({ url: '/tags/stats', signal }).then(({ tags }) => tags);
  }

  public async deleteTags(tags: string[], { signal }: Abortable = {}): Promise<{ tags: string[] }> {
    return this.performEmptyRequest({ url: '/tags', method: 'DELETE', query: { tags }, signal }).then(() => ({ tags }));
  }

  public async editTag({ oldName, newName }: ShlinkRenaming, { signal }: Abortable = {}): Promise<ShlinkRenaming> {
    return this.performEmptyRequest({ url: '/tags', method: 'PUT', body: { oldName, newName }, signal })
      .then(() => ({ oldName, newName }));
  }

  // Domains

  public async listDomains({ signal }: Abortable = {}): Promise<ShlinkDomainsList> {
    return this.performRequest<{ domains: ShlinkDomainsList }>({ url: '/domains', signal }).then(
      ({ domains }) => domains,
    );
  }

  public async editDomainRedirects(
    domainRedirects: ShlinkEditDomainRedirects,
    { signal }: Abortable = {},
  ): Promise<ShlinkDomainRedirects> {
    return this.performRequest<ShlinkDomainRedirects>(
      { url: '/domains/redirects', method: 'PATCH', body: domainRedirects, signal },
    );
  }

  // Misc

  public async health({ domain, signal }: { domain?: string } & Abortable = {}): Promise<ShlinkHealth> {
    return this.performRequest<ShlinkHealth>({ url: '/health', domain, signal });
  }

  public async mercureInfo({ signal }: Abortable = {}): Promise<ShlinkMercureInfo> {
    return this.performRequest<ShlinkMercureInfo>({ url: '/mercure-info', signal });
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
    signal,
  }: ShlinkRequestOptions): [string, RequestOptions] {
    const normalizedQuery = queryParamsToString(query);
    const stringifiedQuery = !normalizedQuery ? '' : `?${normalizedQuery}`;
    const baseUrl = domain ? replaceAuthorityFromUri(this.serverInfo.baseUrl, domain) : this.serverInfo.baseUrl;

    return [`${buildShlinkBaseUrl(baseUrl, this.#apiVersion)}${url}${stringifiedQuery}`, {
      method,
      body: body && JSON.stringify(body),
      headers: { 'X-Api-Key': this.serverInfo.apiKey },
      signal,
    }];
  }
}
