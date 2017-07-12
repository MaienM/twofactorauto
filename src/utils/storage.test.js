import _ from 'lodash';
import * as storage from './storage';

const mockStore = {};
beforeEach(() => {
	mockStore.Normal = {};
	mockStore.Secure = {
		generic: null,
		internet: {},
	};
});

// Mock AsyncStorage with a simple in-memory storage
jest.mock('react-native', () => {
	const _ = require('lodash'); // eslint-disable-line
	return {
		AsyncStorage: {
			getAllKeys: () => Promise.resolve(_.keys(mockStore.Normal)),
			getItem: (key) => Promise.resolve(mockStore.Normal[key]),
			setItem: (key, value) => {
				mockStore.Normal[key] = value;
				return Promise.resolve();
			},
			removeItem: (key) => {
				delete mockStore.Normal[key];
				return Promise.resolve();
			},
		},
	};
});

// Mock Keychain with a simple in-memory storage
jest.mock('react-native-keychain', () => {
	const _ = require('lodash'); // eslint-disable-line
	return {
		getGenericPassword: () => Promise.resolve(mockStore.Secure.generic),
		setGenericPassword: (username, password) => {
			mockStore.Secure.generic = { username, password };
			return Promise.resolve();
		},

		getInternetCredentials: (server) => Promise.resolve(mockStore.Secure.internet[server]),
		setInternetCredentials: (server, username, password) => {
			mockStore.Secure.internet[server] = { server, username, password };
			return Promise.resolve();
		},
		resetInternetCredentials: (server) => {
			delete mockStore.Secure.internet[server];
			return Promise.resolve();
		},
	};
});

_(storage).pick(['Normal', 'Secure']).each((sClass, key) => {
	test(`${key}.list returns an empty list when the store is empty`, () => (
		sClass.list()
			.then((list) => expect(list).toEqual([]))
	));

	test(`${key}.get returns undefined for an unset key`, () => (
		sClass.get('test')
			.then((value) => expect(value).toBe(undefined))
	));

	test(`${key}.get returns the value set with ${key}.set`, () => {
		const value = {
			foo: 'bar',
		};
		return sClass.set('test', value)
			.then(() => sClass.get('test'))
			.then((v) => expect(v).toEqual(value));
	});

	test(`${key}.list returns the keys set with ${key}.set`, () => (
		sClass.set('foo', 1)
			.then(() => sClass.set('bar', 2))
			.then(() => sClass.list())
			.then((list) => expect(list).toEqual(['foo', 'bar']))
	));

	test(`${key}.get returns undefined after a value has been removed with ${key}.remove`, () => (
		sClass.set('test', 1)
			.then(() => sClass.remove('test'))
			.then(() => sClass.get('test'))
			.then((v) => expect(v).toBe(undefined))
	));

	test(`${key}.list does not return keys that have been removed with ${key}.remove`, () => (
		sClass.set('foo', 1)
			.then(() => sClass.set('bar', 2))
			.then(() => sClass.remove('foo'))
			.then(() => sClass.list())
			.then((list) => expect(list).toEqual(['bar']))
	));
});

