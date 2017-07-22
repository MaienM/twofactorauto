import React from 'react';
import { StyleSheet, View, ViewPropTypes, TouchableHighlight } from 'react-native';
import debouncedTouchable from '../DebouncedTouchable';

const DebouncedTouchableHighlight = debouncedTouchable(TouchableHighlight);
const propTypesView = (ViewPropTypes || View.propTypes);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},

	button: {
		marginRight: 10,
	},
});

const Button = (props) => <DebouncedTouchableHighlight {...props} style={[props.style, styles.button]} />;
Button.propTypes = TouchableHighlight.propTypes;

const NavigationButtons = (props) => <View {...props} style={[props.style, styles.container]} />;
NavigationButtons.propTypes = propTypesView;
NavigationButtons.Button = Button;

export default NavigationButtons;

