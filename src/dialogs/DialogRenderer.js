import PropTypes from 'prop-types';
import React from 'react';

export default (dialogs) => {
	const DialogRenderer = (props) => {
		const Dialog = dialogs[props.dialog];
		if (Dialog) {
			return <Dialog {...props.params} />;
		}
		return null;
	};

	DialogRenderer.propTypes = {
		dialog: PropTypes.string,
		params: PropTypes.object.isRequired, // eslint-disable-line
	};

	DialogRenderer.defaultProps = {
		dialog: null,
		params: {},
	};

	return DialogRenderer;
};

