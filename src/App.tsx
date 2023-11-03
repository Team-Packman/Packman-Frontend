import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { ThemeProvider } from 'styled-components';

import AppLayout from './components/@common/AppLayout/AppLayout';
import GlobalStyle from './components/@common/GlobalStyle/GlobalStyle';
import { ONE_HOUR } from './constants/time';
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
      <AppLayout>
        <Outlet />
      </AppLayout>
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
