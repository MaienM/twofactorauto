import React from 'react';
import { requireEmpty, requireOneOf } from '../utils/validate';

export default class Route {
	constructor({ key, screen = null, dialog = null, params = {}, ...rest }) {
		requireEmpty(rest);
		requireOneOf({ screen, dialog });
		if (!key) {
			throw new Error(`Invalid key ${key}`);
		}

		this.key = key;
		this.screen = screen;
		this.dialog = dialog;
		this.params = params;
	}

	isScreen() {
		return !!this.screen;
	}

	isDialog() {
		return !!this.dialog;
	}

	render(props) {
		const Component = this.screen || this.dialog;
		return <Component {...this.params} {...props} />;
	}
}

