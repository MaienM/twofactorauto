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

// Spacing is fine, but don't overdo it
config.rules['no-multiple-empty-lines'][1]['max'] = 1;

// I have seen no arguments against use of ++ that don't boil down to "understand what an operator does before using it"
config.rules['no-plusplus'] = 'off';

// Forbid a space between 'function' and the opening '(' when the function is unnamed
config.rules['space-before-function-paren'][1]['anonymous'] = 'never';

// Consistent import order
// Uses a feature implemented in https://github.com/benmosher/eslint-plugin-import/pull/629
config.rules['import/order'][0] = 'error';
config.rules['import/order'][1]['sort'] = 'alphabetical';

// Avoid directly mutating the state
config.rules['react/no-direct-mutation-state'] = 'error';

// React native does not support .jsx
config.rules['react/jsx-filename-extension'][1]['extensions'] = ['.js'];

// Enforce consistent jsx event props and handler names
config.rules['react/jsx-handler-names'][0] = 'error';

module.exports = config;

