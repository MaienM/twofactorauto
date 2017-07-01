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
					<View>
						<Text style={styles.header}>{this.props.name}</Text>
						<Text style={styles.url}>{this.props.url}</Text>
					</View>
					{this.state.code && <Text style={styles.code}>{this.state.code}</Text>}
					{this.state.code && (
						<CountdownCircle
							duration={TIMEOUT}
							radius={20}
							thickness={5}
							color="#93F"
							textStyle={{
								fontSize: 16,
							}}
							onFinish={this.onTimeElapsed}
						/>
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

	header: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	url: {
		fontStyle: 'italic',
	},

	code: {
		fontSize: 28,
	},
});
