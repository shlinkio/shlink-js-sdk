import { queryParamsToString, replaceAuthorityFromUri } from '../../../src/api/utils';

describe('replaceAuthorityFromUri', () => {
  it('throws when it is not possible to infer authority from provided URI', () => {
    expect(() => replaceAuthorityFromUri('invalid', '')).toThrowError(
      'It is not possible to determine authority on "invalid" for replacement',
    );
  });

  it.each([
    ['https://old-authority.test/foo/bar', 'https://new-one.test/foo/bar'],
    ['https://old-authority.test', 'https://new-one.test'],
    ['http://old-authority.test', 'http://new-one.test'],
  ])('replaces provided authority from URI', (uri, expectedResult) => {
    expect(replaceAuthorityFromUri(uri, 'new-one.test')).toEqual(expectedResult);
  });
});

describe('queryParamsToString', () => {
  it.each([
    [{}, ''],
    [{ foo: null, bar: undefined }, ''],
    [{ foo: 'bar' }, 'foo=bar'],
    [{ foo: 'bar', baz: '123', something: null }, 'foo=bar&baz=123'],
    [{ bar: 'foo', list: ['one', 'two'] }, encodeURI('bar=foo&list[]=one&list[]=two')],
    [{ firstParam: 123, secondParam: 345 }, encodeURI('firstParam=123&secondParam=345')],
  ])('stringifies query params as expected', (queryObj, expectedResult) => {
    expect(queryParamsToString(queryObj)).toEqual(expectedResult);
  });
});
