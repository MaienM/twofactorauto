import _ from 'lodash';
import { createHmac } from 'crypto';
import * as buf from '../utils/buffer';

/* eslint-disable no-bitwise */

/**
 * Implementation of RFC 4226 (HOTP: An HMAC-Based One-Time Password Algorithm)
 *
 * Translation of terms from the RFC:
 *   K:     secret
 *   C:     counter
 *   Digit: length
 */

// Depending on the used algorithm the secret should be of a certain size
const SECRET_SIZE = {
	sha1: 20,
	sha256: 32,
	sha512: 64,
};

/**
 * Implementation of RFC 4226 (HOTP: An HMAC-Based One-Time Password Algorithm)
 *
 * @param {object} options - The options
 * @param {string|buffer} options.secret - The secret that is used to generate the token
 * @param {number} options.counter - The OTP counter
 * @param {string} options.algorithm - The algorithm to use. Default is sha1
 * @param {number} options.length - The length of the generated token
 * @return {string} - The generated token
 */
export default ({ secret, counter, algorithm = 'sha1', length, ...rest }) => {
	if (!secret) {
		throw new Error('Invalid secret');
	}
	if (!_.isNumber(counter) || counter < 0) {
		throw new Error(`Invalid counter ${counter}`);
	}
	if (!_.isNumber(length) || length < 1) {
		throw new Error(`Invalid length ${length}`);
	}
	if (!_(rest).keys().isEmpty()) {
		throw new Error(`Unexpected options ${_.keys(rest)}`);
	}

	// Convert the secret to a buffer
	let bSecret = buf.fromString(secret);

	// If needed, repeat the secret buffer to be of the size expected by the hashing algorithm
	const secretSize = SECRET_SIZE[algorithm.toLowerCase()];
	if (secretSize) {
		bSecret = buf.padEnd(bSecret, secretSize, bSecret);
	} else {
		console.warn(`Unknown algorithm ${algorithm}, this may not work as expected`); // eslint-disable-line no-console
	}

	// Convert the counter to an 8 byte buffer
	const bCounter = buf.padStart(buf.fromInt(counter), 8);

	// Create the HMAC hash
	const bHmac = createHmac(algorithm, bSecret).update(bCounter).digest();

	// Determine the offset of the part to be used by looking at the last 4 bits
	const offset = _.last(bHmac) & 0x0F;

	// Get the part to use
	const bToken = bHmac.slice(offset, offset + 4);

	// The leftmost (most significant) bit has to be ignored
	bToken[0] &= 0x7F;

	// To determine the token convert the token buffer to an integer, take the rightmost ${length} digits (effectively
	// doing modulo 10^length), and finally pad with 0 from the left as needed
	return _.padStart(buf.toInt(bToken).toString(10).substr(-length), length, '0');
};

