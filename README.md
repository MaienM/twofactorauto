This project was bootstrapped with [Create React Native
App](https://github.com/react-community/create-react-native-app), and was since ejected. Some of the
[docs](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md)
may still be relevant.

# Setup

## Android

Before you can do any kind of development or releases for this app, you will need to configure a few things.

Copy `android/keystore.properties.example` to `android/keystore.properties`, and edit the file to point to the correct
keystore(s). If you don't currently have a keystore, you can use the following command to generate a keystore for
development purposes:

```
keytool -genkey -v -keystore debug.keystore -alias debug -keyalg RSA -keysize 2048 -validity 10000
```

# Development

During development, a local server will have to be running at all times. To start this server, use the following
command:

```
npm run start
```

## Android

To build, install and run a debug build, use the following command:

```
npm run android
```

This also automatically setups the required port forwards, and displays the log output.

# Release

## Android

To build releases, make sure that `android/keystore.properties` is setup to use the correct keystores. Then, simply run:

```
npm run android-build-bundle
npm run android-build-apk -- Release # or Beta
```

