FROM alpine AS build

RUN apk add --no-cache unzip openssl
RUN wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
RUN mkdir /opt
RUN unzip sdk-tools-linux-3859397.zip -d /opt/android-sdk

################################################################################

FROM node:boron
MAINTAINER Michon van Dooren <michon1992@gmail.com>

COPY --from=build /opt/android-sdk /opt/android-sdk
RUN echo deb http://http.debian.net/debian jessie-backports main > /etc/apt/sources.list.d/java8.list
RUN apt-get update \
	&& apt-get install -y lib32stdc++6 lib32z1 \
	&& apt-get install -y -t jessie-backports openjdk-8-jdk \
	&& rm -rf /var/lib/apt/lists/*
RUN echo 'y' | /opt/android-sdk/tools/bin/sdkmanager "build-tools;27.0.3"
RUN echo 'y' | /opt/android-sdk/tools/bin/sdkmanager "platforms;android-27"
RUN echo 'y' | /opt/android-sdk/tools/bin/sdkmanager "platform-tools"
RUN echo 'y' | /opt/android-sdk/tools/bin/sdkmanager "extras;android;m2repository"

ENV ANDROID_HOME /opt/android-sdk
ENV PATH $ANDROID_HOME/platform-tools:$PATH
