import _ from 'lodash';

/**
 * Convert a string into a buffer.
 */
export const fromString = (str) => new Buffer(str);

/**
 * Convert a string representing a hexadecimal number to a buffer.
 *
 * The string should not start with 0x.
 */
export const fromHex = (hex) => new Buffer(_.padStart(hex, Math.ceil(hex.length / 2.0) * 2, '0'), 'hex');

/**
 * Convert a number to a buffer.
 */
export const fromInt = (num) => fromHex(num.toString(16));

/**
 * Convert a buffer into a string representing a hexadecimal number.
 *
 * The string will not start with 0x.
 */
export const toHex = (buf) => _.map(buf, (b) => _.padStart(b.toString('16'), 2, '0')).join('');

/**
 * Convert a buffer into a number.
 */
export const toInt = (buf) => parseInt(toHex(buf), 16);

// Create a buffer to use for padding
const getPad = (size, pad = [0]) => _.flatten(_.times((size / pad.length) + 1, () => [...pad])).slice(0, size);

/**
 * Pad a buffer on the left side if it's shorter than size.
 *
 * The padding buffer is trunctated if needed.
 *
 * Like lodash's padStart, but then for buffers.
 */
export const padStart = (buf, size, pad) => new Buffer([...getPad(size - buf.length, pad), ...buf]);

/**
 * Pad a buffer on the right side if it's shorter than size.
 *
 * The padding buffer is trunctated if needed.
 *
 * Like lodash's padStart, but then for buffers.
 */
export const padEnd = (buf, size, pad) => new Buffer([...buf, ...getPad(size - buf.length, pad)]);

