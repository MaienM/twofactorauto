# Two Factor Auto

[![build status](http://gitlab.waxd.nl/MaienM/twofactorauto/badges/master/build.svg)](http://gitlab.waxd.nl/MaienM/twofactorauto/commits/master)

The goal of this project is to have an app that can be used for most of your two-factor-authentication purposes, and
which makes using TFA everywhere as quick and easy as possible.

To achieve this, the app will support as many TFA flavors as possible, making it possible to use the app as a
replacement for some proprietary TFA apps such as Steam Guard or Battle.net Authenticator.

Additionally, several browser extentions will be available that makes it possible for the browser to automatically
request a TFA code when needed. A notification will then be displayed on the phone, where you can simply choose to allow
or deny this request. This way, the sensitive data is still only stored on your phone, but you don't have to find the
right entry in the list and then type a code manually, greatly simplifying the process.

## Algorithms

Supported:

- HOTP
- TOTP^1

[1] This is the one used by most sites. If you currently have codes in google authenticator, this is what they are.

Planned:

- Steam Guard
- Battle.net Authenticator

## Browsers

Supported:

- None

Planned:

- Google Chrome

## Setup

### Android

Before you can do any kind of development or releases for this app, you will need to configure a few things.

Copy `android/keystore.properties.example` to `android/keystore.properties`, and edit the file to point to the correct
keystore(s). If you don't currently have a keystore, you can use the following command to generate a keystore for
development purposes:

```
keytool -genkey -v -keystore debug.keystore -alias debug -keyalg RSA -keysize 2048 -validity 10000
```

## Development

During development, a local server will have to be running at all times. To start this server, use the following
command:

```
npm run start
```

### Android

To build, install and run a debug build, use the following command:

```
npm run android
```

This also automatically setups the required port forwards, and displays the log output.

## Release

### Android

To build releases, make sure that `android/keystore.properties` is setup to use the correct keystores. Then, simply run:

```
npm run android-build-bundle
npm run android-build-apk -- Release # or Beta
```

## More docs

This project was bootstrapped with [Create React Native
App](https://github.com/react-community/create-react-native-app), and was since ejected. Some of the
[docs](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md)
may still be relevant.
