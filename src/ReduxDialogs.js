import { connect } from 'react-redux';
import Dialogs from './dialogs';

const mapStateToProps = (state) => ({
	dialog: state.navigation.dialog.key,
	params: state.navigation.dialog.params,
});

export default connect(mapStateToProps)(Dialogs);

