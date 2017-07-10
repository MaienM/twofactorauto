import React from 'react';
import { TouchableHighlight, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from 'flatui-colors';
import withNavigation from '../components/Navigation';
import Entry from '../components/Entry';

class Home extends React.Component {
	static renderHeaderRight({ navigation }) {
		return (
			<TouchableHighlight onPress={() => navigation.navigate('AddEntry')}>
				<Icon name="add" size={40} color={COLORS.CLOUDS} />
			</TouchableHighlight>
		);
	}

	render() {
		return (
			<FlatList
				data={[
					{ key: 0, name: 'Google', service: 'google.com' },
					{ key: 1, name: 'Github', service: 'github.com' },
					{ key: 2, name: 'Gitlab', service: 'gitlab.org' },
					{ key: 3, name: 'Google', service: 'google.com' },
					{ key: 4, name: 'Github', service: 'github.com' },
					{ key: 5, name: 'Gitlab', service: 'gitlab.org' },
					{ key: 6, name: 'Google', service: 'google.com' },
					{ key: 7, name: 'Github', service: 'github.com' },
					{ key: 8, name: 'Gitlab', service: 'gitlab.org' },
					{ key: 9, name: 'Google', service: 'google.com' },
					{ key: 10, name: 'Github', service: 'github.com' },
					{ key: 11, name: 'Gitlab', service: 'gitlab.org' },
					{ key: 12, name: 'Google', service: 'google.com' },
					{ key: 13, name: 'Github', service: 'github.com' },
					{ key: 14, name: 'Gitlab', service: 'gitlab.org' },
				]}
				renderItem={({ item }) => <Entry {...item} />}
			/>
		);
	}
}

export default withNavigation(Home);

