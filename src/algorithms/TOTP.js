import _ from 'lodash';
import { rejectExtra } from './base';
import HOTP from './HOTP';

/**
 * Implementation of RFC 6238 (TOTP: Time-Based One-Time Password Algorithm).
 *
 * Translation of terms from the RFC:
 *   K:  secret
 *   C:  length
 *   T0: tStart
 *   X:  tInterval
 */
export default class TOTP extends HOTP {
	/**
	 * @param {object} options - The options
	 * @param {string|buffer} options.secret - The secret that is used to generate the token
	 * @param {number} options.tStart - The timestamp to start counting at. Default is epoch (0)
	 * @param {number} options.tInterval - The time step in seconds. Default is 30
	 * @param {string} options.digest - The digest algorithm to use. Default is sha1
	 * @param {number} options.length - The length of the generated token
	 */
	constructor({ secret, tStart = 0, tInterval = 30, digest, length, ...rest }) {
		super({ secret, digest, length, counter: 0 });
		rejectExtra(rest);
		if (!_.isNumber(tStart)) {
			throw new Error(`Invalid tStart ${tStart}`);
		}
		if (!_.isNumber(tInterval) || tInterval <= 0) {
			throw new Error(`Invalid tInterval ${tInterval}`);
		}

		this.tStart = tStart;
		this.tInterval = tInterval;
	}

	/**
	 * @param {object} options - The options
	 * @param {number} options.timestamp - The timestamp to generate a token for. Default is the current timestamp
	 * @return {string} - The generated token
	 */
	generate({ timestamp = Date.now(), ...rest } = {}) {
		rejectExtra(rest);
		if (!_.isNumber(timestamp) && !_.isDate(timestamp)) {
			throw new Error(`Invalid timestamp ${timestamp}`);
		}

		const counter = Math.floor(((timestamp / 1000) - this.tStart) / this.tInterval);
		return super.generate({ counter });
	}

	persist() {
		return _.omit(super.persist(), 'counter');
	}
}

