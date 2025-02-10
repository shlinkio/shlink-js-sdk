# Domains

All methods to consume the API's [Domains](https://api-spec.shlink.io/#/Domains) context are available in the `ShlinkApiClient`.

### List domains

```ts
const apiClient = new ShlinkApiClient(...);
const domains = await apiClient.listDomains();

domains.data.forEach((domain) => {
  console.log(domain.domain);
  console.log(domain.isDefault);
  console.log(domain.redirects);
});
console.log(domains.defaultRedirects);
```

### Configure redirects

```ts
const apiClient = new ShlinkApiClient(...);
await apiClient.editDomainRedirects({
  domain: 'example.com',
  baseUrlRedirect: 'https://shlink.io',
  regular404Redirect: null,
});
```
