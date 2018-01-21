const blacklist = require('metro/src/blacklist')

module.exports = {
	extraNodeModules: Object.assign({},
		// Make standard node modules available in react native
		require('node-libs-react-native'),

		// The above explicitly sets vm to null, which is wrong, so restore this
		{
			vm: require.resolve('vm'),
		}
	),

	// Workaround for a bug https://github.com/oblador/react-native-vector-icons/issues/626#issuecomment-357469857
	getBlacklistRE: function() {
		return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
	},
};

