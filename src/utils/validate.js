import _ from 'lodash';

/**
 * An helper method to easily fail when a method receives any superfluous options.
 */
export const requireEmpty = (options) => {
	if (!_(options).keys().isEmpty()) {
		throw new Error(`Unexpected options ${_.keys(options)}`);
	}
};

/**
 * An helper method to require exactly one of the passed options to be set.
 */
export const requireOneOf = (options) => {
	const nonEmpty = _(options)
		.toPairs()
		.filter((e) => e[1])
		.map(0)
		.value();
	if (nonEmpty.length !== 1) {
		throw new Error(`Must have exactly one of ${_.keys(options).join(', ')}, received ${nonEmpty.join(', ')}`);
	}
	return nonEmpty[0];
};

