/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

class Modes {
	static IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

	static IS_PRODUCTION = !this.IS_DEVELOPMENT;
}

class Paths {
	static SRC = path.resolve(__dirname, 'src');

	static DIST = path.resolve(__dirname, 'dist');

	static TEST = path.join(__dirname, 'gw-test');
}

const bundleName = () =>
	Modes.IS_PRODUCTION ? 'bundle.[contenthash].js' : 'bundle.js';

module.exports = {
	mode: Modes.IS_PRODUCTION ? 'production' : 'development',
	entry: path.resolve(Paths.SRC, 'index.ts'),
	target: 'web',
	devtool: Modes.IS_DEVELOPMENT ? 'source-map' : false,
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: Modes.IS_PRODUCTION ? 'bundle.[contenthash].js' : 'bundle.js',
		path: Paths.DIST
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(Paths.DIST, bundleName()),
					to: Paths.TEST,
					noErrorOnMissing: true
				}
			]
		}),
		new ESLintPlugin({
			useEslintrc: true,
			fix: true,
			eslintPath: require.resolve('eslint'),
			extensions: ['ts']
		})
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: Modes.IS_DEVELOPMENT
								? 'tsconfig.json'
								: 'tsconfig.prod.json'
						}
					}
				],
				exclude: /node_modules/
			}
		]
	}
};
