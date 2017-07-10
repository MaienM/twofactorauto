import React from 'react';
import { FormValidationMessage } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * A component that can make validation easier.
 *
 * As body (children) it expects an array. Each of these array elements is a separate validation, and the first one to
 * fail will be shown. Validations can be any of the following:
 *
 * - An string, indicating an already failed validation.
 * - A falsy value, indicating an already passed validation.
 */
const FormValidation = (props) => {
	const message = _(props.children).filter().first();
	if (!message) {
		return null;
	}
	return <FormValidationMessage>{message}</FormValidationMessage>;
};

FormValidation.propTypes = {
	children: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf([null, undefined, false]),
	])).isRequired,
};

export default FormValidation;

