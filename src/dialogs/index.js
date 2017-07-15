import { routes } from '../constants';
import DeleteEntry from './DeleteEntry';
import DialogRenderer from './DialogRenderer';

export default DialogRenderer({
	[routes.entry.delete]: DeleteEntry,
});

