import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import withNavigation from '../components/Navigation';

const styles = StyleSheet.create({
});

class AddEntry extends React.Component {
	render() {
		return (
			<View>
				<Text>Hello world!</Text>
			</View>
		);
	}
}

export default withNavigation(AddEntry);
