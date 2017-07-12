import { connect } from 'react-redux';
import { updateEntry } from '../actions/entries';
import EntryForm from './EntryForm';

const getUUID = (ownProps) => ownProps.navigation.state.params.uuid;

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[getUUID(ownProps)],
	secrets: state.secrets[getUUID(ownProps)],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: ({ entry, secrets }) => {
		ownProps.navigation.goBack();
		dispatch(updateEntry({
			uuid: getUUID(ownProps),
			entry,
			secrets,
		}));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);

