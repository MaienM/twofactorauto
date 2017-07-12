import { connect } from 'react-redux';
import { createEntry } from '../actions/entries';
import EntryForm from './EntryForm';

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: ({ entry, secrets }) => {
		ownProps.navigation.goBack();
		dispatch(createEntry({ entry, secrets }));
	},
});

export default connect(null, mapDispatchToProps)(EntryForm);

