# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]
### Added
* *Nothing*

### Changed
* [#228](https://github.com/shlinkio/shlink-js-sdk/issues/228) When any method of the `ShlinkApiClient` can receive both a `shortCode` and a `domain`, they are now together in a new `ShortUrlIdentifier` object.

### Deprecated
* *Nothing*

### Removed
* [#229](https://github.com/shlinkio/shlink-js-sdk/issues/229) Drop support for Shlink older than 3.5.0.

### Fixed
* *Nothing*


## [1.4.0] - 2025-01-26
### Added
* [#8](https://github.com/shlinkio/shlink-js-sdk/issues/8) Allow an `AbortSignal` to be provided as the last optional argument to all public `ShlinkApiClient` methods.

  This will let consumers control if a request should be aborted, via `AbortController`.

### Changed
* Rearrange `exports` order, as suggested by vitest.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [1.3.0] - 2024-11-25
### Added
* Add support for `geolocation-country-code` and `geolocation-city-name` redirect condition types.
* Add support for `domain` to filter short URL lists.
* Update API contracts for Shlink 4.3.0

### Changed
* Update dependencies.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [1.2.0] - 2024-08-13
### Added
* Add support for `ip-address` redirect condition type.

### Changed
* Update JS coding standard and migrate to ESLint flat config.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [1.1.0] - 2024-04-16
### Added
* Add optional `visitedUrl` prop in `ShlinkRegularVisit`, to fulfil what Shlink 4.1.0 now supports.

### Changed
* Update JS coding standard

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [1.0.0] - 2024-03-05
### Added
* [#72](https://github.com/shlinkio/shlink-js-sdk/issues/72) Add support for Shlink 4.0.0

  * Add support to list and set short URL redirect conditions.
  * Add `type` param to `ShlinkApiClient.getOrphanVisits`.

### Changed
* Update dependencies.
* [#22](https://github.com/shlinkio/shlink-js-sdk/issues/22) Consolidate exposed types, making them more consistent.

  * Types no longer couple with HTTP terminology, removing references to body, query, request, response, etc.
  * All types that wrap a list of entities are now suffixed with `List` (`ShlinkShortUrlsList`, `ShlinkVisitsList`, etc.)
  * Arguments passed to the API client frequently use the `Params` suffix when representing filters (like `ShlinkVisitsParams`) or `Data` suffix when wrapping props to be mutated (like `ShlinkEditShortUrlData`).
  * Methods returning entities, just use the name of the entity itself, regardless of the method's nature (fetch or mutation).
  * Methods returning the result of a mutation when it is not an entity, will return types using the `Result` suffix (like `ShlinkDeleteVisitsResult`).

### Deprecated
* *Nothing*

### Removed
* [#74](https://github.com/shlinkio/shlink-js-sdk/issues/74) Drop support for Shlink older than 3.3.0. This version introduced the API v3, so this allows to remove the logic to fall back to v2, and remove the error types used in v2.

### Fixed
* *Nothing*


## [0.2.2] - 2024-01-20
### Added
* *Nothing*

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* Fix API client contract definition.


## [0.2.1] - 2024-01-20
### Added
* Export different types for short URL visits params and other visits params.

### Changed
* Export API contract as TypeScript types instead of interfaces.

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


## [0.2.0] - 2023-10-27
### Added
* [#2](https://github.com/shlinkio/shlink-js-sdk/issues/2) Implement node.js `HttpClient`.
* Add support for orphan and short URL visits deletion methods.

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*


### Fixed
* *Nothing*

## [0.1.0] - 2023-08-28
### Added
* First release

### Changed
* *Nothing*

### Deprecated
* *Nothing*

### Removed
* *Nothing*

### Fixed
* *Nothing*
