import React from 'react';
import ReactDOM from 'react-dom/client';
import { Normalize } from 'styled-normalize';

import App from './App';
import { startWorker } from './mocks/worker';

startWorker();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Normalize />
    <App />
  </React.StrictMode>,
);
