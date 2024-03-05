import type { ShlinkShortUrlsListParams, ShlinkShortUrlsOrder } from '../api-contract';

export type ApiVersion = 3;

export const buildShlinkBaseUrl = (url: string, version: ApiVersion) => `${url}/rest/v${version}`;

const shortUrlsOrderToString = (order: ShlinkShortUrlsOrder): string | undefined => (
  order.dir ? `${order.field}-${order.dir}` : undefined
);

type ShlinkShortUrlsListNormalizedParams =
  Omit<ShlinkShortUrlsListParams, 'orderBy' | 'excludeMaxVisitsReached' | 'excludePastValidUntil'> & {
    orderBy?: string;
    excludeMaxVisitsReached?: 'true';
    excludePastValidUntil?: 'true';
  };

export const normalizeListParams = (
  { orderBy = {}, excludeMaxVisitsReached, excludePastValidUntil, ...rest }: ShlinkShortUrlsListParams,
): ShlinkShortUrlsListNormalizedParams => ({
  ...rest,
  excludeMaxVisitsReached: excludeMaxVisitsReached === true ? 'true' : undefined,
  excludePastValidUntil: excludePastValidUntil === true ? 'true' : undefined,
  orderBy: shortUrlsOrderToString(orderBy),
});

export const replaceAuthorityFromUri = (uri: string, newAuthority: string): string => {
  const [schema, rest] = uri.split('://');
  if (!rest) {
    throw new Error(`It is not possible to determine authority on "${uri}" for replacement`);
  }

  const [, ...pathParts] = rest.split('/');
  const normalizedPath = pathParts.length ? `/${pathParts.join('/')}` : '';

  return `${schema}://${newAuthority}${normalizedPath}`;
};

export const queryParamsToString = (queryParams: object = {}) => {
  const queryParamPairs = Object.entries(queryParams).flatMap(([key, value]) => {
    // Remove all props with null or undefined value
    if (value === null || value === undefined) {
      return [];
    }

    // For array values, make sure every item of the array is added individually, and keys are appended brackets
    if (Array.isArray(value)) {
      return value.map((subValue) => [`${key}[]`, subValue]);
    }

    // Return anything else verbatim
    return [[key, value]];
  });

  return new URLSearchParams(queryParamPairs).toString();
};
