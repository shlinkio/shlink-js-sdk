import type {
  ShlinkShortUrlsListNormalizedParams,
  ShlinkShortUrlsListParams,
  ShlinkShortUrlsOrder,
} from '../api-contract';
import {
  ErrorTypeV2,
  ErrorTypeV3,
} from '../api-contract';

export type ApiVersion = 2 | 3;

export const buildShlinkBaseUrl = (url: string, version: ApiVersion) => `${url}/rest/v${version}`;

const shortUrlsOrderToString = (order: ShlinkShortUrlsOrder): string | undefined => (
  order.dir ? `${order.field}-${order.dir}` : undefined
);

export const normalizeListParams = (
  { orderBy = {}, excludeMaxVisitsReached, excludePastValidUntil, ...rest }: ShlinkShortUrlsListParams,
): ShlinkShortUrlsListNormalizedParams => ({
  ...rest,
  excludeMaxVisitsReached: excludeMaxVisitsReached === true ? 'true' : undefined,
  excludePastValidUntil: excludePastValidUntil === true ? 'true' : undefined,
  orderBy: shortUrlsOrderToString(orderBy),
});

export const isRegularNotFound = (error: unknown): boolean => {
  if (error === null || !(typeof error === 'object' && 'type' in error && 'status' in error)) {
    return false;
  }

  return (error.type === ErrorTypeV2.NOT_FOUND || error.type === ErrorTypeV3.NOT_FOUND) && error.status === 404;
};

export const replaceAuthorityFromUri = (uri: string, newAuthority: string): string => {
  const [schema, rest] = uri.split('://');
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
