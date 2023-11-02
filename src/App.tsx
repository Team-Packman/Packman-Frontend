import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './components/@common/GlobalStyle';
import { ONE_HOUR } from './constants/time';
import { Stack } from './router/stackflow';
import theme from './styles/theme/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      throwOnError: true,
      staleTime: ONE_HOUR,
      gcTime: ONE_HOUR,
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Stack />
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
