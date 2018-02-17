import { connect } from 'react-redux';
import { updateEntry } from '../../actions/entries';
import { back } from '../../actions/navigation';
import EntryForm from './EntryForm';

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[ownProps.params.uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSave: (entry) => {
		dispatch(updateEntry({
			uuid: ownProps.params.uuid,
			entry,
		}));
		dispatch(back());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);

