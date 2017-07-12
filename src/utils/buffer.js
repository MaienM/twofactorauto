import { Buffer } from 'buffer';
import _ from 'lodash';

/**
 * Convert a string into a buffer.
 */
export const fromString = (str) => Buffer.from(str, 'utf8');

/**
 * Convert a base64 encoded string to a buffer.
 */
export const fromBase64 = (str) => {
	const buf = Buffer.from(str, 'base64');
	// In case of a not entirely valid base64 string buffer will just ignore the parts that are not valid
	// Check whether encoding back to base64 yield the input back to make sure this did not happen
	if (buf.toString('base64') !== str) {
		return null;
	}
	return buf;
};

/**
 * Convert a string representing a hexadecimal number to a buffer.
 *
 * The string should not start with 0x.
 */
export const fromHex = (hex) => Buffer.from(_.padStart(hex, Math.ceil(hex.length / 2.0) * 2, '0'), 'hex');

/**
 * Convert a number to a buffer.
 */
export const fromInt = (num) => fromHex(num.toString(16));

/**
 * Convert a buffer into a base64 encoded string.
 */
export const toBase64 = (buf) => Buffer.from(buf).toString('base64');

/**
 * Convert a buffer into a string representing a hexadecimal number.
 *
 * The string will not start with 0x.
 */
export const toHex = (buf) => Buffer.from(buf).toString('hex');

/**
 * Convert a buffer into a number.
 */
export const toInt = (buf) => parseInt(toHex(buf), 16);

// Create a buffer to use for padding
const getPad = (size, pad = [0]) => Buffer.concat(_.times((size / pad.length) + 1, () => Buffer.from(pad)), size);

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

