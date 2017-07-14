import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
import { Home, AddEntry, EditEntry } from './screens';
import { persistStore, autoRehydrate, toReduxPersistStorage } from './utils/persist';
import * as storage from './utils/storage';

// Setup the Redux store
const store = createStore(
	rootReducer,
	undefined,
	compose(
		applyMiddleware(),
		autoRehydrate(),
	),
);

// Add the storage backends
const TRANSIENT_STORES = [];
const SECURE_STORES = ['secrets'];
persistStore(store, [
	{
		blacklist: [...TRANSIENT_STORES, ...SECURE_STORES],
		storage: toReduxPersistStorage(storage.Normal),
	}, {
		whitelist: SECURE_STORES,
		storage: toReduxPersistStorage(storage.Secure),
	},
]);

// Setup the navigator
const Navigator = StackNavigator({
	Home: { screen: Home },
	AddEntry: { screen: AddEntry },
	EditEntry: { screen: EditEntry },
});

// Build the main component
export default () => (
	<Provider store={store}>
		<Navigator />
	</Provider>
);

