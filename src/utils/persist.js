import _ from 'lodash';
import * as JSON from './json';

/**
 * A storage engine is what is responsible for storing data using redux-persist.
 *
 * This class is added for documentation purposes only, all external storage engines do not subclass it.
 */
class Storage {
	/**
	 * Get a stored value.
	 *
	 * @abstract
	 * @param {string} key - The key that the value is stored under.
	 * @return {string} The stored value.
	 */
	async getItem(key) {
		throw new Error('Not implemented');
	}

	/**
	 * Store a value.
	 *
	 * @abstract
	 * @param {string} key - The key that the value should be stored under.
	 * @param {string} value - The value to store.
	 */
	async setItem(key) {
		throw new Error('Not implemented');
	}

	/**
	 * Remove a stored value.
	 *
	 * @abstract
	 * @param {string} key - The key that the value is stored under.
	 */
	async removeItem(key) {
		throw new Error('Not implemented');
	}
}

/**
 * Prepend something to all keys in a list of pairs.
 */
const prependToPairKey = (pairs, prepend) => _.map(pairs, ([k, v]) => [`${prepend}${k}`, v]);

/**
 * A version of lodash's toPairs that recurses through objects.
 */
const toPairsIn = (object, parentKey) => {
	if (!_.isObject(object)) {
		return [[parentKey, object]];
	}
	return _(object)
		.toPairs()
		.map(([k, v]) => prependToPairKey(toPairsIn(v, k), parentKey ? `${parentKey}.` : ''))
		.flatten()
		.value();
};

/**
 * A version of lodash's fromPairs that recurses through objects.
 */
const fromPairsIn = (pairs) => {
	const object = {};
	_.each(pairs, ([k, v]) => _.set(object, k, v));
	return object;
}

/**
 * Helper to require the root object of each storage key to be an object.
 *
 * @param {*} data - The data to validate.
 */
const requireObject = (data) =>  {
	if (!_.isObject(data)) {
		throw new Error('Root storage object must be an object, not a scalar value');
	}
};

/**
 * Parse the data from the storage to an object.
 *
 * @param {string} data - The string data.
 * @return {Object} The data as an object.
 */
export const fromStorage = (data) => _.chain(data)
	.thru(JSON.parse)
	.tap(requireObject)
	.mapValues(JSON.parse) // The root object's values are also JSONified, for some reason
	.value();

/**
 * Convert the data from an object into a string for storage.
 *
 * @param {Object} data - The data as an object.
 * @return {string} The string data.
 */
export const toStorage = (data) => _.chain(data)
	.tap(requireObject)
	.mapValues(JSON.stringify) // The root object's values are also JSONified, for some reason
	.thru(JSON.stringify)
	.value();

/**
 * A class that that combines multiple redux-persist storage engines into a single one, spreading the data.
 */
export class MultiStorage extends Storage {
	/**
	 * Create a new MultiStorage.
	 *
	 * @param {Object<string,Storage>} storageEngines - The storage engines to be used. Keys are the names, values the engines.
	 * @param {Array<Object>} rules - The rules used to determine which storage engine to use.
	 * @param {RegExp|Function} rules.match - A regular expression matching the paths of the data that should match this
	 *   rule, or a function that receives a path and returns a truthy value if the path should match this rule.
	 * @param {string} rules.storage - The name of the storage engine to use for data matching this rule, or null to not
	 *   persist such data.
	 */
	constructor(storageEngines, rules) {
		super();
		_.each(storageEngines, (storage, key) => {
			if (!_.every([storage.getItem, storage.setItem, storage.removeItem], _.isFunction)) {
				throw new Error(`Invalid value for storageEngines.${key}`);
			}
		});
		this.storageEngines = storageEngines;
		this.rules = _.chain(rules)
			.map((rule, i) => {
				const { match } = rule;
				if (match instanceof RegExp) {
					return {
						...rule,
						match: match.test.bind(match),
					};
				} else if (!_.isFunction(match)) {
					throw new Error(`Invalid value for rules.${i}.match`);
				} else {
					return rule;
				}
			})
			.each((rule, i) => {
				const { storage } = rule;
				if (storage && !this.storageEngines[storage]) {
					throw new Error(`Invalid value for rules.${i}.storage`);
				}
			})
			.value();
	}

	/**
	 * Given a path, get the first rule that matches it.
	 *
	 * @param {String} path - The path to get a rule for.
	 */
	getRule(path) {
		return _.find(this.rules, (rule) => rule.match(path));
	}

	async getItem(key) {
		// Get the data from each storage
		const data = await _.chain(this.storageEngines)
			.values()
			.map(async (storage) => await storage.getItem(key))
			.thru(Promise.all.bind(Promise))
			.value();
		// Combine the data
		return _.chain(data)
			.filter()
			.map(fromStorage)
			.reduce(_.merge)
			.thru(toStorage)
			.value();
	}

	async setItem(key, value) {
		await _.chain(value)
			// Convert the string value to a list of key-value pairs
			.thru(fromStorage)
			.thru(toPairsIn)
			// Determine the storage to use for each of these pairs
			.map(([k, v]) => {
				const rule = this.getRule(k);
				return {
					data: [k, v],
					storage: rule && rule.storage || null,
				};
			})
			.filter('storage')
			// Create a single object for each storage
			.groupBy('storage')
			.mapValues(_.partial(_.map, _, 'data'))
			.mapValues(fromPairsIn)
			// Store each of these objects in the corresponding storage
			.mapValues(toStorage)
			.map(async (data, name) => await this.storageEngines[name].setItem(key, data))
			// Create a combined promise to await
			.thru(Promise.all.bind(Promise))
			.value();
	}

	async removeItem(key) {
		await _.chain(this.storageEngines)
			.values()
			.map(async (storage) => await storage.removeItem(key))
			.thru(Promise.all.bind(Promise))
			.value();
	}
}

/**
 * A storage engine that logs all calls, and forwards them to another storage engine.
 */
export class LoggingStorage extends Storage {
	/**
	 * Create an instance of LoggingStorage.
	 *
	 * @param {Storage} storage - The storage engine to forward calls to.
	 * @param {string} prefix - The prefix to add to the log messages.
	 */
	constructor(storage, prefix) {
		super();
		this.storage = storage;
		this.prefix = prefix;
	}

	async getItem(key) {
		const data = await this.storage.getItem(key);
		console.log(this.prefix, 'getItem', key, fromStorage(data));
		return data;
	}

	async setItem(key, value) {
		console.log(this.prefix, 'setItem', key, fromStorage(value));
		return await this.storage.setItem(key, value);
	}

	async removeItem(key) {
		console.log(this.prefix, 'removeItem', key);
		return await this.storage.removeItem(key);
	}
}

