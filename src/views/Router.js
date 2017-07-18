import _ from 'lodash';
import Route from './Route';

export default class Router {
	constructor(routes) {
		if (!_.isObject(routes)) {
			throw new Error(`Invalid routes ${routes}`);
		}

		this.routes = _.mapValues(routes, (r, key) => new Route({ ...r, key }));
	}

	hasRoute(key) {
		return !!this.getRoute(key);
	}

	getRoute(key) {
		return this.routes[key];
	}
}

