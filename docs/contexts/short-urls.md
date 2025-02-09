# Short URLs

All methods to consume the API's [Short URLs](https://api-spec.shlink.io/#/Short%20URLs) context are available in the `ShlinkApiClient`.

### List short URLs

```ts
const apiClient = new ShlinkApiClient(...);
const result = await apiClient.listShortUrls();

result.data.forEach((shortUrl) => {
  console.log(`Short URL: ${shortUrl.shortUrl}`);
  console.log(`Long URL: ${shortUrl.longUrl}`);
});
```

You can also specify some filters for the list:

```ts
const apiClient = new ShlinkApiClient(...);
const result = await apiClient.listShortUrls({
  searchTerm: 'foobar',
  tags: ['videogames', 'development'],
  orderBy: {
    field: 'title',
    dir: 'DESC',
  },
});

result.data.forEach((shortUrl) => {
  console.log(`Short URL: ${shortUrl.shortUrl}`);
  console.log(`Long URL: ${shortUrl.longUrl}`);
});
```

### Get individual short URLs

```ts
const apiClient = new ShlinkApiClient(...);
const shortUrl = await apiClient.getShortUrl({ shortCode: 'abc123' });

console.log(`Short URL: ${shortUrl.shortUrl}`);
console.log(`Long URL: ${shortUrl.longUrl}`);
```

### Create new short URL

```ts
const apiClient = new ShlinkApiClient(...);
const shortUrl = await apiClient.createShortUrl({
  longUrl: 'https://shlink.io',
  customSlug: 'shlink',
  maxVisits: 1000,
  validSince: '2022-05-01T00:00:00+01:00'
});

console.log(`Short URL: ${shortUrl.shortUrl}`);
console.log(`Long URL: ${shortUrl.longUrl}`);
```

### Delete short URL

```ts
const apiClient = new ShlinkApiClient(...);
await apiClient.deleteShortUrl({ shortCode: 'abc123', domain: 's.test' });
```

### Edit short URL

```ts
const apiClient = new ShlinkApiClient(...);
const shortUrl = await apiClient.editShortUrl(
  { shortCode: 'abc123', domain: 's.test' },
  {
    crawlable: true,
    maxVisits: 2000,
    title: null,
    tags: ['videogames', 'ai'],
  }
);
```
