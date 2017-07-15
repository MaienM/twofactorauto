#!/bin/sh

set -o errexit

# Setup the keystore & its properties
echo ">>> Setting up keystore & keystore.properties"
echo "$KEYSTORE_BASE64" | base64 -d > android/app/beta.keystore
echo "storeFile=beta.keystore" > android/keystore.properties
echo "storePassword=${KEYSTORE_PASSWORD:-password}" >> android/keystore.properties
echo "betaKeyAlias=${KEYSTORE_KEY_ALIAS:-beta}" >> android/keystore.properties
echo "betaKeyPassword=${KEYSTORE_KEY_PASSWORD:-password}" >> android/keystore.properties

