var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	devtool: 'cheap-module-source-map',

	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {'NODE_ENV': JSON.stringify('production')}
		}),
		new HtmlWebpackPlugin({
			template: __dirname + '/src/index.tmpl.html',
			favicon: __dirname + '/favicon.ico',
			googleAnalytics: {
				trackingId: 'UA-78655336-1',
				pageViewOnLoad: true
			}
		}),

		// turns out copying of favicon is included in HtmlWebpackPlugin
		// but this might be useful for other stuff later on:
		// new CopyWebpackPlugin([
		// 	{from: 'favicon.ico'}
		// ]),

		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('style.css')

	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css!less')
			}

		]
	}
};
