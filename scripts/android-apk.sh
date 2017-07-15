#!/bin/sh

set -o errexit -o nounset

# Check whether all neccesary files exist
if [ ! -f android/keystore.properties ]; then
	echo >&2 "keystore.properties is missing, please see the setup section of the readme"
	exit 1
fi
if [ ! -f android/app/src/main/assets/index.android.bundle ]; then
	echo >&2 "android bundle is missing, please run scripts/android-bundle.sh first"
	exit 1
fi

# Build the APK
echo ">>> Building the apk..."
(
	cd android;
	./gradlew assemble${1:-Release};
)

