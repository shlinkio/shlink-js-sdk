import { apiClient } from '../api-client';

describe('tags', () => {
  it('interacts with tags', async () => {
    const tags = ['foo', 'bar', 'baz'];
    await apiClient.createShortUrl({ longUrl: 'https://example.com', tags });

    // List tags
    const tagsResp = await apiClient.listTags();
    expect(tagsResp.data).toEqual(tags.toSorted((a, b) => a.localeCompare(b)));

    // Edit tag
    await apiClient.editTag({ oldName: 'foo', newName: 'fooRenamed' });
    const tagsRespAfterRenaming = await apiClient.listTags();
    expect(tagsRespAfterRenaming.data).toContain('fooRenamed');
    expect(tagsRespAfterRenaming.data).not.toContain('foo');

    // Delete tags
    await apiClient.deleteTags(tagsRespAfterRenaming.data);
    const tagsAfterDeleting = await apiClient.listTags();
    expect(tagsAfterDeleting.data).toHaveLength(0);
  });
});
