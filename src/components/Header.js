import { StyleSheet } from 'react-native';
import COLORS from 'flatui-colors';

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

const defaultNavigationOptions = {
	title: 'Two Factor Auto',
	headerStyle: styles.header,
	headerTitleStyle: styles.headerTitle,
	headerBackTitleStyle: styles.headerBackTitleStyle,
	headerTintColor: COLORS.CLOUDS,
};

export { defaultNavigationOptions };
export default { defaultNavigationOptions };

