const _ = require('lodash');
const applyExtends = require('eslint/lib/config/config-file').applyExtends;
const airbnb = require('eslint-config-airbnb');

// Instead of using extends, load the base config and modify the resulting object to allow more fine-grained overrides
const config = applyExtends(airbnb, {}, require.resolve('eslint-config-airbnb'), __dirname);

// Set babel as parser
config.parser = 'babel-eslint';

// Enable jest
config.env.jest = true;

// Tabs for indentation
config.rules['no-tabs'] = 'off';
config.rules['indent'][1] = 'tab';
config.rules['react/jsx-indent'][1] = 'tab';
config.rules['react/jsx-indent-props'][1] = 'tab';

// More sensible max line length
config.rules['max-len'][1] = 120;

// Consistency, even if there is only one param
config.rules['arrow-parens'][1] = 'always';

// I have seen no arguments against use of ++ that don't boil down to "understand what an operator does before using it"
config.rules['no-plusplus'] = 'off';

// Avoid directly mutating the state
config.rules['react/no-direct-mutation-state'] = 'error';

// React native does not support .jsx
config.rules['react/jsx-filename-extension'][1]['extensions'] = ['.js'];

module.exports = config;

