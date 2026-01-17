import type { Preview } from "@storybook/react";
import '../src/shared/fonts/fonts.css';
import '../src/shared/assets/styles/variables.css';
import '../src/shared/assets/styles/global.css';

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
