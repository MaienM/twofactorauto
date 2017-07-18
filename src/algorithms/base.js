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
	 *
	 * @params {Object} options - The options
	 */
	constructor() {}

	/**
	 * This method should generate a one-time password based on the options passed to the constructor + the options
	 * passed to this method.
	 *
	 * Any unrecognized options should result in an error.
	 *
	 * @params {Object} options - The options
	 * @return {String} - The generated OTP
	 */
	generate() {
		throw new Error('Not implemented');
	}

	/**
	 * This method should return an object that, when passed to the constructor, will result in a new instance of this
	 * algorithm that has the same state as this one.
	 *
	 * This object should be json serializable.
	 *
	 * @return {Object} - The options needed to create a new instance of this algorithm
	 */
	persist() {
		throw new Error('Not implemented');
	}
}

/* eslint-enable */

