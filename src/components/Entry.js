import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import COLORS from 'flatui-colors';
import { getComplementary } from '../utils/colors';
import CountdownCircle from './CountdownCircle';

const TIMEOUT = 30;

const styles = StyleSheet.create({
	baseItem: {
		height: 70,
		borderColor: COLORS.SILVER,
		borderBottomWidth: 1,
	},

	container: {
		width: '100%',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	containerName: {
	},

	containerCode: {
		flexDirection: 'row',
	},

	nameHeader: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	nameUrl: {
		fontStyle: 'italic',
	},

	codeText: {
		fontSize: 28,
	},

	codeTimer: {
		marginLeft: 15,
	},

	codeTimerText: {
		fontSize: 16,
	},

	buttonMenuContainer: {
		flexDirection: 'row-reverse',
	},

	buttonContainer: {
		width: '100%',
		height: 70,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},

	buttonIcon: {
		margin: 15,
	},

	buttonText: {
		fontSize: 20,
	},
});

const MenuButton = (props) => {
	const { text, icon, background, onPress } = props;
	const color = getComplementary(background);

	return (
		<TouchableHighlight onPress={onPress}>
			<View style={[styles.buttonContainer, { backgroundColor: background }]}>
				<Text style={[styles.buttonText, { color }]}>{text}</Text>
				<Icon name={icon} size={40} color={color} style={styles.buttonIcon} />
			</View>
		</TouchableHighlight>
	);
};

MenuButton.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	background: PropTypes.string.isRequired,
	onPress: PropTypes.func,
};

MenuButton.defaultProps = {
	onPress: undefined,
};

export default class Entry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			code: null,
		};

		this.onPress = this.onPress.bind(this);
		this.onTimeElapsed = this.onTimeElapsed.bind(this);
	}

	onPress() {
		this.setState({
			code: 'ABCD1234',
		});
	}

	onTimeElapsed() {
		this.setState({
			code: null,
		});
	}

	render() {
		return (
			<Swipeable
				children={(
					<TouchableHighlight onPress={this.state.opened ? undefined : this.onPress}>
						<View style={[styles.baseItem, styles.container]}>
							<View style={styles.containerName}>
								<Text style={styles.nameHeader}>{this.props.name}</Text>
								<Text style={styles.nameUrl}>{this.props.url}</Text>
							</View>
							{this.state.code && (
								<View style={styles.containerCode}>
									<Text style={styles.codeText}>
										{this.state.code}
									</Text>
									<CountdownCircle
										radius={20}
										thickness={5}
										color={COLORS.WISTERIA}
										offColor={COLORS.SILVER}
										containerStyle={styles.codeTimer}
										textStyle={styles.codeTimerText}
										duration={TIMEOUT}
										onFinish={this.onTimeElapsed}
									/>
								</View>
							)}
						</View>
					</TouchableHighlight>
				)}
				leftButtons={[
					<MenuButton icon="edit" text="Edit" background={COLORS.EMERALD} />,
					<MenuButton icon="delete" text="Delete" background={COLORS.ALIZARIN} />,
				]}
				leftButtonContainerStyle={[styles.baseItem, styles.buttonContainer]}
				leftButtonWidth={70}
				onLeftButtonsOpenComplete={() => this.setState({ opened: true })}
				onLeftButtonsCloseComplete={() => this.setState({ opened: false })}
			/>
		);
	}
}

Entry.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

