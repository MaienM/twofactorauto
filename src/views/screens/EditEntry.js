import { connect } from 'react-redux';
import { updateEntry } from '../../actions/entries';
import { back } from '../../actions/navigation';
import EntryForm from './EntryForm';

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[ownProps.uuid],
	secrets: state.secrets[ownProps.uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: ({ entry, secrets }) => {
		dispatch(updateEntry({
			uuid: ownProps.uuid,
			entry,
			secrets,
		}));
		dispatch(back());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);

