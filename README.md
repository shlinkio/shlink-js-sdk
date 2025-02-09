# Shlink JS SDK

[![Build Status](https://img.shields.io/github/actions/workflow/status/shlinkio/shlink-js-sdk/ci.yml?branch=main&logo=github&style=flat-square)](https://github.com/shlinkio/shlink-js-sdk/actions/workflows/ci.yml?query=workflow%3A%22Continuous+integration%22)
[![Code Coverage](https://img.shields.io/codecov/c/gh/shlinkio/shlink-js-sdk/main?style=flat-square)](https://app.codecov.io/gh/shlinkio/shlink-js-sdk)
[![GitHub release](https://img.shields.io/github/release/shlinkio/shlink-js-sdk.svg?style=flat-square)](https://github.com/shlinkio/shlink-js-sdk/releases/latest)
[![GitHub license](https://img.shields.io/github/license/shlinkio/shlink-js-sdk.svg?style=flat-square)](https://github.com/shlinkio/shlink-js-sdk/blob/main/LICENSE)
[![Paypal Donate](https://img.shields.io/badge/Donate-paypal-blue.svg?style=flat-square&logo=paypal&colorA=cccccc)](https://slnk.to/donate)

A Shlink's REST API client for JS runtimes: the browser, [Node.js](https://nodejs.org/), [Deno](https://deno.com/) and [Bun](https://bun.sh/).

## Installation

    npm i @shlinkio/shlink-js-sdk

## General usage

This library provides a main `ShlinkApiClient` class, which receives some config and allows to consume all endpoints exposed by Shlink API.

In order to perform HTTP requests, it expects an implementation of `HttpClient` to be provided. This library includes two implementations

* `FetchHttpClient`: uses [`globalThis.fetch`](https://developer.mozilla.org/es/docs/Web/API/fetch), and can be used in any env where it is available (the browser, Node.js, Deno and Bun).
* `NodeHttpClient`: internally uses [`http.request`](https://nodejs.org/api/http.html#httprequestoptions-callback), so it is only usable with Node.js, where it is slightly more performant than `FetchHttpClient`.

If you have some special needs, you can provide your own implementation, or decorate one of those two.

### Fetch

```ts
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { FetchHttpClient } from '@shlinkio/shlink-js-sdk/fetch';

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new FetchHttpClient(), serverInfo);
```

### Node

```ts
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { NodeHttpClient } from '@shlinkio/shlink-js-sdk/node';

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new NodeHttpClient(), serverInfo);
```

### Custom HTTP client

```ts
import type { HttpClient } from '@shlinkio/shlink-js-sdk';
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';

class MyHttpClient implements HttpClient {
  // ...
}

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new MyHttpClient(), serverInfo);
```

## API contract

This library provides an additional entry point where only TypeScript types of the API contract are exposed.

This can be useful if you plan to implement your own client, or need to define an abstraction that is compatible with this SDK, without adding extra stuff to your production bundle.

```ts
import type { ShlinkApiClient, ShlinkShortUrl, ShlinkTags, ... } from '@shlinkio/shlink-js-sdk/api-contract';

// Do stuff with types...
```

## API version compatibility

This SDK will fulfill [Semantic Versioning](https://semver.org/), and every version of this SDK will support a reasonable range of Shlink versions.

From time to time, major versions of this SDK may drop support for some older Shlink versions, affecting definitions of some of the API contract types.

In order to keep backwards compatibility between minor releases, new response payload properties introduced by new Shlink API versions, will be defined as optional (`foo?: string`), so that it's clear that for older versions still supported by the SDK, those may not come back.

On the other hand, new endpoints will be supported in the form of new public methods in `ShlinkApiClient`. If you try to use those with an old Shlink version which did not implement them yet, you will get an error.
