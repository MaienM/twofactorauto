import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import { persistCombineReducers, persistStore } from 'redux-persist';
import asyncStorage from 'redux-persist/lib/storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import ReduxNavigator from './components/navigation/ReduxNavigator';
import { actions } from './constants';
import * as reducers from './reducers';
import { MultiStorage } from './utils/persist';

// Create a storage for redux-persist that spreads the storage out over multiple storage backends
const storage = new MultiStorage(
	{
		'normal': asyncStorage,
		'sensitive': createSensitiveStorage(),
	},
	[
		{
			match: /^navigation/,
			storage: null,
		},
		{
			match: /^entries\.[^.]*\.secrets/,
			storage: 'sensitive',
		},
		{
			match: () => true,
			storage: 'normal',
		},
	],
);

// Combine the reducers
const persistConfig = {
	key: 'primary',
	storage: storage,
};
const appReducer = persistCombineReducers(persistConfig, reducers);
const rootReducer = (state, action) => {
	let appState = state;
	if (action.type === actions.reset) {
		appState = undefined;
	}

	return appReducer(appState, action);
};

// Setup the Redux store
const store = createStore(
	rootReducer,
	undefined,
	compose(
		applyMiddleware(),
	),
);

// Start persistence
persistStore(store);

// Build the main component
export default () => (
	<Provider store={store}>
		<ReduxNavigator />
	</Provider>
);

