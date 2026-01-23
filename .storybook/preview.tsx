import type { Preview } from '@storybook/react';
import '@shared/assets/fonts/fonts.css';
import '@shared/assets/styles/variables.css';
import '@shared/assets/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
