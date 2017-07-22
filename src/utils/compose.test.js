import compose from './compose';

const plusOne = (a) => a + 1;
const minusOne = (a) => a - 1;
const timesTwo = (a) => a * 2;
const divideByTwo = (a) => a / 2;

test('compose should apply all functions', () => {
	const composed = compose(plusOne, plusOne, minusOne, plusOne);
	expect(composed(3)).toBe(5);
});

test('compose should apply the functions from right to left', () => {
	const composed = compose(minusOne, divideByTwo, plusOne, timesTwo);
	expect(composed(3)).toBe(2.5);
});

