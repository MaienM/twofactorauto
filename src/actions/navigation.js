import { NavigationActions } from 'react-navigation';

// Navigate between screens
export const navigate = (routeName, params = {}) => NavigationActions.navigate({ routeName, params });
export const back = (key = null) => NavigationActions.back({ key });

