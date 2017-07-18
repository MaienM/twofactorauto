import _ from 'lodash';
import React from 'react';
import { FormValidationMessage } from 'react-native-elements';

let valid = true;

/**
 * A method that can make validation easier.
 *
 * It accepts a list of validations, and the first one to fail will be shown. Validations can be any of the following:
 *
 * - An string, indicating an already failed validation.
 * - A falsy value, indicating an already passed validation.
 */
export const validate = (...validators) => {
	const message = _(validators).filter().first();
	if (!message) {
		return null;
	}
	valid = false;
	return <FormValidationMessage>{message}</FormValidationMessage>;
};

export const resetValidation = () => {
	valid = true;
};

export const isValid = () => valid;

