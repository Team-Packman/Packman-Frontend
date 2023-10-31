import ReactDOM from 'react-dom/client';

import App from './App';
import { startWorker } from './mocks/worker';

startWorker();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
