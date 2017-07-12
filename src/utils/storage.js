import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';

const NAMESPACE = 'com.maienm.twofactorauth@';

export class Normal {
	static list() {
		return AsyncStorage.getAllKeys()
			.then((keys) => (keys
				.filter((k) => k.startsWith(NAMESPACE))
				.map((k) => k.substr(NAMESPACE.length))
			));
	}

	static get(key) {
		return AsyncStorage.getItem(`${NAMESPACE}${key}`)
			.then((value) => (value === null ? undefined : value));
	}

	static set(key, value) {
		return AsyncStorage.setItem(`${NAMESPACE}${key}`, value);
	}

	static remove(key) {
		return AsyncStorage.removeItem(`${NAMESPACE}${key}`);
	}
}

const unpackCredentials = (cred, def) => ((cred && cred.password) ? JSON.parse(cred.password) : def);
const getList = () => Keychain.getGenericPassword().then((cred) => unpackCredentials(cred, []));
const setList = (list) => Keychain.setGenericPassword('list', JSON.stringify(list));

export class Secure {
	static list() {
		return getList();
	}

	static get(key) {
		return Keychain.getInternetCredentials(key)
			.then((cred) => unpackCredentials(cred));
	}

	static set(key, value) {
		return getList()
			.then((list) => setList(list.concat([key])))
			.then(() => Keychain.setInternetCredentials(key, 'secret', JSON.stringify(value)))
			.then(() => null);
	}

	static remove(key) {
		return getList()
			.then((list) => setList(list.filter((k) => k !== key)))
			.then(() => Keychain.resetInternetCredentials(key))
			.then(() => null);
	}
}

export const withLogging = (sClass) => {
	const logResult = (name, ...args) => (data) => {
		// eslint-disable-next-line no-console
		console.debug(`${sClass.name}.${name}(${args.map(JSON.stringify).join(', ')})`, data);
		return data;
	};
	return {
		list: (...args) => sClass.list(...args).then(logResult('list', ...args)),
		get: (...args) => sClass.get(...args).then(logResult('get', ...args)),
		set: (...args) => sClass.set(...args).then(logResult('set', ...args)),
		remove: (...args) => sClass.remove(...args).then(logResult('remove', ...args)),
	};
};

