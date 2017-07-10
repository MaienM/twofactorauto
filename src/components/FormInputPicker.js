/**
 * react-native-elements does not have a picker element.
 *
 * As a workaround, this is FormInputPicker with the TextInput replaced by a Picker.
 */

/* eslint-disable */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Picker,
	StyleSheet,
	View,
	Platform,
	Dimensions,
	Text as NativeText,
} from 'react-native';
import colors from 'react-native-elements/src/config/colors';
import normalize from 'react-native-elements/src/helpers/normalizeText';

const { width } = Dimensions.get('window');

class FormInputPicker extends Component {
	focus() {
		const ref = this.props.textInputRef;
		this.refs[ref].focus();
	}
	blur() {
		const ref = this.props.textInputRef;
		this.refs[ref].blur();
	}
	render() {
		const {
			containerStyle,
			inputStyle,
			textInputRef,
			containerRef,
			...attributes
		} = this.props;
		return (
			<View
				ref={containerRef}
				style={[styles.container, containerStyle && containerStyle]}
			>
				<Picker
					ref={textInputRef}
					style={[styles.input, inputStyle && inputStyle]}
					{...attributes}
				/>
			</View>
		);
	}
}

FormInputPicker.propTypes = {
	containerStyle: View.propTypes.style,
	inputStyle: NativeText.propTypes.style,
	textInputRef: PropTypes.string,
	containerRef: PropTypes.string,
};

FormInputPicker.Item = Picker.Item;

const styles = StyleSheet.create({
	container: {
		marginLeft: 11,
		marginRight: 11,
		...Platform.select({
			ios: {
				borderBottomColor: colors.grey4,
				borderBottomWidth: 1,
				marginLeft: 20,
				marginRight: 20,
			},
		}),
	},
	input: {
		...Platform.select({
			android: {
				minHeight: 46,
				width: width - 14,
			},
			ios: {
				minHeight: 36,
				width: width,
			},
		}),
		color: colors.grey3,
	},
});

export default FormInputPicker;

/* eslint-enable */

