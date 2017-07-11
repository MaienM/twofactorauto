import { combineReducers } from 'redux';
import order from './order';
import entries from './entries';
import secrets from './secrets';

export default combineReducers({
	order,
	entries,
	secrets,
});

