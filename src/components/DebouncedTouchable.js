import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import setupHOC from '../utils/hoc';

export default (Component) => {
	class debouncedTouchable extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				disabled: false,
			};

			this.handleEvent = this.handleEvent.bind(this);
		}

		componentWillUnmount() {
			clearTimeout(this.timeout);
		}

		handleEvent(...args) {
			this.props.onPress(...args);
			this.setState({ disabled: true });
			this.timeout = setTimeout(() => this.setState({ disabled: false }), this.props.debounceWait);
		}

		render() {
			return (
				<Component
					{...this.props}
					onPress={_.throttle(this.handleEvent, this.props.debounceWait)}
					disabled={this.state.disabled || this.props.disabled}
				/>
			);
		}
	}
	setupHOC(Component, debouncedTouchable);

	debouncedTouchable.propTypes = {
		debounceWait: PropTypes.number,
		onPress: PropTypes.func.isRequired,
		disabled: PropTypes.bool,
	};

	debouncedTouchable.defaultProps = {
		debounceWait: 1000,
		disabled: false,
	};

	return debouncedTouchable;
};

