import { connect } from 'react-redux';
import { updateEntry } from '../actions/entries';
import { back } from '../actions/navigation';
import { routes } from '../constants';
import { getParams } from '../utils/navigation';
import EntryForm from './EntryForm';

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[getParams(ownProps).uuid],
	secrets: state.secrets[getParams(ownProps).uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: ({ entry, secrets }) => {
		dispatch(updateEntry({
			uuid: getParams(ownProps).uuid,
			entry,
			secrets,
		}));
		dispatch(back(routes.entry.edit));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);

