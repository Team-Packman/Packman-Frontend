import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) =>
        a.title === b.title ? 0 : a.title.localeCompare(b.title, undefined, { alphabetical: true }),
    },
  },
};

export default preview;
