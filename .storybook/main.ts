import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) =>
          !(
            plugin &&
            typeof plugin === 'object' &&
            'name' in plugin &&
            plugin.name === 'vite-plugin-eslint'
          )
      );
    }
    return config;
  },
};
export default config;
