import type {
  ShlinkApiClient as BaseShlinkApiClient,
  ShlinkCreateShortUrlData,
  ShlinkDeleteVisitsResponse,
  ShlinkDomainRedirects,
  ShlinkDomainsResponse,
  ShlinkEditDomainRedirects,
  ShlinkEditShortUrlData,
  ShlinkHealth,
  ShlinkMercureInfo,
  ShlinkShortUrl,
  ShlinkShortUrlsListParams,
  ShlinkShortUrlsResponse,
  ShlinkTags,
  ShlinkTagsResponse,
  ShlinkTagsStatsResponse,
  ShlinkVisits,
  ShlinkVisitsOverview,
  ShlinkVisitsParams,
} from '../api-contract';
import type { HttpClient, RequestOptions } from './HttpClient';
import type {
  ApiVersion } from './utils';
import {
  buildShlinkBaseUrl,
  isRegularNotFound,
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

  public async listShortUrls(params: ShlinkShortUrlsListParams = {}): Promise<ShlinkShortUrlsResponse> {
    return this.performRequest<{ shortUrls: ShlinkShortUrlsResponse }>(
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

  public async getShortUrlVisits(shortCode: string, query?: ShlinkVisitsParams): Promise<ShlinkVisits> {
    return this.performRequest<{ visits: ShlinkVisits }>({ url: `/short-urls/${shortCode}/visits`, query })
      .then(({ visits }) => visits);
  }

  public async deleteShortUrlVisits(shortCode: string, domain?: string | null): Promise<ShlinkDeleteVisitsResponse> {
    const query = domain ? { domain } : undefined;
    return this.performRequest<ShlinkDeleteVisitsResponse>(
      { method: 'DELETE', url: `/short-urls/${shortCode}/visits`, query },
    );
  }

  public async getTagVisits(tag: string, query?: Omit<ShlinkVisitsParams, 'domain'>): Promise<ShlinkVisits> {
    return this.performRequest<{ visits: ShlinkVisits }>({ url: `/tags/${tag}/visits`, query })
      .then(({ visits }) => visits);
  }

  public async getDomainVisits(domain: string, query?: Omit<ShlinkVisitsParams, 'domain'>): Promise<ShlinkVisits> {
    return this.performRequest<{ visits: ShlinkVisits }>({ url: `/domains/${domain}/visits`, query })
      .then(({ visits }) => visits);
  }

  public async getOrphanVisits(query?: Omit<ShlinkVisitsParams, 'domain'>): Promise<ShlinkVisits> {
    return this.performRequest<{ visits: ShlinkVisits }>({ url: '/visits/orphan', query }).then(({ visits }) => visits);
  }

  public async deleteOrphanVisits(): Promise<ShlinkDeleteVisitsResponse> {
    return this.performRequest<ShlinkDeleteVisitsResponse>({ method: 'DELETE', url: '/visits/orphan' });
  }

  public async getNonOrphanVisits(query?: Omit<ShlinkVisitsParams, 'domain'>): Promise<ShlinkVisits> {
    return this.performRequest<{ visits: ShlinkVisits }>({ url: '/visits/non-orphan', query })
      .then(({ visits }) => visits);
  }

  public async getVisitsOverview(): Promise<ShlinkVisitsOverview> {
    return this.performRequest<{ visits: ShlinkVisitsOverview }>({ url: '/visits' }).then(({ visits }) => visits);
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
    body: ShlinkEditShortUrlData,
  ): Promise<ShlinkShortUrl> {
    return this.performRequest<ShlinkShortUrl>(
      { url: `/short-urls/${shortCode}`, method: 'PATCH', query: { domain }, body },
    );
  }

  public async listTags(): Promise<ShlinkTags> {
    return this.performRequest<{ tags: ShlinkTagsResponse }>({ url: '/tags', query: { withStats: 'true' } })
      .then(({ tags }) => tags)
      .then(({ data, stats = [] }) => ({ tags: data, stats }));
  }

  public async tagsStats(): Promise<ShlinkTags> {
    return this.performRequest<{ tags: ShlinkTagsStatsResponse }>({ url: '/tags/stats' })
      .then(({ tags }) => tags)
      .then(({ data }) => ({ tags: data.map(({ tag }) => tag), stats: data }));
  }

  public async deleteTags(tags: string[]): Promise<{ tags: string[] }> {
    return this.performEmptyRequest({ url: '/tags', method: 'DELETE', query: { tags } }).then(() => ({ tags }));
  }

  public async editTag(oldName: string, newName: string): Promise<{ oldName: string; newName: string }> {
    return this.performEmptyRequest({ url: '/tags', method: 'PUT', body: { oldName, newName } })
      .then(() => ({ oldName, newName }));
  }

  public async health(domain?: string): Promise<ShlinkHealth> {
    return this.performRequest<ShlinkHealth>({ url: '/health', domain });
  }

  public async mercureInfo(): Promise<ShlinkMercureInfo> {
    return this.performRequest<ShlinkMercureInfo>({ url: '/mercure-info' });
  }

  public async listDomains(): Promise<ShlinkDomainsResponse> {
    return this.performRequest<{ domains: ShlinkDomainsResponse }>({ url: '/domains' }).then(({ domains }) => domains);
  }

  public async editDomainRedirects(
    domainRedirects: ShlinkEditDomainRedirects,
  ): Promise<ShlinkDomainRedirects> {
    return this.performRequest<ShlinkDomainRedirects>(
      { url: '/domains/redirects', method: 'PATCH', body: domainRedirects },
    );
  }

  private async performRequest<T>(requestOptions: ShlinkRequestOptions): Promise<T> {
    return this.httpClient.jsonRequest<T>(...this.toFetchParams(requestOptions)).catch(
      this.handleFetchError(() => this.httpClient.jsonRequest<T>(...this.toFetchParams(requestOptions))),
    );
  }

  private async performEmptyRequest(requestOptions: ShlinkRequestOptions): Promise<void> {
    return this.httpClient.emptyRequest(...this.toFetchParams(requestOptions)).catch(
      this.handleFetchError(() => this.httpClient.emptyRequest(...this.toFetchParams(requestOptions))),
    );
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

  private handleFetchError(retryFetch: Function) {
    return (e: unknown) => {
      if (!isRegularNotFound(e)) {
        throw e;
      }

      // If we capture a not found error, let's assume this Shlink version does not support API v3, so we decrease to
      // v2 and retry
      this.apiVersion = 2;
      return retryFetch();
    };
  }
}
