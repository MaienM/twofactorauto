import React from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from 'flatui-colors';
import Entry from '../components/Entry';

const styles = StyleSheet.create({
	container: {},

	navigation: {
		height: 50,
		backgroundColor: COLORS.PETER_RIVER,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	navigationTitle: {
		color: COLORS.CLOUDS,
		fontSize: 20,
	},

	navigationButtons: {
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},

	list: {},
});

export default class EntryListView extends React.Component {
	constructor(props) {
		super(props);

		this.onPressAdd = this.onPressAdd.bind(this);
	}

	onPressAdd() {
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.navigation}>
					<Text style={styles.navigationTitle}>Two Factor Auto</Text>
					<View style={styles.navigationButtons}>
						<TouchableHighlight onPress={this.onPressAdd}>
							<Icon name="add" size={50} color={COLORS.CLOUDS} />
						</TouchableHighlight>
					</View>
				</View>
				<FlatList
					style={styles.list}
					data={[
						{ key: 0, name: 'Google', url: 'google.com' },
						{ key: 1, name: 'Github', url: 'github.com' },
						{ key: 2, name: 'Gitlab', url: 'gitlab.org' },
						{ key: 3, name: 'Google', url: 'google.com' },
						{ key: 4, name: 'Github', url: 'github.com' },
						{ key: 5, name: 'Gitlab', url: 'gitlab.org' },
						{ key: 6, name: 'Google', url: 'google.com' },
						{ key: 7, name: 'Github', url: 'github.com' },
						{ key: 8, name: 'Gitlab', url: 'gitlab.org' },
						{ key: 9, name: 'Google', url: 'google.com' },
						{ key: 10, name: 'Github', url: 'github.com' },
						{ key: 11, name: 'Gitlab', url: 'gitlab.org' },
						{ key: 12, name: 'Google', url: 'google.com' },
						{ key: 13, name: 'Github', url: 'github.com' },
						{ key: 14, name: 'Gitlab', url: 'gitlab.org' },
					]}
					renderItem={({ item }) => <Entry {...item} />}
				/>
			</View>
		);
	}
}

