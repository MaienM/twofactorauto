import React from 'react';
import { View } from 'react-native';
import setupHOC from '../../utils/hoc';
import DialogRenderer from './DialogRenderer';

/**
 * A higher-order component that wraps a component to inject rending of dialogs on top.
 */
export default (Component) => {
	const withDialogRenderer = (props) => (
		<View>
			<Component {...props} />
			<DialogRenderer />
		</View>
	);
	setupHOC(Component, withDialogRenderer);

	return withDialogRenderer;
};

