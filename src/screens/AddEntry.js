import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { defaultNavigationOptions } from '../components/Header';

const styles = StyleSheet.create({
});

export default class Home extends React.Component {
	static navigationOptions() {
		return {
			...defaultNavigationOptions,
		};
	}

	render() {
		return (
			<View>
				<Text>Hello world!</Text>
			</View>
		);
	}
}

