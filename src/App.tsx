import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ONE_HOUR } from './constants/time';
import { Stack } from './router/stackflow';

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
  <QueryClientProvider client={queryClient}>
    <Stack />
  </QueryClientProvider>
);

export default App;
