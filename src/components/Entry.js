import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import COLORS from 'flatui-colors';
import CountdownCircle from './CountdownCircle';

const TIMEOUT = 30;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		margin: 1,
		padding: 10,
		backgroundColor: COLORS.CLOUDS,
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
});

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
			<TouchableHighlight onPress={this.onPress}>
				<View style={styles.container}>
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
		);
	}
}

Entry.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

