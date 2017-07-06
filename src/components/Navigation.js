import React from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import COLORS from 'flatui-colors';
import setupHOC from '../utils/hoc';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.PETER_RIVER,
	},

	headerTitle: {
		color: COLORS.CLOUDS,
		fontSize: 20,
	},

	headerBackTitleStyle: {
		color: COLORS.CLOUDS,
	},

	headerRight: {
		marginRight: 10,
	},
});

const defaultNavigationOptions = {
	title: 'Two Factor Auto',
	headerStyle: styles.header,
	headerTitleStyle: styles.headerTitle,
	headerBackTitleStyle: styles.headerBackTitleStyle,
	headerTintColor: COLORS.CLOUDS,
};

export default (Component) => {
	const WithNavigation = (props) => <Component {...props} />;
	// class WithNavigation extends React.Component {
	// 	render() {
	// 		return <Component {...this.props} />;
	// 	}
	// }
	setupHOC(Component, WithNavigation);

	WithNavigation.navigationOptions = (...args) => _.assignIn(
		{},

		// First apply the default navigation options
		defaultNavigationOptions,

		// Then add the component specific navigation options
		_.isFunction(Component.navigationOptions)
			? Component.navigationOptions(...args)
			: Component.navigationOptions,

		// Finally, if the component has a static renderHeaderRight method, use
		// it to render the right area of the header
		_.has(Component, 'renderHeaderRight') && {
			headerRight: (
				<View style={styles.headerRight}>
					{Component.renderHeaderRight(...args)}
				</View>
			),
		},
	);

	return WithNavigation;
};
