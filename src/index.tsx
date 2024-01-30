import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { startWorker } from './mocks/worker';

startWorker();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const { STRICT_MODE } = process.env;

const Packman =
  STRICT_MODE === 'on' ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  );

root.render(Packman);
