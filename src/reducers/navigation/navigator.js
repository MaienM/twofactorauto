import Navigator from '../../components/navigation/Navigator';

export default (state, action) => Navigator.router.getStateForAction(action, state) || state;

