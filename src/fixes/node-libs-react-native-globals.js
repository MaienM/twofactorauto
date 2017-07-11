// Taken from node-libs-react-native
// For some reason, this file is not included in the npm package
/* eslint-disable */

global.Buffer = require('buffer').Buffer;
global.process = require('process');

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'file:',
};

// Some modules expect userAgent to be a string
global.navigator.userAgent = 'React Native';

/* eslint-enable */
