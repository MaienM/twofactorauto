import { StackNavigator } from 'react-navigation';
import { Home, AddEntry, EditEntry } from './screens';

export default StackNavigator({
	Home: {
		screen: Home,
	},
	AddEntry: {
		screen: AddEntry,
	},
	EditEntry: {
		screen: EditEntry,
	},
});

