# Redirect rules

All methods to consume the API's [Redirect rules](https://api-spec.shlink.io/#/Redirect%20rules) context are available in the `ShlinkApiClient`.

### Get short URL redirect rules

```ts
const apiClient = new ShlinkApiClient(...);
const redirectRules = await apiClient.getShortUrlRedirectRules({ shortCode: 'abc123' });

console.log(redirectRules.defaultLongUrl);
redirectRules.redirectRules.forEach((redirectRule) => {
  console.log(redirectRule.longUrl);
  console.log(redirectRule.priority);

  redirectRule.conditions.forEach((condition) => {
    console.log(condition.type);
    console.log(condition.matchKey);
    console.log(condition.matchValue);
  });
});
```

### Set short URL redirect rules

```ts
const apiClient = new ShlinkApiClient(...);
await apiClient.setShortUrlRedirectRules(
  { shortCode: 'abc123' },
  {
    redirectRules: [
      {
        longUrl: 'https://example.com/long-url',
        conditions: [
          {
            type: 'language',
            matchValue: 'en-US',
          },
          {
            type: 'query-param',
            matchKey: 'foo',
            matchValue: 'bar',
          },
        ],
      }
    ],
  }
);
```
