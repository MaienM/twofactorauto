import COLORS from 'flatui-colors';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import router from '../../views';
import screenWrapper from './ScreenWrapper';

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLORS.PETER_RIVER,
	},

	headerTitle: {
		color: COLORS.CLOUDS,
		fontSize: 20,
	},

	headerBackTitleStyle: {
		color: COLORS.CLOUDS,
	},

	headerRight: {
		marginRight: 10,
	},
});

// Extract routes that react-navigation can render
const routes = _(router.routes)
	.filter((r) => r.isScreen())
	.map((r) => [r.key, { ...r, screen: screenWrapper(r.screen) }])
	.fromPairs()
	.value();

// Create navigator component
export default StackNavigator(routes, {
	navigationOptions: {
		title: 'Two Factor Auto',
		headerStyle: styles.header,
		headerTitleStyle: styles.headerTitle,
		headerBackTitleStyle: styles.headerBackTitleStyle,
		headerTintColor: COLORS.CLOUDS,
	},
});

