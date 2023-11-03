import React from 'react';
import ReactDOM from 'react-dom/client';

import { startWorker } from './mocks/worker';
import Router from './router/Router';

startWorker();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
