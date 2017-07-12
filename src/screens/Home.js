import COLORS from 'flatui-colors';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableHighlight, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Entry from '../components/Entry';
import withNavigation from '../components/Navigation';

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
				data={this.props.entries}
				renderItem={({ item }) => <Entry uuid={item.uuid} />}
			/>
		);
	}
}

Home.propTypes = {
	entries: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		uuid: PropTypes.string.isRequired,
	})).isRequired,
};

const mapStateToProps = (state) => ({
	entries: _(state.order).without(null).map((uuid) => ({ uuid, key: uuid })).value(),
});

export default connect(mapStateToProps, null)(withNavigation(Home));

