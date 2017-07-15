#!/bin/sh

set -o errexit -o nounset

# Make sure folders exist
mkdir -p android/app/src/main/assets

# Build the bundle
echo ">>> Building the bundle..."
react-native bundle \
	--platform android \
	--dev false \
	--entry-file index.android.js \
	--bundle-output android/app/src/main/assets/index.android.bundle \
	--assets-dest android/app/src/main/res/

