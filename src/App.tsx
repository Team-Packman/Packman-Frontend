import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

import globalStyle from '@/styles/globalStyle';

import AppLayout from './components/@common/AppLayout/AppLayout';
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
    <Global styles={globalStyle} />
    <GlobalEvent />
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

const GlobalEvent = () => {
  useEffect(() => {
    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return null;
};
