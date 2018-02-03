import _ from 'lodash';
import * as JSON from './json';
import * as persist from './persist';

class MockStorage {
	constructor() {
		this.data = {};
	}

	async getItem(key) {
		return this.data[key];
	}

	async setItem(key, value) {
		this.data[key] = value;
	}

	async removeItem(key) {
		delete this.data[key];
	}
}

const STORAGE_COUNT = 2;
const KEY = 'persist';
let storage, storages, storage0, storage1;
beforeEach(() => {
	storage0 = new MockStorage();
	storage1 = new MockStorage();
	storages = [storage0, storage1];
	storage = new persist.MultiStorage(
		{ storage0, storage1 },
		[
			{
				match: /^fleeting/,
				storage: null,
			}, {
				match: /^in0/,
				storage: 'storage0',
			}, {
				match: /^in1/,
				storage: 'storage1',
			}, {
				match: /^complex\.[^.]+\.in1/,
				storage: 'storage1',
			}, {
				match: /^complex/,
				storage: 'storage0',
			},
		],
	);
});

// Helpers to talk to storage without having to do JSON casting
const getItem = async (key) => persist.fromStorage(await storage.getItem(key));
const setItem = async (key, value) => await storage.setItem(key, persist.toStorage(value));
const removeItem = async (key) => await storage.removeItem(key);

// Helpers to modify the storage data directly
const getStorage = (i) => _.mapValues(storages[i].data, persist.fromStorage);
const setStorage = (i, data) => storages[i].data = _.mapValues(data, persist.toStorage);

describe('fromStorage', () => {
	it('should parse nested JSONified objects correctly', () => {
		const input = JSON.stringify({ a: JSON.stringify({ b: 2 }) });
		const expected = { a: { b: 2 } };
		expect(persist.fromStorage(input)).toEqual(expected);
	});

	it('should parse nested JSONified scalar values correctly', () => {
		const input = JSON.stringify({ a: JSON.stringify(2) });
		const expected = { a: 2 };
		expect(persist.fromStorage(input)).toEqual(expected);
	});

	it('should not allow JSONified scalar values', () => {
		const input = JSON.stringify(2);
		expect(() => persist.fromStorage(input)).toThrow();
	});
});

describe('toStorage', () => {
	it('should JSONify nested objects correctly', () => {
		const input = { a: { b: 2 } };
		const expected = JSON.stringify({ a: JSON.stringify({ b: 2 }) });
		expect(persist.toStorage(input)).toEqual(expected);
	});

	it('should JSONify nested scalar values correctly', () => {
		const input = { a: 2 };
		const expected = JSON.stringify({ a: JSON.stringify(2) });
		expect(persist.toStorage(input)).toEqual(expected);
	});

	it('should JSONify scalar values correctly', () => {
		const input = 2;
		expect(() => persist.toStorage(input)).toThrow();
	});
});

describe('getItem gets the data properly', () => {
	_([
		{
			data: [
				{ [KEY] : { in1: { a: 1 } } },
				{ [KEY] : { in2: { b: 2 } } },
			],
			tests: [
				[KEY, { in1: { a: 1 }, in2: { b: 2 } }],
			],
		},
		{
			data: [
				{ [KEY]: { complex: { a: 1 } } },
				{ [KEY]: { complex: { b: { in2: 2 } } } },
			],
			tests: [
				[KEY, { complex: { a: 1, b: { in2: 2 } } }],
			],
		},
	]).each(({ data, tests }) => {
		describe(_(data).map((d, i) => `storage${i} = ${JSON.stringify(d)}`).join(', '), () => {
			beforeEach(() => {
				_.each(data, (d, i) => {
					setStorage(i, d);
				});
			});

			_.each(tests, ([key, expected]) => {
				it(`key ${key} should be ${JSON.stringify(expected)}`, async () => {
					expect(await getItem(key)).toEqual(expected);
				});
			});
		});
	});
});

describe('setItem spreads over storage engines appropriately', () => {
	_([
		[{ in0: { a: 1 } }, [0]],
		[{ in1: { a: 1 } }, [1]],
		[{ complex: { a: { in1: 1 } } }, [1]],
		[{ complex: { a: 1, b: { in1: 2 } } }, [0, 1]],
		[{ complex: { a: 1, b: { in1: { c: 2 } } } }, [0, 1]],
		[{ complex: { a: 1, b: { in1: { c: 2 } } } }, [0, 1]],
		[{ fleeting: 1 }, []],
		[{ unknown: 1 }, []],
	]).each(([value, storagesWithData]) => {
		describe(`${KEY} = ${JSON.stringify(value)}`, () => {
			beforeEach(async () => {
				await setItem(KEY, value);
			});

			_(STORAGE_COUNT).range().each((i) => {
				if (_.includes(storagesWithData, i)) {
					it(`storage${i} should have data`, () => {
						expect(getStorage(i)).not.toEqual({});
					});
				} else {
					it(`storage${i} should not have data`, () => {
						expect(getStorage(i)).toEqual({});
					});
				}
			});
		});
	});
});

describe('removeItem removes the data properly', () => {
	_([
		{
			data: [
				{ [KEY]: { in1: { a: 1 } }, 'a': { c: 3 } },
				{ [KEY]: { in2: { b: 2 } } },
			],
			tests: [
				[KEY, { a: { c: 3 } }, {}],
				['a', { [KEY]: { in1: { a: 1 } } }, { [KEY]: { in2: { b: 2 } } }],
			],
		},
	]).each(({ data, tests }) => {
		const inputString =_(data).map((d, i) => `storage${i} = ${JSON.stringify(d)}`).join(', ');
		describe(inputString, () => {
			_.each(tests, ([key, ...expectedData]) => {
				describe(`removing ${key}`, () => {
					beforeEach(async () => {
						_.each(data, (d, i) => {
							setStorage(i, d);
						});
						await removeItem(key);
					});

					_.each(expectedData, (d, i) => {
						it(`storage${i} should be ${JSON.stringify(d)}`, () => {
							expect(getStorage(i)).toEqual(d);
						});
					});
				});
			});
		});
	});
});

