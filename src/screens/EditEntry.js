import { connect } from 'react-redux';
import { updateEntry } from '../actions/entries';
import { getParams } from '../utils/navigation';
import EntryForm from './EntryForm';

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[getParams(ownProps).uuid],
	secrets: state.secrets[getParams(ownProps).uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: ({ entry, secrets }) => {
		ownProps.navigation.goBack();
		dispatch(updateEntry({
			uuid: getParams(ownProps).uuid,
			entry,
			secrets,
		}));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);

