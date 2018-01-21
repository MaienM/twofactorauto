import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import ReduxNavigator from './components/navigation/ReduxNavigator';
import { actions } from './constants';
import * as reducers from './reducers';
import { MultiPersister } from './utils/persist';
import storage from 'redux-persist/lib/storage';

// Process the reducers to be persisted with an appropriate store
const TRANSIENT_STORES = ['navigation'];
const SECURE_STORES = ['secrets'];
const persistConfig = _.mapValues(reducers, (__, key) => {
	if (_.includes(TRANSIENT_STORES, key)) {
		return null;
	} else if (_.includes(SECURE_STORES)) {
		return { storage };
	} else {
		return { storage };
	}
});
const persister = new MultiPersister(persistConfig);
const processedReducers = persister.processReducers(reducers);

// Combine the reducers
const appReducer = combineReducers(processedReducers);
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
persister.persistStore(store);

// Build the main component
export default () => (
	<Provider store={store}>
		<ReduxNavigator />
	</Provider>
);

