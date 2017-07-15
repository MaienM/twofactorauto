import COLORS from 'flatui-colors';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableHighlight, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { navigate } from '../actions/navigation';
import debouncedTouchable from '../components/DebouncedTouchable';
import Entry from '../components/Entry';
import withNavigation from '../components/Navigation';
import { routes } from '../constants';

const DebouncedTouchableHighlight = debouncedTouchable(TouchableHighlight);

class Home extends React.Component {
	static renderHeaderRight({ navigation }) {
		return (
			<DebouncedTouchableHighlight onPress={() => navigation.navigate(routes.entry.add)}>
				<Icon name="add" size={40} color={COLORS.CLOUDS} />
			</DebouncedTouchableHighlight>
		);
	}

	render() {
		return (
			<FlatList
				data={this.props.entries}
				renderItem={({ item }) => (
					<Entry
						uuid={item.uuid}
						onPressEdit={() => this.props.onEditEntry(item.uuid)}
					/>
				)}
			/>
		);
	}
}

Home.propTypes = {
	entries: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		uuid: PropTypes.string.isRequired,
	})).isRequired,
	onEditEntry: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	entries: _(state.order).without(null).map((uuid) => ({ uuid, key: uuid })).value(),
});

const mapDispatchToProps = (dispatch) => ({
	onEditEntry: (uuid) => dispatch(navigate(routes.entry.edit, { uuid })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Home));

