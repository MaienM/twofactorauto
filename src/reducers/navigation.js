import Navigator from '../Navigator';

export default (state, action) => Navigator.router.getStateForAction(action, state) || state;

