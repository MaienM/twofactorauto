import _ from 'lodash';
import totp from './totp';

// Test cases defined in the RFC
const rfcTestCases = [
	/* eslint-disable no-multi-spaces */
	// hash,   time,                                        expected
	['SHA1',   new Date(Date.parse('1970-01-01T00:00:59Z')), '94287082'],
	['SHA256', new Date(Date.parse('1970-01-01T00:00:59Z')), '46119246'],
	['SHA512', new Date(Date.parse('1970-01-01T00:00:59Z')), '90693936'],
	['SHA1',   new Date(Date.parse('2005-03-18T01:58:29Z')), '07081804'],
	['SHA256', new Date(Date.parse('2005-03-18T01:58:29Z')), '68084774'],
	['SHA512', new Date(Date.parse('2005-03-18T01:58:29Z')), '25091201'],
	['SHA1',   new Date(Date.parse('2005-03-18T01:58:31Z')), '14050471'],
	['SHA256', new Date(Date.parse('2005-03-18T01:58:31Z')), '67062674'],
	['SHA512', new Date(Date.parse('2005-03-18T01:58:31Z')), '99943326'],
	['SHA1',   new Date(Date.parse('2009-02-13T23:31:30Z')), '89005924'],
	['SHA256', new Date(Date.parse('2009-02-13T23:31:30Z')), '91819424'],
	['SHA512', new Date(Date.parse('2009-02-13T23:31:30Z')), '93441116'],
	['SHA1',   new Date(Date.parse('2033-05-18T03:33:20Z')), '69279037'],
	['SHA256', new Date(Date.parse('2033-05-18T03:33:20Z')), '90698825'],
	['SHA512', new Date(Date.parse('2033-05-18T03:33:20Z')), '38618901'],
	['SHA1',   new Date(Date.parse('2603-10-11T11:33:20Z')), '65353130'],
	['SHA256', new Date(Date.parse('2603-10-11T11:33:20Z')), '77737706'],
	['SHA512', new Date(Date.parse('2603-10-11T11:33:20Z')), '47863826'],
	/* eslint-enable */
];
_.each(rfcTestCases, ([algorithm, time, expected]) => {
	test(`RFC testcase for ${algorithm} at ${time.toGMTString()}`, () => {
		const actual = totp({
			secret: '12345678901234567890',
			algorithm,
			length: 8,
			timestamp: time,
		});
		expect(actual).toBe(expected);
	});
});

