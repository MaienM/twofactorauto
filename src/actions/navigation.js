import { NavigationActions } from 'react-navigation';
import { actions } from '../constants';

// Navigate between screens
export const navigate = (routeName, params = {}) => NavigationActions.navigate({ routeName, params });
export const back = (key = null) => NavigationActions.back({ key });

// Open and close dialogs
export const dialog = (key, params = {}) => ({
	type: actions.dialog.open,
	key,
	params,
});
export const dismiss = (key = null) => ({
	type: actions.dialog.close,
	key,
});

