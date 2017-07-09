import _ from 'lodash';
import hotp from './hotp';

/**
 * Implementation of RFC 6238 (TOTP: Time-Based One-Time Password Algorithm).
 *
 * Translation of terms from the RFC:
 *   K:  secret
 *   C:  length
 *   T0: tStart
 *   X:  tInterval
 */

/**
 * Implementation of RFC 6238 (TOTP: Time-Based One-Time Password Algorithm).
 *
 * @param {object} options - The options
 * @param {string|buffer} options.secret - The secret that is used to generate the token
 * @param {number} options.tStart - The timestamp to start counting at. Default is epoch (0)
 * @param {number} options.tInterval - The time step in seconds. Default is 30
 * @param {number} options.tinterval - The timestamp to generate a token for. Default is the current timestamp
 * @param {string} options.algorithm - The algorithm to use. Default is sha1
 * @param {number} options.length - The length of the generated token
 * @return {string} - The generated token
 */
export default ({ secret, tStart = 0, tInterval = 30, timestamp = Date.now(), algorithm, length, ...rest }) => {
	if (!_.isNumber(tStart)) {
		throw new Error(`Invalid tStart ${tStart}`);
	}
	if (!_.isNumber(tInterval) || tInterval <= 0) {
		throw new Error(`Invalid tInterval ${tInterval}`);
	}
	if (!_(rest).keys().isEmpty()) {
		throw new Error(`Unexpected options ${_.keys(rest)}`);
	}

	const counter = Math.floor(((timestamp / 1000) - tStart) / tInterval);
	return hotp({ secret, counter, algorithm, length });
};

