import React from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from 'flatui-colors';
import { defaultNavigationOptions } from '../components/Header';
import Entry from '../components/Entry';

const styles = StyleSheet.create({
	navigationButtons: {
		marginRight: 10,
		// justifyContent: 'flex-end',
		// flexDirection: 'row',
	},
});

export default class Home extends React.Component {
	static navigationOptions({ navigation }) {
		return {
			...defaultNavigationOptions,
			headerRight: (
				<View style={styles.navigationButtons}>
					<TouchableHighlight onPress={() => navigation.navigate('AddEntry')}>
						<Icon name="add" size={40} color={COLORS.CLOUDS} />
					</TouchableHighlight>
				</View>
			),
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.navigation}>
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

