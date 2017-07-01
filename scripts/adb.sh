#!/bin/sh

echo ">>> Waiting for device..."
adb wait-for-device

echo ">>> Setting up reverse forward on port 8081..."
adb reverse tcp:8081 tcp:8081

echo ">>> Displaying log..."
react-native log-android
