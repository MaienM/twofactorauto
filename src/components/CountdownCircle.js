import React from 'react'
import PropTypes from 'prop-types';
import { Easing, Animated, Text, View, ViewPropTypes } from 'react-native'

const propTypesView = (ViewPropTypes || View.propTypes);

// Circle outline
const Circle = (props) => {
	const { Component, radius, thickness, color, children } = props;

	return (
		<Component
			style={{
				width: 2 * radius,
				height: 2 * radius,
				borderWidth: thickness,
				borderRadius: radius,
				borderColor: color,
				...props.style,
			}}
		>
			{children}
		</Component>
	);
};

Circle.propTypes = {
	Component: PropTypes.func,
	radius: PropTypes.any.isRequired,
	thickness: PropTypes.any.isRequired,
	color: PropTypes.any.isRequired,
	style: propTypesView.style,
	children: PropTypes.element,
};

Circle.defaultProps = {
	Component: View,
	style: {},
	children: null,
};

// When rotate = 0deg, the right half of the circle will be filled
const HalfCircle = (props) => {
	const { rotate, style, ...circleProps } = props;
	const { Component, radius, thickness } = circleProps;

	return (
		<Component
			style={{
				...style,
				overflow: 'hidden',
				marginTop: -2 * radius,
				transform: [
					{ rotate },
					{ translateX: radius },
				],
			}}
		>
			<Circle
				{...circleProps}
				style={{
					transform: [{ translateX: -radius }],
				}}
			/>
		</Component>
	);
};

HalfCircle.propTypes = {
	...Circle.propTypes,
	rotate: PropTypes.any,
};

HalfCircle.defaultProps = {
	...Circle.defaultProps,
	rotate: '0deg',
};

// Based on http://cmichel.io/react-native-progress-circle/
export default class CountdownCircle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			animation: new Animated.Value(0),
			timeout: props.duration,
		};

		this.onAnimationChange = this.onAnimationChange.bind(this);
	}

	onAnimationChange({ value }) {
		const { duration } = this.props;

		const timeout = Math.ceil(duration - (duration * value));
		if (timeout < this.state.timeout) {
			this.setState({ timeout });
		}
	}

	componentWillMount() {
		const { duration, onFinish } = this.props;
		const { animation } = this.state;

		animation.addListener(this.onAnimationChange);

		// animation.clear();
		Animated.timing(animation, {
			toValue: 1,
			duration: duration * 1000,
			easing: Easing.linear,
		}).start(onFinish);
	}

	render() {
		const { duration, radius, thickness, color, offColor, containerStyle, textStyle } = this.props;
		const { animation, timeout } = this.state;

		return (
			<View style={containerStyle}>
				<Circle
					radius={radius}
					thickness={thickness}
					color={offColor}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={textStyle}>{timeout}</Text>
				</Circle>
				<HalfCircle
					radius={radius}
					thickness={thickness}
					color={color}
				/>
				<HalfCircle
					Component={Animated.View}
					radius={radius}
					thickness={thickness}
					color={animation.interpolate({
						inputRange: [0, 0.5, 0.5, 1],
						outputRange: [offColor, offColor, color, color],
					})}
					rotate={animation.interpolate({
						inputRange: [0, 0.5, 0.5, 1],
						outputRange: ['0deg', '180deg', '0deg', '180deg'],
					})}
				/>
			</View>
		)
	}
};

CountdownCircle.propTypes = {
	duration: PropTypes.number.isRequired,
	radius: PropTypes.number,
	thickness: PropTypes.number,
	color: PropTypes.string,
	offColor: PropTypes.string,
	innerColor: PropTypes.string,
	containerStyle: propTypesView.style,
	textStyle: Text.propTypes.style,
	onFinish: PropTypes.func,
};

CountdownCircle.defaultProps = {
	radius: 20,
	thickness: 3,
	color: '#E9F',
	offColor: '#999',
	innerColor: '#FFF',
	containerStyle: undefined,
	textStyle: undefined,
	onFinish: () => null,
};

