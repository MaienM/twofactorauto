import uuidGen from 'uuid/v4';
import actions from '../constants/actions';

export const createEntry = ({ uuid = uuidGen(), entry, secrets }) => ({
	type: actions.entry.create,
	uuid,
	entry,
	secrets,
});

export const updateEntry = ({ uuid, entry, secrets }) => ({
	type: actions.entry.update,
	uuid,
	entry,
	secrets,
});

export const deleteEntry = (uuid) => ({
	type: actions.entry.delete,
	uuid,
});

