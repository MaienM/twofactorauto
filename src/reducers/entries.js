import _ from 'lodash';
import actions from '../constants/actions';

const initialState = {};

export default (state, action) => {
	if (_.isUndefined(state) || action.type == actions.reset) {
		return initialState;
	}

	switch (action.type) {
		case actions.entry.create:
		case actions.entry.update:
			if (!action.entry) {
				return state;
			}
			return { ...state, [action.uuid]: action.entry };
		case actions.entry.delete:
			return _.without(state, action.uuid);
		default:
			return state;
	}
};

