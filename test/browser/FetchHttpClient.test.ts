import type { RequestOptions } from '../../src';
import { FetchHttpClient } from '../../src/browser';

describe('FetchHttpClient', () => {
  const fetch = vi.fn();
  const httpClient = new FetchHttpClient(fetch);
  const requestOptions = (options: Omit<RequestOptions, 'method'>): RequestOptions => ({
    method: 'GET',
    ...options,
  });

  describe('jsonRequest', () => {
    it('throws json on success', async () => {
      const theError = { error: true, foo: 'bar' };
      fetch.mockResolvedValue({ json: () => theError, ok: false });

      await expect(httpClient.jsonRequest('')).rejects.toEqual(theError);
    });

    it.each([
      [undefined],
      [requestOptions({})],
      [requestOptions({ body: undefined })],
      [requestOptions({ body: '' })],
    ])('return json on failure', async (options) => {
      const theJson = { foo: 'bar' };
      fetch.mockResolvedValue({ json: () => theJson, ok: true });

      const result = await httpClient.jsonRequest('the_url', options);

      expect(result).toEqual(theJson);
      expect(fetch).toHaveBeenCalledWith('the_url', options);
    });

    it.each([
      [requestOptions({ body: 'the_body' })],
      [requestOptions({
        body: 'the_body',
        headers: {
          'Content-Type': 'text/plain',
        },
      })],
    ])('forwards JSON content-type when appropriate', async (options) => {
      const theJson = { foo: 'bar' };
      fetch.mockResolvedValue({ json: () => theJson, ok: true });

      const result = await httpClient.jsonRequest('the_url', options);

      expect(result).toEqual(theJson);
      expect(fetch).toHaveBeenCalledWith('the_url', expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      }));
    });
  });

  describe('emptyRequest', () => {
    it('returns empty on success', async () => {
      fetch.mockResolvedValue({ ok: true });

      const result = await httpClient.emptyRequest('');

      expect(result).not.toBeDefined();
    });

    it('throws error on failure', async () => {
      const theError = { error: true, foo: 'bar' };
      fetch.mockResolvedValue({ json: () => theError, ok: false });

      await expect(httpClient.emptyRequest('')).rejects.toEqual(theError);
    });
  });
});
