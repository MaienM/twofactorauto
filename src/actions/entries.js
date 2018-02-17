import _ from 'lodash';
import uuidGen from 'uuid/v4';
import { actions } from '../constants';

export const createEntry = ({ uuid = uuidGen(), entry }) => {
	if (!_.isObject(entry)) {
		throw new Error(`Invalid entry ${entry}`);
	}

	return {
		type: actions.entry.create,
		uuid,
		entry,
	};
};

export const updateEntry = ({ uuid, entry }) => {
	if (!uuid) {
		throw new Error(`Invalid uuid ${uuid}`);
	}

	return {
		type: actions.entry.update,
		uuid,
		entry,
	};
};

export const deleteEntry = (uuid) => {
	if (!uuid) {
		throw new Error(`Invalid uuid ${uuid}`);
	}

	return {
		type: actions.entry.delete,
		uuid,
	};
};

