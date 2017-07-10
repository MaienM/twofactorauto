import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import COLORS from 'flatui-colors';
import FormInputPicker from '../components/FormInputPicker';
import withNavigation from '../components/Navigation';
import * as buf from '../utils/buffer';
import { validate, resetValidation, isValid } from '../utils/validate';

const styles = StyleSheet.create({
	container: {
	},

	button: {
		marginTop: 10,
	},
});

const BASE64_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const REGEX_STRIP_BASE64 = new RegExp(`[^${BASE64_CHARACTERS}]`, 'g');

class AddEntry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			service: '',
			algorithm: null,
			secret: '',
		};

		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeService = this.onChangeService.bind(this);
		this.onChangeAlgorithm = this.onChangeAlgorithm.bind(this);
		this.onChangeSecret = this.onChangeSecret.bind(this);
		this.onPressSave = this.onPressSave.bind(this);
	}

	onChangeName(name) {
		this.setState({ name });
	}

	onChangeService(service) {
		this.setState({ service });
	}

	onChangeAlgorithm(algorithm) {
		this.setState({ algorithm: algorithm.replace(REGEX_STRIP_BASE64, '') });
	}

	onChangeSecret(secret) {
		this.setState({ secret });
	}

	onPressSave() {
		console.log(this.state);
	}

	render() {
		resetValidation();
		return (
			<ScrollView style={styles.container}>
				<FormLabel>Name</FormLabel>
				<FormInput
					onChangeText={this.onChangeName}
					value={this.state.name}
					placeholder="Name"
					returnKeyType="next"
				/>
				{validate(!this.state.name && 'Cannot be empty')}

				<FormLabel>Service</FormLabel>
				<FormInput
					onChangeText={this.onChangeService}
					value={this.state.service}
					placeholder="Service"
					returnKeyType="next"
				/>
				{validate(!this.state.service && 'Cannot be empty')}

				<FormLabel>Algorithm</FormLabel>
				<FormInputPicker onValueChange={this.onChangeAlgorithm} value={this.state.algorithm}>
					<FormInputPicker.Item label="" value={null} />
					<FormInputPicker.Item label="HOTP" value="hotp" />
					<FormInputPicker.Item label="TOTP" value="totp" />
				</FormInputPicker>
				{validate(!this.state.algorithm && 'Cannot be empty')}

				<FormLabel>Secret (base64 encoded)</FormLabel>
				<FormInput
					onChangeText={this.onChangeSecret}
					value={this.state.secret}
					placeholder="Secret"
				/>
				{validate(
					!this.state.secret && 'Cannot be empty',
					!buf.fromBase64(this.state.secret) && 'Must be a valid base64 encoded string',
				)}

				<Button
					onPress={this.onPressSave}
					title="Save"
					icon={{ name: 'save' }}
					backgroundColor={COLORS.NEPHRITIS}
					buttonStyle={styles.button}
					disabled={!isValid()}
					large
				/>
			</ScrollView>
		);
	}
}

export default withNavigation(AddEntry);
