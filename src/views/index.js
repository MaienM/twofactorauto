import { routes } from '../constants';
import { DeleteEntry } from './dialogs';
import Router from './Router';
import { AddEntry, EditEntry, Home } from './screens';

export default new Router({
	[routes.home]: {
		screen: Home,
	},
	[routes.entry.add]: {
		screen: AddEntry,
	},
	[routes.entry.edit]: {
		screen: EditEntry,
	},
	[routes.entry.delete]: {
		dialog: DeleteEntry,
	},
});

