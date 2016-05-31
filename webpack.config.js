var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: __dirname + '/src/index.tmpl.html',
			title: 'My App',
			filename: 'index.html',
			favicon:'favicon.ico'
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'src')
		},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}

		]
	}
};
