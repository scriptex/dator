module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'dator.min.js',
		library: 'Validator',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader'
			}
		]
	}
};
