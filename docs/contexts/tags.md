# Tags

All methods to consume the API's [Tags](https://api-spec.shlink.io/#/Tags) context are available in the `ShlinkApiClient`.

### List tags

```ts
const apiClient = new ShlinkApiClient(...);
const tags = await apiClient.listTags();

tags.data.forEach((tag) => console.log(tag));
```

### List tags with stats

```ts
const apiClient = new ShlinkApiClient(...);
const tagsStats = await apiClient.tagsStats();

tagsStats.data.forEach((tagStats) => {
  console.log(tagStats.tag);
  console.log(tagStats.shortUrlsCount);
  console.log(tagStats.visitsSummary.total);
});
```

### Rename tag

```ts
const apiClient = new ShlinkApiClient(...);
await apiClient.editTag({ oldName: 'games', newName: 'videogames' });
```

### Delete tag

```ts
const apiClient = new ShlinkApiClient(...);
await apiClient.deleteTags(['foo', 'bar']);
```
