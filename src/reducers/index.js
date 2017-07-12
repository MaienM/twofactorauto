import { combineReducers } from 'redux';
import actions from '../constants/actions';
import entries from './entries';
import order from './order';
import secrets from './secrets';

const appReducer = combineReducers({
	order,
	entries,
	secrets,
});

export default (state, action) => {
	let appState = state;
	if (action.type === actions.reset) {
		appState = undefined;
	}

	return appReducer(appState, action);
};

