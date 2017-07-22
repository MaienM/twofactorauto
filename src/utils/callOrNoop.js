import _ from 'lodash';

/**
 * A method that when given a list of arguments, either calls the first argument with the rest of the arguments as...
 * well, arguments, or returns the first argument if it is not callable.
 */
export default (callableMaybe, ...args) => (_.isFunction(callableMaybe) ? callableMaybe(...args) : callableMaybe);

