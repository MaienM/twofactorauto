import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';

const NAMESPACE = 'com.maienm.twofactorauth@';

export class Normal {
	static list() {
		return AsyncStorage.listAllKeys();
	}

	static get(key) {
		return AsyncStorage.getItem(`${NAMESPACE}:${key}`)
			.then((val) => (val === null ? undefined : val));
	}

	static set(key, value) {
		return AsyncStorage.setItem(`${NAMESPACE}:${key}`, value);
	}

	static remove(key) {
		return AsyncStorage.removeItem(`${NAMESPACE}:${key}`);
	}
}

export class Secure {
	static get(key) {
		return Keychain.getInternetCredentials(key)
			.then((cred) => ((cred && cred.password) ? JSON.parse(cred.password) : undefined));
	}

	static set(key, value) {
		return Keychain.setInternetCredentials(key, 'secret', JSON.stringify(value))
			.then(() => null);
	}

	static remove(key) {
		return Keychain.resetInternetCredentials(key)
			.then(() => null);
	}
}

