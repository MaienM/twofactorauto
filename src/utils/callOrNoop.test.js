import callOrNoop from './callOrNoop';

const args = [3, 4];

test('callOrNoop should return a scalar value when passed as first argument', () => {
	const input = 5;
	expect(callOrNoop(input, ...args)).toBe(input);
});

test('callOrNoop should return an object when passed as first argument', () => {
	const input = { foo: 4, bar: 5 };
	expect(callOrNoop(input, ...args)).toBe(input);
});

test('callOrNoop should call a functions when passed as first argument', () => {
	const input = (a, b) => a + b;
	expect(callOrNoop(input, ...args)).toBe(7);
});

