import { connect } from 'react-redux';
import { createEntry } from '../actions/entries';
import { back } from '../actions/navigation';
import { routes } from '../constants';
import EntryForm from './EntryForm';

const mapDispatchToProps = (dispatch) => ({
	onSave: ({ entry, secrets }) => {
		dispatch(createEntry({ entry, secrets }));
		dispatch(back(routes.entry.add));
	},
});

export default connect(null, mapDispatchToProps)(EntryForm);

