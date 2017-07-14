import COLORS from 'flatui-colors';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { updateEntry } from '../actions/entries';
import algorithms from '../algorithms';
import debouncedTouchable from '../components/DebouncedTouchable';
import { getComplementary } from '../utils/colors';
import CountdownCircle from './CountdownCircle';

const DebouncedTouchableHighlight = debouncedTouchable(TouchableHighlight);

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

	nameService: {
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
		<DebouncedTouchableHighlight onPress={onPress}>
			<View style={[styles.buttonContainer, { backgroundColor: background }]}>
				<Text style={[styles.buttonText, { color }]}>{text}</Text>
				<Icon name={icon} size={40} color={color} style={styles.buttonIcon} />
			</View>
		</DebouncedTouchableHighlight>
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

class Entry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			code: null,
		};

		this.onPress = this.onPress.bind(this);
		this.handleTimeElapsed = this.handleTimeElapsed.bind(this);
	}

	onPress() {
		const Algorithm = algorithms[this.props.entry.algorithm.toLowerCase()];
		const algorithm = new Algorithm(this.props.secrets);
		this.setState({
			code: algorithm.generate(),
		});
		this.props.onUpdateSecrets(algorithm.persist());
	}

	handleTimeElapsed() {
		this.setState({
			code: null,
		});
	}

	render() {
		return (
			<Swipeable
				leftButtons={[
					<MenuButton icon="edit" text="Edit" background={COLORS.EMERALD} onPress={this.props.onPressEdit} />,
					<MenuButton icon="delete" text="Delete" background={COLORS.ALIZARIN} />,
				]}
				leftButtonContainerStyle={[styles.baseItem, styles.buttonContainer]}
				leftButtonWidth={70}
				onLeftButtonsOpenComplete={() => this.setState({ opened: true })}
				onLeftButtonsCloseComplete={() => this.setState({ opened: false })}
			>
				<TouchableHighlight onPress={this.state.opened ? undefined : this.onPress}>
					<View style={[styles.baseItem, styles.container]}>
						<View style={styles.containerName}>
							<Text style={styles.nameHeader}>{this.props.entry.name}</Text>
							<Text style={styles.nameService}>{this.props.entry.service}</Text>
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
									onFinish={this.handleTimeElapsed}
								/>
							</View>
						)}
					</View>
				</TouchableHighlight>
			</Swipeable>
		);
	}
}

Entry.propTypes = {
	uuid: PropTypes.string.isRequired, // eslint-disable-line
	entry: PropTypes.shape({
		name: PropTypes.string.isRequired,
		service: PropTypes.string.isRequired,
		algorithm: PropTypes.oneOf(_.keys(algorithms)).isRequired,
	}).isRequired,
	secrets: PropTypes.object.isRequired, // eslint-disable-line
	onUpdateSecrets: PropTypes.func.isRequired,
	onPressEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	entry: state.entries[ownProps.uuid],
	secrets: state.secrets[ownProps.uuid],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onUpdateSecrets: (secrets) => dispatch(updateEntry({
		uuid: ownProps.uuid,
		secrets,
	})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);

