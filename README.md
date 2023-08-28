# Shlink JS SDK

A javascript Shlink's REST API client for the browser and node.js.

## General usage

This library provides a main `ShlinkApiClient` class, which receives some config and allows to consume all endpoints exposed by Shlink API.

In order to perform HTTP requests, it expects an implementation of `HttpClient` to be provided. This library includes one meant to be used in the browser, which internally uses [`window.fetch`](https://developer.mozilla.org/es/docs/Web/API/fetch), and one to be used in node.js, which internally uses [`http.request`](https://nodejs.org/api/http.html#httprequestoptions-callback).

If you have some special needs, you can provide your own implementation, or decorate one of those two.

### In the browser

```ts
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { FetchHttpClient } from '@shlinkio/shlink-js-sdk/browser';

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new FetchHttpClient(), serverInfo);
```

### In node.js

> **Warning**
> At this time, this HTTP client is not yet implemented. Take this as the documentation of how it will work once implemented.

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
