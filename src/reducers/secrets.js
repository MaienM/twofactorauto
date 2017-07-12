import _ from 'lodash';
import actions from '../constants/actions';

const initialState = {};

export default (state, action) => {
	if (_.isUndefined(state)) {
		return initialState;
	}

	switch (action.type) {
		case actions.entry.create:
		case actions.entry.update:
			if (!action.secrets) {
				return state;
			}
			return { ...state, [action.uuid]: action.secrets };
		case actions.entry.delete:
			return _.omit(state, action.uuid);
		default:
			return state;
	}
};

