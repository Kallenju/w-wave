module.exports = (api) => {
	const presets = [
		[
			'@babel/preset-env',
			{
				browserslistEnv: 'development',
				useBuiltIns: 'usage',
				corejs: { version: '3.32' },
				modules: 'commonjs',
				exclude: ['proposal-dynamic-import'],
			},
		],
		['@babel/preset-typescript'],
	];

	const exclude = [/node_modules/];

	api.cache(true);

	return {
		presets,
		exclude,
	};
};
