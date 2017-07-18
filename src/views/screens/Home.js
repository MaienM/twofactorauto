import COLORS from 'flatui-colors';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { navigate, dialog } from '../../actions/navigation';
import Entry from '../../components/Entry';
import NavigationButtons from '../../components/navigation/NavigationButtons';
import { routes } from '../../constants';

class Home extends React.Component {
	renderHeaderRight() {
		return (
			<NavigationButtons>
				<NavigationButtons.Button onPress={this.props.onNavigationAdd}>
					<Icon name="add" size={40} color={COLORS.CLOUDS} />
				</NavigationButtons.Button>
			</NavigationButtons>
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
						onPressDelete={() => this.props.onDeleteEntry(item.uuid)}
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
	onDeleteEntry: PropTypes.func.isRequired,
	onNavigationAdd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	entries: _(state.order).without(null).map((uuid) => ({ uuid, key: uuid })).value(),
});

const mapDispatchToProps = (dispatch) => ({
	onEditEntry: (uuid) => dispatch(navigate(routes.entry.edit, { uuid })),
	onDeleteEntry: (uuid) => dispatch(dialog(routes.entry.delete, { uuid })),
	onNavigationAdd: () => dispatch(navigate(routes.entry.add)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

