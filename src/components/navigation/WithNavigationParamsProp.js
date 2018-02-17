import React from 'react';
import { connect } from 'react-redux';
import setupHOC from '../../utils/hoc';

/**
 * A higher-order component that passes the navigation params of the current screen as a prop to the component.
 */
export default (Component) => {
	const withNavigationParamsProp = (props) => <Component {...props} />;
	setupHOC(Component, withNavigationParamsProp);

	const mapStateToProps = (state) => ({
		params: state.navigation.navigator.routes[state.navigation.navigator.index].params || {},
	});

	return connect(mapStateToProps)(withNavigationParamsProp);
};

