import * as validate from './validate';

/**
 * requireEmpty
 */

test('requireEmpty should not throw if passed an empty object', () => {
	validate.requireEmpty({});
});

test('requireEmpty should throw if passed a non-empty object', () => {
	expect(() => validate.requireEmpty({ foo: true, bar: 0 })).toThrow(Error);
});

/**
 * requireOneOf
 */

test('requireOneOf should not throw if passed an object with only one key set', () => {
	validate.requireOneOf({ foo: false, bar: undefined, baz: true });
});

test('requireOneOf should throw if passed an object with no keys set', () => {
	expect(() => validate.requireOneOf({ foo: false, bar: undefined, baz: 0 })).toThrow(Error);
});

test('requireOneOf should throw if passed an object with more than one key set', () => {
	expect(() => validate.requireOneOf({ foo: true, bar: undefined, baz: true })).toThrow(Error);
});

