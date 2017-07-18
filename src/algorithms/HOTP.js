import { createHmac } from 'crypto';
import _ from 'lodash';
import * as buf from '../utils/buffer';
import { requireEmpty } from '../utils/validate';
import Algorithm from './base';

/* eslint-disable no-bitwise */

/**
 * Implementation of RFC 4226 (HOTP: An HMAC-Based One-Time Password Algorithm)
 *
 * Translation of terms from the RFC:
 *   K:     secret
 *   C:     counter
 *   Digit: length
 */
export default class HOTP extends Algorithm {
	// Depending on the used digest method the secret should be of a certain size
	static SECRET_SIZE = {
		sha1: 20,
		sha256: 32,
		sha512: 64,
	}

	/**
	 * @param {object} options - The options
	 * @param {string|buffer} options.secret - The secret that is used to generate the token
	 * @param {number} options.counter - The OTP counter
	 * @param {string} options.digest - The digest algorithm to use. Default is sha1
	 * @param {number} options.length - The length of the generated token. Default is 6
	 */
	constructor({ secret, counter = 0, digest = 'sha1', length = 6, ...rest }) {
		super(rest);
		requireEmpty(rest);
		if (!secret) {
			throw new Error('Invalid secret');
		}
		if (!_.isNumber(counter) || counter < 0) {
			throw new Error(`Invalid counter ${counter}`);
		}
		if (!_.isNumber(length) || length < 1) {
			throw new Error(`Invalid length ${length}`);
		}

		this.secret = secret;
		this.counter = counter;
		this.digest = digest;
		this.length = length;
	}

	/**
	 * @param {object} options - The options
	 * @param {number} options.counter - The OTP counter. If not specified, the one passed to the constructor will be
	 *   used and incremented
	 * @return {string} - The generated token
	 */
	generate({ counter = this.counter++, ...rest } = {}) {
		if (!_.isNumber(counter) || counter < 0) {
			throw new Error(`Invalid counter ${counter}`);
		}
		requireEmpty(rest);

		// Convert the secret to a buffer
		let bSecret = buf.fromString(this.secret);

		// If needed, repeat the secret buffer to be of the size expected by the digest algorithm
		const secretSize = HOTP.SECRET_SIZE[this.digest.toLowerCase()];
		if (secretSize) {
			bSecret = buf.padEnd(bSecret, secretSize, bSecret);
		} else {
			// eslint-disable-next-line no-console
			console.warn(`Unknown digest ${this.digest}, this may not work as expected`);
		}

		// Convert the counter to an 8 byte buffer
		const bCounter = buf.padStart(buf.fromInt(counter), 8);

		// Create the HMAC hash
		const bHmac = createHmac(this.digest, bSecret).update(bCounter).digest();

		// Determine the offset of the part to be used by looking at the last 4 bits
		const offset = _.last(bHmac) & 0x0F;

		// Get the part to use
		const bToken = bHmac.slice(offset, offset + 4);

		// The leftmost (most significant) bit has to be ignored
		bToken[0] &= 0x7F;

		// To determine the token convert the token buffer to an integer, take the rightmost ${length} digits
		// (effectively doing modulo 10^length), and finally pad with 0 from the left as needed
		return _.padStart(buf.toInt(bToken).toString(10).substr(-this.length), this.length, '0');
	}

	persist() {
		return {
			secret: this.secret,
			counter: this.counter,
			digest: this.digest,
			length: this.length,
		};
	}
}

