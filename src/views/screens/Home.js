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

const HeaderRight = (props) => (
	<NavigationButtons>
		<NavigationButtons.Button onPress={props.onNavigationAdd}>
			<Icon name="add" size={40} color={COLORS.CLOUDS} />
		</NavigationButtons.Button>
	</NavigationButtons>
);

HeaderRight.propTypes = {
	onNavigationAdd: PropTypes.func.isRequired,
};

const mapHeaderDispatchToProps = (dispatch) => ({
	onNavigationAdd: () => dispatch(navigate(routes.entry.add)),
});

const HomeHeaderRight = connect(null, mapHeaderDispatchToProps)(HeaderRight);

const Home = (props) => (
	<FlatList
		data={props.entries}
		renderItem={({ item }) => (
			<Entry
				uuid={item.uuid}
				onPressEdit={() => props.onEditEntry(item.uuid)}
				onPressDelete={() => props.onDeleteEntry(item.uuid)}
			/>
		)}
	/>
);

Home.propTypes = {
	entries: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string.isRequired,
		uuid: PropTypes.string.isRequired,
	})).isRequired,
	onEditEntry: PropTypes.func.isRequired,
	onDeleteEntry: PropTypes.func.isRequired,
};

Home.navigationOptions = {
	headerRight: <HomeHeaderRight />,
};

const mapStateToProps = (state) => ({
	entries: _(state.order).without(null).map((uuid) => ({ uuid, key: uuid })).value(),
});

const mapDispatchToProps = (dispatch) => ({
	onEditEntry: (uuid) => dispatch(navigate(routes.entry.edit, { uuid })),
	onDeleteEntry: (uuid) => dispatch(dialog(routes.entry.delete, { uuid })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

