import PropTypes from 'prop-types';
import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Navigator from './screens';

const ReduxNavigator = (props) => (
	<Navigator
		navigation={addNavigationHelpers({
			dispatch: props.dispatch,
			state: props.state,
		})}
	/>
);

ReduxNavigator.propTypes = {
	state: PropTypes.any.isRequired, // eslint-disable-line
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	state: state.navigation.navigator,
});

export default connect(mapStateToProps)(ReduxNavigator);

