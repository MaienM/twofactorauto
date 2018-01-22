import COLORS from 'flatui-colors';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import debouncedTouchable from '../../components/DebouncedTouchable';
import FormInputPicker from '../../components/FormInputPicker';
import * as buf from '../../utils/buffer';
import FormValidation from '../../components/FormValidation';

const DebouncedButton = debouncedTouchable(Button);

const styles = StyleSheet.create({
	container: {
	},

	button: {
		marginTop: 10,
	},
});

export default class EntryForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: _.get(props, 'entry.name', ''),
			service: _.get(props, 'entry.service', ''),
			algorithm: _.get(props, 'entry.algorithm', null),
			secret: _.get(props, 'secrets.secret', ''),
		};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeService = this.handleChangeService.bind(this);
		this.handleChangeAlgorithm = this.handleChangeAlgorithm.bind(this);
		this.handleChangeSecret = this.handleChangeSecret.bind(this);
		this.handlePressSave = this.handlePressSave.bind(this);
	}

	handleChangeName(name) {
		this.setState({ name });
	}

	handleChangeService(service) {
		this.setState({ service });
	}

	handleChangeAlgorithm(algorithm) {
		this.setState({ algorithm });
	}

	handleChangeSecret(secret) {
		this.setState({ secret });
	}

	handlePressSave() {
		this.props.onSave({
			entry: {
				name: this.state.name,
				service: this.state.service,
				algorithm: this.state.algorithm,
			},
			secrets: {
				secret: this.state.secret,
			},
		});
	}

	render() {
		const validation = new FormValidation();
		return (
			<ScrollView style={styles.container}>
				<FormLabel>Name</FormLabel>
				<FormInput
					onChangeText={this.handleChangeName}
					value={this.state.name}
					placeholder="Name"
					returnKeyType="next"
				/>
				{validation.runValidation(!this.state.name && 'Cannot be empty')}

				<FormLabel>Service</FormLabel>
				<FormInput
					onChangeText={this.handleChangeService}
					value={this.state.service}
					placeholder="Service"
					returnKeyType="next"
				/>
				{validation.runValidation(!this.state.service && 'Cannot be empty')}

				<FormLabel>Algorithm</FormLabel>
				<FormInputPicker onValueChange={this.handleChangeAlgorithm} value={this.state.algorithm}>
					<FormInputPicker.Item label="" value={null} />
					<FormInputPicker.Item label="HOTP" value="hotp" />
					<FormInputPicker.Item label="TOTP" value="totp" />
				</FormInputPicker>
				{validation.runValidation(!this.state.algorithm && 'Cannot be empty')}

				<FormLabel>Secret (base64 encoded)</FormLabel>
				<FormInput
					onChangeText={this.handleChangeSecret}
					value={this.state.secret}
					placeholder="Secret"
				/>
				{validation.runValidation(
					!this.state.secret && 'Cannot be empty',
					!buf.fromBase64(this.state.secret) && 'Must be a valid base64 encoded string',
				)}

				<DebouncedButton
					onPress={this.handlePressSave}
					wait={1000}
					title="Save"
					icon={{ name: 'save' }}
					backgroundColor={COLORS.NEPHRITIS}
					buttonStyle={styles.button}
					disabled={!validation.isValid()}
					large
				/>
			</ScrollView>
		);
	}
}

EntryForm.propTypes = {
	onSave: PropTypes.func.isRequired,
};

