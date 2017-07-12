import { connect } from 'react-redux';
import { createEntry } from '../actions/entries';
import EntryForm from './EntryForm';

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[ownProps.uuid],
	secrets: state.secrets[ownProps.uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: ({ entry, secrets }) => {
		ownProps.navigation.goBack();
		dispatch(createEntry({ entry, secrets }));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);

