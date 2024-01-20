import { withRouter } from 'storybook-addon-react-router-v6';
import type { Preview } from '@storybook/react';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '../src/styles/theme/theme';
import { ONE_HOUR } from '@/constants/time';
import globalStyle from '@/styles/globalStyle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
      staleTime: ONE_HOUR,
      gcTime: ONE_HOUR,
    },
  },
});

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
      //  @ts-ignore
      storySort: (a, b) =>
        a.title === b.title ? 0 : a.title?.localeCompare(b.title || '', undefined),
    },
  },
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyle} />
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '48rem',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    ),
    withRouter,
  ],
};

export default preview;
