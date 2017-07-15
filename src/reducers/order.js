import _ from 'lodash';
import { actions } from '../constants';

const initialState = [];

export default (state, action) => {
	if (_.isUndefined(state)) {
		return initialState;
	}

	switch (action.type) {
		case actions.entry.create:
			return state.concat([action.uuid]);
		case actions.entry.delete:
			return _.without(state, action.uuid);
		default:
			return state;
	}
};

