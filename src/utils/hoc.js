const getName = (component, _default) => component.displayname || component.name || _default;

// The entire point of this function is to setup properties on a HOC based on
// the properties of the base component
/* eslint-disable no-param-reassign */
export default (base, higherOrder) => {
	higherOrder.propTypes = base.propTypes;
	higherOrder.defaultProps = base.defaultProps;
	higherOrder.displayName = `${getName(higherOrder, 'unnamedHOC')}(${getName(base, 'UnnamedComponent')})`;
};
/* eslint-enable */

