import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './components/@common/GlobalStyle';
import { ONE_HOUR } from './constants/time';
import { Stack } from './router/stackflow';
import theme from './styles/theme/theme';
import { setScreenSize } from './utils/setScreenSize';

setScreenSize();

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
      <GlobalEvent />
      <Stack />
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

const GlobalEvent = () => {
  useEffect(() => {
    const onResize = () => {
      setScreenSize();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
};
