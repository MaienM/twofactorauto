import _ from 'lodash';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { REHYDRATE } from 'redux-persist';

// Convert a storage class to a redux-persist compatible storage provider
const handleCallback = (callback) => ([
	(data) => callback(null, data),
	(error) => callback(error, null),
]);
export const toReduxPersistStorage = (sClass) => ({
	getAllKeys: (callback) => sClass.list().then(...handleCallback(callback)),
	getItem: (key, callback) => sClass.get(key).then(...handleCallback(callback)),
	setItem: (key, value, callback) => sClass.set(key, value).then(...handleCallback(callback)),
	removeItem: (key, callback) => sClass.remove(key).then(...handleCallback(callback)),
});

/**
 * A class that that handle multiple redux-persist stores with different settings/storage methods.
 */
export class MultiPersister {
	/**
	 * Create a new MultiPersister.
	 *
	 * @param {Object} config - The config of the MultiPersister. The keys are the reducer names, and the values the
	 *   per-reducer configs.
	 * @param {Object} config.example - The config for the reducer with name 'example'.
	 * @param {Object} config.example.key - The key to use for this reducer. Default will be the name of the reducer
	 *   ('example' in this case). Keys should be unique for the given storage method.
	 * @param {Object} config.example.storage - The storage method to use for this reducer.
	 */
	constructor(config) {
		this.config = _.mapValues(config, (c, key) => {
			if (!c) {
				return null;
			}
			if (!c.storage) {
				throw new Error(`Invalid storage for ${key}`);
			}

			return {
				stateReconciler: autoMergeLevel2,
				debug: true,
				key,
				...c,
			};
		});
	}

	/**
	 * Process all reducers to be persisted using the settings of this MultiPersister.
	 *
	 * This replaces persistCombineReducers of redux-persist.
	 *
	 * @params {Object} reducers - The key-value map of the reducers. The keys are the reducer names as used in the
	 *   config given to the constructor, and the values are the reducers.
	 * @return {Object} An object in the same format as the input, but with all reducers that should be persisted
	 *   prepared for this.
	 */
	processReducers(reducers) {
		return _.mapValues(reducers, (reducer, key) => {
			const config = this.config[key];
			return config ? persistReducer(config, reducer) : reducer;
		});
	}

	/**
	 * Start the persistence of the store.
	 *
	 * This replaces persistStore of redux-persist.
	 *
	 * @params {Object} store - The Redux store, using reducers processed by processReducers.
	 */
	async persistStore(store, ...args) {
		return persistStore(store, ...args);
	}
}

