# API contract

This library provides an additional entry point where only TypeScript types of the API contract are exposed.

This can be useful if you plan to implement your own client, or need to define an abstraction that is compatible with this SDK, without adding extra stuff to your production bundle.

```ts
import type { ShlinkApiClient, ShlinkShortUrl, ShlinkTags, ... } from '@shlinkio/shlink-js-sdk/api-contract';

// Do stuff with types...
```
