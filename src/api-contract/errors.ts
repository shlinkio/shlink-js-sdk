/**
 * Possible error types returned by Shlink's API
 * @todo convert in a regular frozen object
 */
export enum ErrorType {
  INVALID_ARGUMENT = 'https://shlink.io/api/error/invalid-data',
  INVALID_SHORT_URL_DELETION = 'https://shlink.io/api/error/invalid-short-url-deletion',
  DOMAIN_NOT_FOUND = 'https://shlink.io/api/error/domain-not-found',
  FORBIDDEN_OPERATION = 'https://shlink.io/api/error/forbidden-tag-operation',
  INVALID_SLUG = 'https://shlink.io/api/error/non-unique-slug',
  INVALID_SHORTCODE = 'https://shlink.io/api/error/short-url-not-found',
  TAG_CONFLICT = 'https://shlink.io/api/error/tag-conflict',
  TAG_NOT_FOUND = 'https://shlink.io/api/error/tag-not-found',
  MERCURE_NOT_CONFIGURED = 'https://shlink.io/api/error/mercure-not-configured',
  INVALID_AUTHORIZATION = 'https://shlink.io/api/error/missing-authentication',
  INVALID_API_KEY = 'https://shlink.io/api/error/invalid-api-key',
  NOT_FOUND = 'https://shlink.io/api/error/not-found',

  /** @deprecated Shlink 4.0.0 no longer validates URLs, so this error will never happen with that version */
  INVALID_URL = 'https://shlink.io/api/error/invalid-url',
}

/**
 * Shape of the errors returned by Shlink
 */
export type ProblemDetailsError = {
  type: string;
  detail: string;
  title: string;
  status: number;
  [extraProps: string]: any;
};
