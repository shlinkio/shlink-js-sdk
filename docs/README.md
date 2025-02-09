# Shlink JS SDK


[![Build Status](https://img.shields.io/github/actions/workflow/status/shlinkio/shlink-js-sdk/ci.yml?branch=main&logo=github&style=flat-square)](https://github.com/shlinkio/shlink-js-sdk/actions/workflows/ci.yml?query=workflow%3A%22Continuous+integration%22)
[![Code Coverage](https://img.shields.io/codecov/c/gh/shlinkio/shlink-js-sdk/main?style=flat-square)](https://app.codecov.io/gh/shlinkio/shlink-js-sdk)
[![GitHub release](https://img.shields.io/github/release/shlinkio/shlink-js-sdk.svg?style=flat-square)](https://github.com/shlinkio/shlink-js-sdk/releases/latest)
[![GitHub license](https://img.shields.io/github/license/shlinkio/shlink-js-sdk.svg?style=flat-square)](https://github.com/shlinkio/shlink-js-sdk/blob/main/LICENSE)
[![Paypal Donate](https://img.shields.io/badge/Donate-paypal-blue.svg?style=flat-square&logo=paypal&colorA=cccccc)](https://slnk.to/donate)

A Shlink REST API client for JavaScript runtimes.

* Use it anywhere: the browser, [Node.js](https://nodejs.org/), [Deno](https://deno.com/) and [Bun](https://bun.sh/).
* Statically typed via TypeScript.
* Extensively tested with unit and integration tests.

## Installation

```shell
npm install @shlinkio/shlink-js-sdk
```

## Basic usage

```ts
import type { ServerInfo } from '@shlinkio/shlink-js-sdk';
import { ShlinkApiClient } from '@shlinkio/shlink-js-sdk';
import { FetchHttpClient } from '@shlinkio/shlink-js-sdk/fetch';

const serverInfo: ServerInfo = {
  baseUrl: 'https://s.test',
  apiKey: '12345',
};
const apiClient = new ShlinkApiClient(new FetchHttpClient(), serverInfo);
```
