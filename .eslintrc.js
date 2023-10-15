module.exports = {
	env: {
		browser: true,
		es2022: true,
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'ES2022',
		sourceType: 'commonjs',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'no-param-reassign': 0,
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/no-var-requires': 0,
		'prettier/prettier': 'error',
		'global-require': 0,
	},
	settings: {
		'import/resolver': {
			typescript: true,
		},
	},
};
