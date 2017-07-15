import { combineReducers } from 'redux';
import { actions } from '../constants';
import entries from './entries';
import navigation from './navigation';
import order from './order';
import secrets from './secrets';

const appReducer = combineReducers({
	entries,
	order,
	navigation,
	secrets,
});

export default (state, action) => {
	let appState = state;
	if (action.type === actions.reset) {
		appState = undefined;
	}

	return appReducer(appState, action);
};

