import _ from 'lodash';
import { getStoredState, createPersistor } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';

export { autoRehydrate } from 'redux-persist';

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

const getStoredStatePromise = (store, config) => new Promise((resolve, reject) => {
	getStoredState(config, (error, state) => (error ? reject(error) : resolve(state)));
});
export const persistStore = (store, configs) => {
	// Create a persistor for each of the configs
	const persistors = _.map(configs, (c) => {
		const persistor = createPersistor(store, c);
		persistor.pause();
		return persistor;
	});

	// Fetch data of all configs
	return Promise.all(_.map(configs, (c) => (
		getStoredStatePromise(store, c)
			// Apply whitelist and blacklist
			.then((state) => (c.whitelist ? _.pick(state, c.whitelist) : state))
			.then((state) => (c.blacklist ? _.omit(state, c.blacklist) : state))
	)))
		.then((states) => {
			// Dispatch a single rehydrate action
			store.dispatch({
				type: REHYDRATE,
				payload: _.merge({}, ...states),
			});

			// Resume all persistors
			_.each(persistors, (p) => p.resume());
		})
		.catch((errors) => {
			throw new Error(errors);
		});
};

