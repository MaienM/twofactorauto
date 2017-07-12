import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, autoRehydrate, toReduxPersistStorage } from './utils/persist';
import * as storage from './utils/storage';
import rootReducer from './reducers';
import Home from './screens/Home';
import AddEntry from './screens/AddEntry';

// Setup the Redux store
const store = createStore(
	rootReducer,
	undefined,
	composeWithDevTools(
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
});

// Build the main component
export default () => (
	<Provider store={store}>
		<Navigator />
	</Provider>
);

