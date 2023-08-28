import { queryParamsToString } from '../../src/api/utils';

describe('utils', () => {
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
});
