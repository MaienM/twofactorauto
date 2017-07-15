import { StackNavigator } from 'react-navigation';
import { routes } from '../constants';
import AddEntry from './AddEntry';
import EditEntry from './EditEntry';
import Home from './Home';

export default StackNavigator({
	[routes.home]: {
		screen: Home,
	},
	[routes.entry.add]: {
		screen: AddEntry,
	},
	[routes.entry.edit]: {
		screen: EditEntry,
	},
});

