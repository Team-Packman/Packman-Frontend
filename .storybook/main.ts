import type { StorybookConfig } from '@storybook/react-webpack5';

const devConfig = require('../config/webpack.dev.js');
const prodConfig = require('../config/webpack.prod.js');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    'storybook-addon-react-router-v6',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: (config, { configType }) => {
    const customConfig = configType === 'DEVELOPMENT' ? devConfig : prodConfig;

    return {
      ...config,
      module: {
        ...customConfig.module,
      },
    };
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  staticDirs: ['../public'],
};
export default config;
