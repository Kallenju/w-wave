/* eslint-disable import/no-extraneous-dependencies */
const mergeRules = require('postcss-merge-rules');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		cssnano({
			plugins: [mergeRules],
		}),
		postcssPresetEnv({
			features: {
				'case-insensitive-attributes': false,
			},
		}),
	],
};
