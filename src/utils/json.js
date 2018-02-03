import _ from 'lodash';

const ERROR_CONTEXT_LENGTH = 10;
const ERROR_CONTEXT_CUTOFF_SYMBOL = '...';
const ERROR_CONTEXT_CUTOFF_TRESHOLD = ERROR_CONTEXT_LENGTH + ERROR_CONTEXT_CUTOFF_SYMBOL.length;

// Re-export stringify to make it easier to use this module.
export const stringify = JSON.stringify;

// A version of JSON.parse that does not choke on undefined.
export const parse = (input) => {
	if (input === undefined) {
		return undefined;
	}
	try {
		return JSON.parse(input);
	} catch (e) {
		// Get the position
		const pos = _.chain(e.message)
			.split(' ')
			.last()
			.toNumber()
			.value();
		let offset = pos;
		let context = input;
		// Add suffix if needed
		if (input.length > (offset + ERROR_CONTEXT_CUTOFF_TRESHOLD)) {
			context = `${_.slice(context, 0, offset + ERROR_CONTEXT_LENGTH).join('')}${ERROR_CONTEXT_CUTOFF_SYMBOL}`;
		}
		// Add prefix if needed
		if (offset > ERROR_CONTEXT_CUTOFF_TRESHOLD) {
			context = `${ERROR_CONTEXT_CUTOFF_SYMBOL}${_.slice(context, pos - ERROR_CONTEXT_LENGTH).join('')}`;
			offset = ERROR_CONTEXT_CUTOFF_TRESHOLD;
		}
		// Add the parsed string + context of where the failure happened to the message
		e.message = `${e.message}\n${context}\n${_.repeat(' ', offset)}^`;
		throw e;
	}
};

