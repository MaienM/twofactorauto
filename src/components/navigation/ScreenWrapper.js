import compose from '../../utils/compose';
import withDialogRenderer from './WithDialogRenderer';
import withNavigationParamsProp from './WithNavigationParamsProp';

export default compose(withDialogRenderer, withNavigationParamsProp);

