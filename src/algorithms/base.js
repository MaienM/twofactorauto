import _ from 'lodash';

/**
 * An helper method to easily fail when a method receives any superfluous options.
 */
export const rejectExtra = (options) => {
	if (!_(options).keys().isEmpty()) {
		throw new Error(`Unexpected options ${_.keys(options)}`);
	}
};

/* eslint-disable */

/**
 * Base class for OTP algorithms.
 */
export default class Algorithm {
	/**
	 * The constructor should take an object that specifies all fixed information needed for this algorithm.
	 *
	 * These options should immediately be validated whenever possible.
	 * Any unrecognized options should result in an error.
	 */
	constructor() {
	}

	/**
	 * This method should generate a one-time password based on the options passed to the constructor + the options
	 * passed to this method.
	 *
	 * Any unrecognized options should result in an error.
	 */
	generate() {
		throw new Error('Not implemented');
	}
}

/* eslint-enable */

