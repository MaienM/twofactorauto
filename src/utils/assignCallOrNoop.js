import _ from 'lodash';
import callOrNoop from './callOrNoop';

/**
 * A method to make it easier to expand a value that can either be a function or an object.
 */
export default (...items) => (
	_.some(items, _.isFunction)
		? (...args) => _.assign({}, ..._.map(items, (i) => callOrNoop(i, ...args)))
		: _.assign({}, ...items)
);

