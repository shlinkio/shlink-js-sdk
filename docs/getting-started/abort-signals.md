# Abort signals

All methods exposed by the `ShlinkApiClient` can optionally be provided with an `AbortSignal` object, as part of their last optional parameter.

This signal can be used to abort any in-flight request, and reject the resulting promise.

```ts
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { FetchHttpClient } from '@shlinkio/shlink-js-sdk/fetch';

const serverInfo = { baseUrl: 'https://s.test', apiKey: '12345' };
const apiClient = new ShlinkApiClient(new FetchHttpClient(), serverInfo);

// Create an abort controller and pass its signal to any method
const abortController = new AbortController();
const listPromise = apiClient.listShortUrls({ signal: controller.signal });

abortController.abort();
listPromise.catch(() => console.log('Request has been aborted'));
```
