# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org).

## [Unreleased]
### Added
* *Nothing*

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
