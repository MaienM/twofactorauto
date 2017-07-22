#!/bin/sh

while true; do
	echo ">>> Waiting for device... (Ctrl-C to stop)"
	adb wait-for-device

	echo ">>> Setting up reverse forward on port 8081..."
	adb reverse tcp:8081 tcp:8081

	echo ">>> Displaying log..."
	react-native log-android
done
