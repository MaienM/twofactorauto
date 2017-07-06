import { StackNavigator } from 'react-navigation';
import Home from './screens/Home';
import AddEntry from './screens/AddEntry';

const App = StackNavigator({
	Home: { screen: Home },
	AddEntry: { screen: AddEntry },
});

export default App;
