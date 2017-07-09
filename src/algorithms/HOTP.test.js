import _ from 'lodash';
import HOTP from './HOTP';

// Test cases defined in the RFC
const secret = '12345678901234567890';
const length = 6;
const rfcTestCases = [
	// count, expected
	[0, '755224'],
	[1, '287082'],
	[2, '359152'],
	[3, '969429'],
	[4, '338314'],
	[5, '254676'],
	[6, '287922'],
	[7, '162583'],
	[8, '399871'],
	[9, '520489'],
];
_.each(rfcTestCases, ([counter, expected]) => {
	test(`RFC testcase for count ${counter}`, () => {
		const hotp = new HOTP({ secret, counter, length });
		expect(hotp.generate()).toBe(expected);
	});
});

test('generate without a counter increments the counter', () => {
	const hotp = new HOTP({ secret, length, counter: 0 });
	hotp.generate();
	expect(hotp.counter).toBe(1);
});

test('generate with a counter does not increment the counter', () => {
	const hotp = new HOTP({ secret, length, counter: 0 });
	hotp.generate({ counter: 1 });
	expect(hotp.counter).toBe(0);
});

test("persist's output can be used to create a new instance", () => {
	const hotp = new HOTP({ secret, length, counter: 0 });
	hotp.generate();
	const persisted = hotp.persist();
	const hotp2 = new HOTP(persisted);
	expect(hotp2.generate()).toBe(hotp.generate());
});

