import * as buf from './buffer';

/**
 * fromHex
 */

test('fromHex should work for a valid hexadecimal string', () => {
	expect([...buf.fromHex('EF')]).toEqual([239]);
});

test('fromHex should work for a larger hexadecimal string', () => {
	expect([...buf.fromHex('ABCDEF')]).toEqual([171, 205, 239]);
});

test('fromHex should work for a single character hexadecimal string', () => {
	expect([...buf.fromHex('F')]).toEqual([15]);
});

test('fromHex should work for an odd amount of characters', () => {
	expect([...buf.fromHex('DEF')]).toEqual([13, 239]);
});

/**
 * fromInt
 */

test('fromInt should work for a single byte number', () => {
	expect([...buf.fromInt(10)]).toEqual([10]);
});

test('fromInt should work for a multi byte number', () => {
	expect([...buf.fromInt(300)]).toEqual([1, 44]);
});

/**
 * toHex
 */

test('toHex should work for a single byte number', () => {
	expect(buf.toHex([50])).toBe('32');
});

test('toHex should work for a single byte number that needs padding', () => {
	expect(buf.toHex([5])).toBe('05');
});

test('toHex should work for a multi byte number', () => {
	expect(buf.toHex([117, 48])).toBe('7530');
});

test('toHex should work for a multi byte number that needs padding', () => {
	expect(buf.toHex([4, 5])).toBe('0405');
});

/**
 * toInt
 */

test('toInt should work for a single byte number', () => {
	expect(buf.toInt([10])).toBe(10);
});

test('toInt should work for a multi byte number', () => {
	expect(buf.toInt([1, 44])).toBe(300);
});

/**
 * padStart
 */

test('padStart should pad correctly', () => {
	expect([...buf.padStart([1, 2, 3], 6, [0])]).toEqual([0, 0, 0, 1, 2, 3]);
});

test('padStart should default to paddign with 0', () => {
	expect([...buf.padStart([1, 2, 3], 4)]).toEqual([0, 1, 2, 3]);
});

test('padStart should not do anything if the buffer is the correct length', () => {
	expect([...buf.padStart([1, 2, 3], 3)]).toEqual([1, 2, 3]);
});

test('padStart should not do anything if the buffer longer than requested', () => {
	expect([...buf.padStart([1, 2, 3], 2)]).toEqual([1, 2, 3]);
});

test('padStart should work with multi-byte padding', () => {
	expect([...buf.padStart([1, 2, 3], 5, [9, 0])]).toEqual([9, 0, 1, 2, 3]);
});

test('padStart should truncate the padding if needed', () => {
	expect([...buf.padStart([1, 2, 3], 6, [9, 0])]).toEqual([9, 0, 9, 1, 2, 3]);
});

/**
 * padEnd
 */

test('padEnd should pad correctly', () => {
	expect([...buf.padEnd([1, 2, 3], 6, [0])]).toEqual([1, 2, 3, 0, 0, 0]);
});

test('padEnd should default to paddign with 0', () => {
	expect([...buf.padEnd([1, 2, 3], 4)]).toEqual([1, 2, 3, 0]);
});

test('padEnd should not do anything if the buffer is the correct length', () => {
	expect([...buf.padEnd([1, 2, 3], 3)]).toEqual([1, 2, 3]);
});

test('padEnd should not do anything if the buffer longer than requested', () => {
	expect([...buf.padEnd([1, 2, 3], 2)]).toEqual([1, 2, 3]);
});

test('padEnd should work with multi-byte padding', () => {
	expect([...buf.padEnd([1, 2, 3], 5, [9, 0])]).toEqual([1, 2, 3, 9, 0]);
});

test('padEnd should truncate the padding if needed', () => {
	expect([...buf.padEnd([1, 2, 3], 6, [9, 0])]).toEqual([1, 2, 3, 9, 0, 9]);
});

