import _ from 'lodash';
import uuidGen from 'uuid/v4';
import { actions } from '../constants';

export const createEntry = ({ uuid = uuidGen(), entry, secrets }) => {
	if (!_.isObject(entry)) {
		throw new Error(`Invalid entry ${entry}`);
	}
	if (!_.isObject(secrets)) {
		throw new Error(`Invalid secrets ${secrets}`);
	}

	return {
		type: actions.entry.create,
		uuid,
		entry,
		secrets,
	};
};

export const updateEntry = ({ uuid, entry, secrets }) => {
	if (!uuid) {
		throw new Error(`Invalid uuid ${uuid}`);
	}

	return {
		type: actions.entry.update,
		uuid,
		entry,
		secrets,
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

