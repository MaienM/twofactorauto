import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import COLORS from 'flatui-colors';
import withNavigation from '../components/Navigation';

const styles = StyleSheet.create({
	container: {
	},

	button: {
		marginTop: 10,
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

				<FormLabel>Secret (base64 encoded)</FormLabel>
				<FormInput onChangeText={this.onChangeSecret} placeholder="Secret" />

				<Button
					title="Save"
					icon={{ name: 'save' }}
					backgroundColor={COLORS.NEPHRITIS}
					buttonStyle={styles.button}
					large
				/>
			</View>
		);
	}
}

export default withNavigation(AddEntry);
