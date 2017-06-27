import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';

export default class Entry extends React.Component {
	constructor(props) {
		super(props);

		this.onPress = this.onPress.bind(this);
		this.onLongPress = this.onLongPress.bind(this);
	}

	onPress() {
		console.log(`Press ${this.props.name}`);
	}

	onLongPress() {
		console.log(`Long press ${this.props.name}`);
	}

	render() {
		return (
			<TouchableHighlight onPress={this.onPress} onLongPress={this.onLongPress}>
				<View style={styles.container}>
					<Text style={styles.header}>{this.props.name}</Text>
					<Text style={styles.url}>{this.props.url}</Text>
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
	},

	header: {
		fontSize: 18,
		fontWeight: 'bold',
	},

	url: {
		fontStyle: 'italic',
	},
});
