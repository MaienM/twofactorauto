import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import withNavigation from '../components/Navigation';

const styles = StyleSheet.create({
	container: {
	},
});

class AddEntry extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<FormLabel>Username</FormLabel>
				<FormInput onChangeText={this.onChangeName} placeholder="Name" />

				<FormLabel>URL</FormLabel>
				<FormInput onChangeText={this.onChangeURL} placeholder="URL" />

				<FormLabel>Secret</FormLabel>
				<FormInput onChangeText={this.onChangeSecret} placeholder="Secret" />
			</View>
		);
	}
}

export default withNavigation(AddEntry);
