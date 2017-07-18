import Navigator from '../../screens';

export default (state, action) => Navigator.router.getStateForAction(action, state) || state;

