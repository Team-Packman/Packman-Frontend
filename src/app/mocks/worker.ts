import { setupWorker } from 'msw';

import handlers from './handlers';

const worker = setupWorker(...handlers);

const startWorker = () => {
  if (process.env.MSW === 'on') {
    worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
  }
};

export { startWorker, worker };
