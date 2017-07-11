module.exports = {
	extraNodeModules: Object.assign({},
		// Make standard node modules available in react native
		require('node-libs-react-native'),
		// This explicitly sets vm to null, which is wrong
		{
			vm: require.resolve('vm'),
		}
	),
};

