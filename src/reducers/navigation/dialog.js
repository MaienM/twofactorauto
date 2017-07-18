import _ from 'lodash';
import { actions } from '../../constants';

const initialState = {
	key: null,
	params: {},
};

export default (state, action) => {
	if (_.isUndefined(state)) {
		return initialState;
	}

	switch (action.type) {
		case actions.dialog.open:
			return {
				key: action.key,
				params: action.params,
			};
		case actions.dialog.close:
			if (action.key && action.key !== state.key) {
				return state;
			}
			return initialState;
		default:
			return state;
	}
};

