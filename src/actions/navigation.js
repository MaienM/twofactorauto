import _ from 'lodash';
import { actions } from '../constants';
import { requireEmpty } from '../utils/validate';
import router from '../views';

const validateItem = ({ route, params = {}, ...rest }) => {
	requireEmpty(rest);
	if (router.hasRoute(route)) {
		throw new Error(`Unknown route ${route}`);
	}
	if (!_.isObject(params)) {
		throw new Error(`Invalid params ${params}`);
	}
};

export const open = (route, params = {}) => {
	validateItem({ route, params });
	return {
		type: actions.navigation.open,
		route,
		params,
	};
};

export const close = (route = null) => {
	validateItem({ route });
	return {
		type: actions.navigation.close,
		route,
	};
};

export const reset = (stack) => {
	if (_.isEmpty(stack)) {
		throw new Error('Cannot reset to empty stack');
	}
	_.each(stack, validateItem);
	return {
		type: actions.navigation.reset,
		stack,
	};
};

export const backTo = (route) => {
	validateItem({ route });
	return {
		type: actions.navigation.backTo,
		route,
	};
};

