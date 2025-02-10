# Visits

All methods to consume the API's [Visits](https://api-spec.shlink.io/#/Visits) context are available in the `ShlinkApiClient`.

### Visits overview

```ts
const apiClient = new ShlinkApiClient(...);
const overview = await apiClient.getVisitsOverview();

console.log(`Non-orphan visits: ${overview.nonOrphanVisits.total}`);
console.log(`Orphan visits: ${overview.orphanVisits.total}`);
```

### Visits by short URL

```ts
const apiClient = new ShlinkApiClient(...);
const shortUrlVisits = await apiClient.getShortUrlVisits({ shortCode: 'abc123' });

shortUrlVisits.data.forEach((visit) => {
  console.log(visit.referer);
  console.log(visit.userAgent);
  console.log(visit.date);
  console.log(visit.visitedUrl);
  console.log(visit.redirectUrl);
});
console.log(shortUrlVisits.pagination);
```

You can also specify some filters for the list:

```ts
const apiClient = new ShlinkApiClient(...);
const shortUrlVisits = await apiClient.getShortUrlVisits(
  { shortCode: 'abc123' },
  {
    excludeBots: true,
    startDate: '2022-01-01T00:00:00+00:00',
  }
);

shortUrlVisits.data.forEach((visit) => {
  console.log(visit);
});
```

### Visits by Tag

```ts
const apiClient = new ShlinkApiClient(...);
const tagVisits = await apiClient.getTagVisits('videogames');

tagVisits.data.forEach((visit) => {
  console.log(visit.referer);
  console.log(visit.userAgent);
  console.log(visit.date);
  console.log(visit.visitedUrl);
  console.log(visit.redirectUrl);
});
console.log(tagVisits.pagination);
```

You can also specify some filters for the list:

```ts
const apiClient = new ShlinkApiClient(...);
const tagVisits = await apiClient.getTagVisits('videogames', {
  excludeBots: true,
  startDate: '2022-01-01T00:00:00+00:00',
});

tagVisits.data.forEach((visit) => {
  console.log(visit);
});
```

### Visits by Domain

```ts
const apiClient = new ShlinkApiClient(...);
const domainVisits = await apiClient.getDomainVisits('example.com');

domainVisits.data.forEach((visit) => {
  console.log(visit.referer);
  console.log(visit.userAgent);
  console.log(visit.date);
  console.log(visit.visitedUrl);
  console.log(visit.redirectUrl);
});
console.log(domainVisits.pagination);
```

You can also specify some filters for the list:

```ts
const apiClient = new ShlinkApiClient(...);
const domainVisits = await apiClient.getDomainVisits('example.com', {
  excludeBots: true,
  startDate: '2022-01-01T00:00:00+00:00',
});

domainVisits.data.forEach((visit) => {
  console.log(visit);
});
```

> If you want to get visits for default domain, use `DEFAULT` as the domain.

### Orphan visits

```ts
const apiClient = new ShlinkApiClient(...);
const orphanVisits = await apiClient.getOrphanVisits();

orphanVisits.data.forEach((visit) => {
  console.log(visit.referer);
  console.log(visit.userAgent);
  console.log(visit.date);
  console.log(visit.visitedUrl);
  console.log(visit.redirectUrl);
});
console.log(orphanVisits.pagination);
```

### Non-orphan visits

```ts
const apiClient = new ShlinkApiClient(...);
const nonOrphanVisits = await apiClient.getNonOrphanVisits();

nonOrphanVisits.data.forEach((visit) => {
  console.log(visit.referer);
  console.log(visit.userAgent);
  console.log(visit.date);
  console.log(visit.visitedUrl);
  console.log(visit.redirectUrl);
});
console.log(nonOrphanVisits.pagination);
```

You can also specify some filters for the list:

```ts
const apiClient = new ShlinkApiClient(...);
const nonOrphanVisits = await apiClient.getNonOrphanVisits({
  excludeBots: true,
  startDate: '2022-01-01T00:00:00+00:00',
});

nonOrphanVisits.data.forEach((visit) => {
  console.log(visit);
});
```

### Delete orphan visits

```ts
const apiClient = new ShlinkApiClient(...);
const result = await apiClient.deleteOprhanVisits();

console.log(result.deletedVisits);
```

### Delete short URL visits

```ts
const apiClient = new ShlinkApiClient(...);
const result = await apiClient.deleteShortUrlVisits({
  shortCode: 'abc123',
  domain: 'example.com',
});

console.log(result.deletedVisits);
```
