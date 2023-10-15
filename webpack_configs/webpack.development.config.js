/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.resolve(__dirname, '..', 'src', 'index.ts'),

	output: {
		filename: '[name].[fullhash:20].js',
		publicPath: '/',
	},

	plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        '..',
        'src',
        'index.ejs',
      ),
      inject: true,
      minify: false,
    }),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
	],

	module: {
		rules: [
			{
				test: /\.ejs$/,
				loader: 'ejs-loader',
				options: {
				  esModule: false,
				},
			},
			{
				test: /\.ts$/,
				include: path.resolve(__dirname, '..', 'src'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							cacheDirectory: true,
							configFile: path.resolve(
								__dirname,
								'..',
								'babel_configs',
								'babel.development.config.js',
							),
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, '..', 'src'),
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								config: path.resolve(
									__dirname,
									__dirname,
									'..',
									'postcss_configs',
									'postcss.development.config.js',
								),
							},
						},
					},
				],
			},
			{
				test: /\.(woff|woff2)$/,
				include: path.resolve(__dirname, '..', 'src', 'assets', 'fonts'),
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.(png|svg|jpg|gif|webp)$/,
				include: path.resolve(__dirname, '..', 'src'),
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]',
				},
			},
			{
				test: /\.ico$/,
				include: path.resolve(__dirname, '..', 'src', 'favicon.ico'),
				type: 'asset/resource',
				generator: {
					filename: '[name][ext]',
				},
			},
		],
	},

	devtool: 'eval-source-map',

	devServer: {
		port: 5500,
    compress: true,
		liveReload: true,
    watchFiles: ['src/**/*']
	},

	target: ['browserslist'],

	mode: 'development',

	optimization: {
		minimize: false,
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}`,
		},
	},
};
