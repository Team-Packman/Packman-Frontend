import AppLayout from './layout/AppLayout';
import QueryProvider from './providers/QueryProvider';
import StyleProvider from './providers/StyleProvider';
import Router from './router/Router';

const App = () => (
  <StyleProvider>
    <QueryProvider>
      <AppLayout>
        <Router />
      </AppLayout>
    </QueryProvider>
  </StyleProvider>
);

export default App;
