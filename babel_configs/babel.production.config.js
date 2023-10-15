module.exports = (api) => {
	const presets = [
		[
			'@babel/preset-env',
			{
				browserslistEnv: 'production',
				useBuiltIns: 'usage',
				corejs: { version: '3.32' },
				modules: 'commonjs',
				exclude: ['proposal-dynamic-import'],
			},
		],
		['@babel/preset-typescript'],
	];

	const exclude = [/node_modules/];

	api.cache(false);

	return {
		presets,
		exclude,
	};
};
