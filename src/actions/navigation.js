import { NavigationActions } from 'react-navigation';
import { actions } from '../constants';
import router from '../views';

// Navigate between screens
export const navigate = (routeName, params = {}) => NavigationActions.navigate({ routeName, params });
export const back = (key = null) => NavigationActions.back({ key });

// Open and close dialogs
export const dialog = (key, params = {}) => {
	if (!router.hasRoute(key)) {
		throw new Error(`Invalid route ${key}`);
	}
	if (!router.getRoute(key).isDialog()) {
		throw new Error(`Route ${key} is not a dialog`);
	}
	return {
		type: actions.dialog.open,
		key,
		params,
	};
};
export const dismiss = (key = null) => ({
	type: actions.dialog.close,
	key,
});

