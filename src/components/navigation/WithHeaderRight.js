import React from 'react';
import assignCallOrNoop from '../../utils/assignCallOrNoop';
import setupHOC from '../../utils/hoc';

/**
 * A higher-order component that allows a component to specify how the right header portion should be headered.
 */
export default (Component, HeaderRight) => {
	const withHeaderRight = (props) => <Component {...props} />;
	setupHOC(Component, withHeaderRight);

	withHeaderRight.navigationOptions = assignCallOrNoop(
		Component.navigationOptions,
		{
			headerRight: <HeaderRight />,
		},
	);

	return withHeaderRight;
};

