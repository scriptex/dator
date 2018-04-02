const { resolve } = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: ['./node_modules']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						comments: false,
						presets: ['env', 'stage-2']
					}
				}
			}
		]
	}
};
