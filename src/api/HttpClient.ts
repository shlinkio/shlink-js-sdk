export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export type HttpClient = {
  /**
   * Performs a request and resolves a JSON-decoded version of the response body
   */
  jsonRequest<T>(url: string, options?: RequestOptions): Promise<T>;

  /**
   * Performs a request which expects no response body
   */
  emptyRequest(url: string, options?: RequestOptions): Promise<void>;
};
