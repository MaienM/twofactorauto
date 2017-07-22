import _ from 'lodash';
import assignCallOrNoop from './assignCallOrNoop';

const staticFooOne = { foo: 1 };
const staticFooTwo = { foo: 2 };
const staticBarOne = { bar: 1 };
const methodFooOne = () => staticFooOne;
const methodFooTwo = () => staticFooTwo;
const methodBarOne = () => staticBarOne;
const methodBarVariable = (bar) => ({ bar });

test('assignCallOrNoop should not modify the first object', () => {
	assignCallOrNoop(staticFooOne, staticFooTwo);
	expect(staticFooOne).toEqual({ foo: 1 });
});

test('assignCallOrNoop should merge multiple objects into one', () => {
	const merged = assignCallOrNoop(staticFooOne, staticBarOne, staticFooTwo);
	expect(merged).toEqual({ foo: 2, bar: 1 });
});

test('assignCallOrNoop should merge multiple methods into one', () => {
	const merged = assignCallOrNoop(methodFooOne, methodBarOne, methodFooTwo);
	expect(_.isFunction(merged)).toBe(true);
	expect(merged(1)).toEqual({ foo: 2, bar: 1 });
});

test('assignCallOrNoop should merge a mixture of objects and methods into one method', () => {
	const merged = assignCallOrNoop(staticFooOne, methodBarOne, staticFooTwo);
	expect(_.isFunction(merged)).toBe(true);
	expect(merged(1)).toEqual({ foo: 2, bar: 1 });
});

test('assignCallOrNoop should create a method that properly passes on argument to the original methods', () => {
	const merged = assignCallOrNoop(staticFooOne, staticBarOne, methodBarVariable);
	expect(_.isFunction(merged)).toBe(true);
	expect(merged(3)).toEqual({ foo: 1, bar: 3 });
});

