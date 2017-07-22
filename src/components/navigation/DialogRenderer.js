import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import router from '../../views';

const DialogRenderer = ({ dialog }) => {
	const Dialog = router.getRoute(dialog.key);
	return Dialog ? Dialog.render(dialog.params) : null;
};

DialogRenderer.propTypes = {
	dialog: PropTypes.shape({
		key: PropTypes.string,
		params: PropTypes.object,
	}).isRequired,
};

const mapStateToProps = (state) => ({
	dialog: state.navigation.dialog,
});

export default connect(mapStateToProps)(DialogRenderer);

