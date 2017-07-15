import { connect } from 'react-redux';
import { createEntry } from '../actions/entries';
import { back } from '../actions/navigation';
import EntryForm from './EntryForm';

const mapDispatchToProps = (dispatch) => ({
	onSave: ({ entry, secrets }) => {
		dispatch(createEntry({ entry, secrets }));
		dispatch(back());
	},
});

export default connect(null, mapDispatchToProps)(EntryForm);

