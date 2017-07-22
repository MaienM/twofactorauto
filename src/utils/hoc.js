import hoistNonReactStatic from 'hoist-non-react-statics';

const getName = (component, _default) => component.displayname || component.name || _default;

// The entire point of this function is to setup properties on a HOC based on
// the properties of the base component
/* eslint-disable no-param-reassign */
export default (base, higherOrder) => {
	hoistNonReactStatic(higherOrder, base);
	higherOrder.displayName = `${getName(higherOrder, 'unnamedHOC')}(${getName(base, 'UnnamedComponent')})`;
};
/* eslint-enable */

