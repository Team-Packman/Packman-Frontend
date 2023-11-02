// eslint-disable-next-line import/extensions
import '@stackflow/plugin-basic-ui/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { startWorker } from './mocks/worker';

startWorker();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
