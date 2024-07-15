// @vitest-environment node

import { fromPartial } from '@total-typescript/shoehorn';
import { NodeHttpClient } from '../../src/node';

type ResponseBehavior = {
  invokeEnd?: boolean;
  invokeErrorWith?: any;
  invokeDataWith?: Uint8Array;
  statusCode?: number;
};

describe('NodeHttpClient', () => {
  const createHttpClient = (
    { invokeEnd, invokeErrorWith, invokeDataWith, statusCode = 200 }: ResponseBehavior = {},
  ) => {
    const requestWrite = vi.fn();
    const requestOn = vi.fn();
    const request = vi.fn().mockImplementation((_, __, callback) => {
      callback({
        statusCode,
        on: (event: string, listener: (...args: any[]) => void) => {
          if (invokeEnd && event === 'end') {
            listener();
          }
          if (invokeErrorWith && event === 'error') {
            listener(invokeErrorWith);
          }
          if (invokeDataWith && event === 'data') {
            listener(invokeDataWith);
          }
        },
      });

      return {
        write: requestWrite,
        on: requestOn,
        end: vi.fn(),
      };
    });

    return {
      requestWrite,
      requestOn,
      request,
      httpClient: new NodeHttpClient(fromPartial({ request })),
    };
  };

  describe('emptyRequest', () => {
    it('writes request body if provided', async () => {
      const { httpClient, requestWrite } = createHttpClient({ invokeEnd: true });

      await httpClient.emptyRequest('', { body: '{ "foo": "bar" }' });
      expect(requestWrite).toHaveBeenCalledWith('{ "foo": "bar" }');
    });

    it('rejects in case of request error', async () => {
      const { httpClient, requestOn } = createHttpClient();
      const expectedError = 'the_error';

      requestOn.mockImplementation((_, callback) => callback(expectedError));

      await expect(() => httpClient.emptyRequest('')).rejects.toThrowError(expectedError);
    });

    it.each([400, 404, 500, 503])('rejects if response status is >=400', async (statusCode) => {
      const { httpClient } = createHttpClient({ statusCode, invokeEnd: true });
      await expect(() => httpClient.emptyRequest('')).rejects.toThrow();
    });

    it('rejects in case of response error', async () => {
      const theError = new Error('The_error');
      const { httpClient } = createHttpClient({ invokeErrorWith: theError });

      await expect(() => httpClient.emptyRequest('')).rejects.toThrow(theError);
    });

    it.each([
      ['http://example.com', (agent: any) => expect(agent).not.toBeDefined()],
      ['https://example.com', (agent: any) => expect(agent).toBeDefined()],
    ])('sets proper agent based on URL schema', async (url, assertAgent) => {
      const { request, httpClient } = createHttpClient({ invokeEnd: true });

      await httpClient.emptyRequest(url);

      assertAgent(request.mock.lastCall?.[1].agent);
    });
  });

  describe('jsonRequest', () => {
    it('parses response data to JSON', async () => {
      const data = new Uint8Array(Buffer.from('{ "foo": "bar" }'));
      const { httpClient } = createHttpClient({ invokeDataWith: data, invokeEnd: true });

      const result = await httpClient.jsonRequest('');

      expect(result).toEqual({ foo: 'bar' });
    });
  });
});
