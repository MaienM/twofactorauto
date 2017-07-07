import _ from 'lodash';
import { createHmac } from 'crypto';

/**
 * Implementation of RFC 4226 (HOTP: An HMAC-Based One-Time Password Algorithm)
 *
 * Translation of terms from the RFC:
 *   K:     secret
 *   C:     counter
 *   Digit: length
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

	// Convert the inputs to buffers
	const bSecret = new Buffer(secret);
	const bCounter = new Buffer(_.padStart(counter.toString(16), 16, '0'), 'hex');

	// Create the HMAC hash
	const hmac = createHmac(algorithm, bSecret).update(bCounter).digest('hex');

	// Only part of the hash is used. The part to be used is determined by
	// interpreting the last character of the hash as a hexadecimal number
	const offset = parseInt(_.last(hmac), 16);
	const truncated = hmac.substr(offset * 2, 8);

	// Set the first (most significant) bit to 0
	const sigbit = (parseInt(truncated, 16) & 0x7fffffff).toString(); // eslint-disable-line no-bitwise

	// Use the rightmost ${length} characters (taking care of the modulo part of
	// the algorithm), 0 padding from the left if needed
	return _.padStart(sigbit.substr(sigbit.length - length), length, '0');
};

