import _ from 'lodash';
import HOTP from './hotp';

// Test cases defined in the RFC
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
		const hotp = new HOTP({
			secret: '12345678901234567890',
			length: 6,
		});
		expect(hotp.generate({ counter })).toBe(expected);
	});
});
