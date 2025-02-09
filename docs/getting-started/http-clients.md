# HTTP Clients

This library provides a main `ShlinkApiClient` class, which expects some config and allows to consume all endpoints exposed by Shlink API.

In order to perform HTTP requests, it expects an implementation of `HttpClient` to be provided. This library includes two implementations

* `FetchHttpClient`: can be used in any env where [`globalThis.fetch`](https://developer.mozilla.org/es/docs/Web/API/fetch) is available (the browser, Node.js, Deno and Bun).
* `NodeHttpClient`: internally uses Node's [`http.request`](https://nodejs.org/api/http.html#httprequestoptions-callback), so it is only usable with Node.js, where it is slightly more performant than `FetchHttpClient`.

If you have some special needs, you can provide your own implementation, or decorate one of those two.

## Fetch

```ts
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { FetchHttpClient } from '@shlinkio/shlink-js-sdk/fetch';

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new FetchHttpClient(), serverInfo);
```

## Node

```ts
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { NodeHttpClient } from '@shlinkio/shlink-js-sdk/node';

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new NodeHttpClient(), serverInfo);
```

## Custom HTTP client

```ts
import type { HttpClient } from '@shlinkio/shlink-js-sdk';
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';

class MyHttpClient implements HttpClient {
  // ...
}

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new MyHttpClient(), serverInfo);
```
