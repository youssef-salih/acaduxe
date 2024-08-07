module.exports = {
	staticDirs: ['../public'],
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/preset-create-react-app',
		'@storybook/addon-a11y',
		'@whitespace/storybook-addon-html',
		'@storybook/addon-knobs',
		'@storybook/addon-mdx-gfm',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
};
