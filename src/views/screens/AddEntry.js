import { connect } from 'react-redux';
import { createEntry } from '../../actions/entries';
import { back } from '../../actions/navigation';
import EntryForm from './EntryForm';

const mapDispatchToProps = (dispatch) => ({
	onSave: (entry) => {
		dispatch(createEntry({ entry }));
		dispatch(back());
	},
});

export default connect(null, mapDispatchToProps)(EntryForm);

