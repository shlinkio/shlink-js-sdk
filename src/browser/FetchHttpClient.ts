import type { HttpClient, RequestOptions } from '../api';

type Fetch = typeof window.fetch;

const applicationJsonHeader = { 'Content-Type': 'application/json' };

const withJsonContentType = (options?: RequestOptions): RequestInit | undefined => {
  if (!options?.body) {
    return options;
  }

  return options ? {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...applicationJsonHeader,
    },
  } : {
    headers: applicationJsonHeader,
  };
};

export class FetchHttpClient implements HttpClient {
  constructor(private readonly fetch: Fetch = window.fetch.bind(window)) {}

  public async jsonRequest<T>(url: string, options?: RequestOptions): Promise<T> {
    const resp = await this.fetch(url, withJsonContentType(options));
    const json = await resp.json();

    if (!resp.ok) {
      throw json;
    }

    return json as T;
  }

  async emptyRequest(url: string, options?: RequestOptions): Promise<void> {
    const resp = await this.fetch(url, withJsonContentType(options));
    if (!resp.ok) {
      throw await resp.json();
    }
  }
}
