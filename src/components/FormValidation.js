import _ from 'lodash';
import React from 'react';
import { FormValidationMessage } from 'react-native-elements';

/**
 * A class that allows helps with form validations.
 *
 * It allowes for easy construction of FormValidationMessages, while simulateously keeping track of whether any
 * validations failed, providing a form-wide status of valid/invalid.
 */
export default class FormValidation {
	constructor() {
		this.valid = true;
	}

	/**
	 * Render a validation message (error).
	 *
	 * @params {Array<String>} errors - A list of error strings for failed validations. If this list contains any
	 *   non-falsy values, the first of these will be rendered as an error, and this form will be marked as invalid.
	 * @returns {JSX} A FormValidationMessage if there were any errors, or null otherwise.
	 */
	runValidation(...errors) {
		const error = _(errors).filter().first();
		if (!error) {
			return null;
		}
		this.valid = false;
		return <FormValidationMessage>{error}</FormValidationMessage>;
	}

	/**
	 * Check whether the form is valid.
	 *
	 * See runValidation for the logic behind this check.
	 *
	 * @returns {Bool} Whether the form is valid.
	 */
	isValid() { 
		return this.valid;
	}
}

