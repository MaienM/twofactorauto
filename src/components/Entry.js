import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import CountdownCircle from './CountdownCircle';

const TIMEOUT = 30;

export default class Entry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			code: null,
		};

		this.onPress = this.onPress.bind(this);
		this.onLongPress = this.onLongPress.bind(this);
		this.onTimeElapsed = this.onTimeElapsed.bind(this);
	}

	onPress() {
		this.setState({
			code: 'ABCD1234',
		});
	}

	onLongPress() {
		console.log(`Long press ${this.props.name}`);
	}

	onTimeElapsed() {
		this.setState({
			code: null,
		});
	}

	render() {
		return (
			<TouchableHighlight onPress={this.onPress} onLongPress={this.onLongPress}>
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
								color="#93F"
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

const styles = StyleSheet.create({
	container: {
		width: '100%',
		margin: 1,
		padding: 10,
		backgroundColor: '#EEE',
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
		marginLeft: 10,
	},

	codeTimerText: {
		fontSize: 16,
	}
});
