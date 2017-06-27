import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Entry from '../components/Entry';

const styles = StyleSheet.create({
	container: {
		padding: 5,
	},
});

export default class EntryListView extends React.Component {
	render() {
		return (
			<FlatList
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
				renderItem={({item}) => <Entry {...item} />}
			/>
		);
	}
}
